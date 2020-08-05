const handleRpiGpio = require('./handleRpiGpio').handleRpiGpio;

function setValveTimer(valve, ValveState) {
    if(ValveState.state[valve]) {
        setTimeout(
            function() {
                ValveState.state[valve] = false;
                handleRpiGpio(valve, ValveState);
            }, 
                ValveState.state.timer);  
    }
    console.log( `timer set, valve will turn of in ${ValveState.state.timer}`);
} 

module.exports = setValveTimer;