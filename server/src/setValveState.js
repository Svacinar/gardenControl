const handleRpiGpio = require('./handleRpiGpio').handleRpiGpio;

function setValveState(valve, ValveState) {
    console.log("setvalvestate initializes")
    ValveState.state[valve] = !ValveState.state[valve]
    handleRpiGpio(valve, ValveState);
}

module.exports = setValveState;