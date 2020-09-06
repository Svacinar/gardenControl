function handleRpiGpio(valve, ValveState) {
  try {
    if (process.env.DEVELOPMENT === 'true') {
      console.log('in development, no manipulation of GPIO is performed');
    } else {
      const { switchRpiGpio } = require('./switchRpiGpio');
      ValveState.state[valve] ? switchRpiGpio(valve, 0) : switchRpiGpio(valve, 1);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports.handleRpiGpio = handleRpiGpio;
