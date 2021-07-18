const axios = require('axios');
const log4js = require('log4js');
const { gpioService } = require('./gpioService');
const { weatherHandler } = require('./weatherHandler');

const logger = log4js.getLogger();
logger.level = 'debug';

class ValveManager {
  constructor() {
    this.state = {
      rainProtect: true,
      timer: 600000, // in microseconds
      valves: {
        valve1: {
          name: 'Valve 1',
          status: false,
        },
        valve2: {
          name: 'Valve 2',
          status: false,
        },
      },
    };
  }

  getValveState() {
    if (process.env.ENVIRONMENT === 'arduino') {
      this.getRemoteValveState();
    }
    const response = {
      ...this.state,
      remoteApiStatus: 'API Online',
    }
    return response;
  }

  async getRemoteValveState() {
    try {
      const valveServerResponse = await axios.get(process.env.ARDUINO_IP);
      const valveState = valveServerResponse.data;
      logger.info(valveState);
      Object.keys(valveState).forEach((valve) => {
        this.state.valves[valve].status = !valveState[valve];
      });
    }
    catch (error) {
      logger.error(error.message);
    }
  }

  getValveTimer() {
    return this.state.timer;
  }

  getAllValves() {
    const valves = Object.keys(this.state.valves);
    return valves;
  }

  setTimerValue(value) {
    this.state.timer = value;
  }

  async setValveState(valve) {
    try {
      const newValveState = !this.state.valves[valve].status;
      await this.GPIOhandler(valve, newValveState);
      this.state.valves[valve].status = newValveState;
    } catch (error) {
      logger.error(error.message);
    }
  }

  setRainProtect() {
    this.state.rainProtect = !this.state.rainProtect
  }

  setValveTimer(valve) {
    if (process.env.ENVIRONMENT === 'arduino') {
      return;
    }
    const setValveState = this.setValveState.bind(this);
    const { timer } = this.state;
    setTimeout(setValveState, timer, valve, false);
  }

  async handleValveChange(valve) {
    this.setValveTimer(valve);
    this.setValveState(valve);
  }

  handleValveCycling() {
    const valves = this.getAllValves();
    valves.forEach((valve, index) => {
      const handleValveChange = this.handleValveChange.bind(this);
      setTimeout(handleValveChange, index * (this.state.timer + 5000), valves[index]);
    });
  }

  handleCronSchedule(timer) {
    try {
      if (this.state.rainProtect && weatherHandler.rainProtectHandler() === true) {
        logger.trace('cron run protected by rainProtect');
        return;
      }
      this.setTimerValue(timer);
      this.handleValveCycling();
    } catch (error) {
      logger.error(error);
    }
  }

  async GPIOhandler(valve, state) {
    if (process.env.DEVELOPMENT === 'true') {
      logger.debug(valve);
      logger.debug(state);
      return;
    }
    const timer = this.getValveTimer();
    await gpioService(valve, state, timer);
  }
}

const valveManager = new ValveManager();

module.exports = valveManager;
