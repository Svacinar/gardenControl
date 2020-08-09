const switchRpiGpio = require('./switchRpiGpio').switchRpiGpio;

function handleRpiGpio(valve, ValveState) {
    try {
        console.log("in try statement");
        ValveState.state[valve] ? switchRpiGpio(valve, 0) : switchRpiGpio(valve, 1);
    } catch (error) {
        console.log(error);        
    }
    console.log("this function will set the GPIO 1/0")
}

//setup the GPIO gpio.setup(7, gpio.DIR_OUT); for both of the valves



module.exports.handleRpiGpio = handleRpiGpio;
