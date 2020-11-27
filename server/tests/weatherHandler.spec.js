const { weatherHandler } = require('../src/weatherHandler')

describe("rainProtect function", function () {

    // currentWeather, pastWeather, tommorowWeather
    const test1 = [0, 0, 0]
    const test2 = [0, 0, 250]
    const test3 = ["string", 0, 260]
    const test4 = [null, null, null]
    const test5 = []
    test("rainProtect_return_false_case1", () => {
        expect(weatherHandler.rainProtect(...test1)).toBeFalsy()
    })
    test("rainProtect_return_true_case2", () => {
        expect(weatherHandler.rainProtect(...test2)).toBeTruthy()
    })
    test("rainProtect_return_true_case3", () => {
        expect(weatherHandler.rainProtect(...test3)).toBeTruthy()
    })
    test("rainProtect_return_false_case4", () => {
        expect(weatherHandler.rainProtect(...test4)).toBeFalsy()
    })
    test("rainProtect_return_false_case5", () => {
        expect(weatherHandler.rainProtect(...test5)).toBeFalsy()
    })
})

describe("rainProtectHandler function", function () {
    test("rainProtectHandler_should_call_APIs", () => {
        const todayWeatherAPI = weatherHandler.getTodayWeather = jest.fn()
        const tommorowWeatherAPI = weatherHandler.getTommorowWeather = jest.fn()
        const historicWeatherAPI = weatherHandler.getHistoricWeather = jest.fn()
        const rainProtect = weatherHandler.rainProtect = jest.fn()

        weatherHandler.rainProtectHandler();

        expect(todayWeatherAPI).toHaveBeenCalledTimes(1);
        expect(tommorowWeatherAPI).toHaveBeenCalledTimes(1);
        expect(historicWeatherAPI).toHaveBeenCalledTimes(1);
        expect(rainProtect).toHaveBeenCalledTimes(1);
    })

})