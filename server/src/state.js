class ValveState {
    constructor() {
        this.state = {
            timer: 5000,
            valve1: false, 
            valve2: false  
        }
    }  
}

let valveState = new ValveState();

module.exports = valveState;