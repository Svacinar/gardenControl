const switchRpiGpio = require('./switchRpiGpio').switchRpiGpio;

function handleRpiGpio(valve, ValveState) {
    try {
        console.log("in try statement");
        ValveState.state[valve] ? switchRpiGpio(valve, 0) : switchRpiGpio(valve, 1);
    } catch (error) {
        console.log(error);        
    }
}

module.exports.handleRpiGpio = handleRpiGpio;
