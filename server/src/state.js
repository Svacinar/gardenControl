class ValveState {
    constructor() {
        this.state = {
            timer: 1500000,
            valve1: false, 
            valve2: false  
        }
    }  
}

let valveState = new ValveState();

module.exports = valveState;