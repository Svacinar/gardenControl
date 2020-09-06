class ValveManager {
  constructor() {
    this.state = {
      timer: 5000, //in microseconds
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
    return this.state;
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

  setValveState(valve, status) {
    if (status === undefined) {
      this.state.valves[valve].status = !this.state.valves[valve].status;
    } else {
      this.state.valves[valve].status = false;
    }
    const lowOrHigh = this.state.valves[valve].status;
    this.GPIOhandler(valve, lowOrHigh);
  }

  setValveTimer(valve) {
    const setValveState = this.setValveState.bind(this);
    const { timer } = this.state;
    setTimeout(setValveState, timer, valve, false);
  }

  handleValveChange(valve) {
    this.setValveTimer(valve);
    this.setValveState(valve);
  }

  handleValveCycling() {
    const valves = this.getAllValves();
    for (let i = 0; i <= valves.length - 1; i++) {
      const handleValveChange = this.handleValveChange.bind(this);
      setTimeout(handleValveChange, i * (this.state.timer + 5000), valves[i]);
    }
  }

  GPIOhandler(valve) {
    try {
      if (process.env.DEVELOPMENT === 'true') {
        this.state.valves[valve].status ? console.log(valve, 0) : console.log(valve, 1);
      } else {
        const { switchRpiGpio } = require('./switchRpiGpio');
        this.state.valves[valve].status ? switchRpiGpio(valve, 0) : switchRpiGpio(valve, 1);
      }
    } catch (error) {
      return error;
    }
  }
}

const valveManager = new ValveManager();

module.exports = valveManager;
