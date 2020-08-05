function handleRpiGpio(valve, ValveState) {
    console.log("this function will set the GPIO 1/0")
    return (ValveState.state[valve] ? 1 : 0 )
}

//setup the GPIO gpio.setup(7, gpio.DIR_OUT); for both of the valves

//const gpio = require('rpi-gpio');

module.exports.handleRpiGpio = handleRpiGpio;
