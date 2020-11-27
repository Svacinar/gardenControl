const axios = require('axios');

class WeatherHandler {
    constructor() {
        this.baseURL = process.env.WEATHERAPIBASEURL
        this.apiKey = process.env.APIKEY
    }

    getTommorowWeather() {
        let precipitation = null;

        axios.get(`${this.baseURL}/forecast.json?key=${this.apiKey}&q=50.171,15.825160&days=2`)
            .then(res => {
                precipitation = res.data.forecast.forecastday[1].day.totalprecip_mm
            })
            .catch(e => console.log(e))
        return precipitation

    }
    getTodayWeather() {
        let precipitation = null;
        axios.get(`${this.baseURL}/forecast.json?key=${this.apiKey}&q=50.171,15.825160&days=1`)
            .then(res => {
                precipitation = res.data.forecast.forecastday[0].day.totalprecip_mm
            })
            .catch(e => console.log(e))
        return precipitation
    }

    getHistoricWeather() {
        let precipitation = null;
        const today = new Date();
        const firstHistoricDay = new Date();
        firstHistoricDay.setDate(today.getDate() - 1)
        const firstHistoricDayWithoutTime = `${firstHistoricDay.getFullYear()}-${firstHistoricDay.getMonth() + 1}-${firstHistoricDay.getDate()}`
        axios.get(`${this.baseURL}/history.json?key=${this.apiKey}&q=50.171,15.825160&dt=${firstHistoricDayWithoutTime}`)
            .then(res => {
                precipitation = res.data.forecast.forecastday[0].day.totalprecip_mm;
            })
            .catch(e => console.log(e))
        return precipitation;

    }

    rainProtectHandler() {
        try {
            const currentWeather = this.getTodayWeather();
            const pastWeather = this.getHistoricWeather();
            const tommorowWeather = this.getTommorowWeather();
            return this.rainProtect(currentWeather, pastWeather, tommorowWeather);
        } catch (error) {
            return false
        }
    }

    rainProtect(currentWeather, pastWeather, tommorowWeather) {

        let aggregatePrecipitation = 0
        for (let argument of arguments) {
            if (typeof argument === "number") {
                aggregatePrecipitation += argument
            }
        }

        //const aggregatePrecipitation = currentWeather + tommorowWeather + pastWeather

        if (aggregatePrecipitation >= 200) {
            return true
        }
        return false

    }
}

const weatherHandler = new WeatherHandler();

module.exports.weatherHandler = weatherHandler;