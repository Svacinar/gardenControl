const axios = require('axios');
const { gpioService } = require('./gpioService');
const { weatherHandler } = require('./weatherHandler');

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
    return this.state;
  }

  async getRemoteValveState() {
    try {
      const valveState = await axios.get(process.env.ARDUINO_IP);
      console.log(valveState);
      Object.keys(valveState).map(valve => {
        this.state.valves[valve].status = valveState[valve];
      })
    }
    catch (error) {
      console.log(error.message);
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
      console.log(error.message);
    }

  }

  setRainProtect() {
    this.state.rainProtect = !this.state.rainProtect
  }

  setValveTimer(valve) {
    const setValveState = this.setValveState.bind(this); //cely tenhle kod zmizi
    const { timer } = this.state;
    setTimeout(setValveState, timer, valve, false);
  }

  async handleValveChange(valve) {
    //this.setValveTimer(valve);
    //this.setValveState(valve);
    this.setValveState(valve);
  }

  handleValveCycling() {
    const valves = this.getAllValves();
    for (let i = 0; i <= valves.length - 1; i++) {
      const handleValveChange = this.handleValveChange.bind(this); //tohle by teoreticky mohlo fungovat (akorat tam nebude ten valveTimer, ale to nevadi, princip zustane)
      setTimeout(handleValveChange, i * (this.state.timer + 5000), valves[i]);
    }
  }

  handleCronSchedule(timer) { //tahle funkce bude bezeme zmeny - lisi se implementace handleValveChange
    try {
      if (this.state.rainProtect && weatherHandler.rainProtectHandler() === true) {
        console.log("protected");
        return
      }
      console.log("not protected")
      this.setTimerValue(timer);
      this.handleValveCycling();

    } catch (error) {
      console.log(error)
    }

  }

  async GPIOhandler(valve, state) {
    if (process.env.DEVELOPMENT === 'true') {
      console.log(valve);
      console.log(state);
      return;
    }
    const timer = this.getValveTimer();
    await gpioService(valve, state, timer);
  }
}

const valveManager = new ValveManager();

module.exports = valveManager;
