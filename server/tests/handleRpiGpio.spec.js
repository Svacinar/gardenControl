const { handleRpiGpio } = require('../src/handleRpiGpio');

const stateFalse = {
    state: {
        timer: 5000,
        valve1: false, 
        valve2: false 
    }     
}

const stateTrue = {
    state: {
        timer: 5000,
        valve1: false, 
        valve2: true 
    }
}
  //super test - GET /valve1 - should run defined functions - valveChange, countDown, setGPIO with valve1 as an argument

describe("handleRpiGpio", function() {   
    console.log(stateFalse);

    test("handleRpio_valve1_return0", () => {
        expect(handleRpiGpio("valve1", stateFalse)).toEqual(0);
    })
    test("setGPIO_valve2_return0", () => {
        expect(handleRpiGpio("valve2", stateTrue)).toEqual(1);
    })
})