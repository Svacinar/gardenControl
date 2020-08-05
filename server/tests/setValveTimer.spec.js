const { setValveTimer } = require('../src/setValveTimer');

const { handleRpiGpio } = require('../src/handleRpiGpio');

jest.mock('handleRpiGpio');

const stateFalse = {
    state: {
        timer: 5000,
        valve1: false, 
        valve2: false 
    }     
}

describe("setValveTimer", function() {   

    /*test("handleRpio_valve1_return0", () => {
        expect(setValveTimer("valve1", stateFalse)).toEqual(0);
    })*/

    test("handleRpio_valve1_return0", () => {
        //expect(setValveTimer("valve1", stateFalse)).toHaveBeenCalled();
        expect(handleRpiGpio).toHaveBeenCalled();
    })
})