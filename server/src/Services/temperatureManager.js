const axios = require('axios');

class TemperatureManager {
    constructor() {
        this.state = {
            sensors: {
                sensor1: {
                    name: "Living Room",
                    endpoint: 'http://192.168.0.100/sensor1',
                    status: 'offline',
                    temperature: NaN,
                    humidity: NaN,
                    updated: NaN,
                },
                sensor2: {
                    name: "Sauna",
                    endpoint: 'http://192.168.0.101/',
                    status: 'offline',
                    temperature: NaN,
                    humidity: NaN,
                    updated: NaN
                }
            }
        }
    }

    async getAllTemperatures() {
        await this.updateAllTemperatures();
        return this.state.sensors
    }

    updateAllTemperatures() {
        const promises = [];

        Object.keys(this.state.sensors).map((sensor) => {
            promises.push(
                axios({
                    method: 'GET',
                    url: this.state.sensors[sensor].endpoint,
                    timeout: 6000,
                })
                    .then((res) => {
                        console.log(res.data)
                        this.state.sensors[sensor].status = 'online';
                        this.state.sensors[sensor].temperature = res.data.temperature;
                        this.state.sensors[sensor].humidity = res.data.humidity;
                        this.state.sensors[sensor].updated = new Date().toString()
                    })
                    .catch(err => {
                        console.log(err.message)
                        this.state.sensors[sensor].status = 'offline';
                    })
            )
        })

        return Promise.all(promises);

    }

    addNewSensor(name, endpoint) {
        const currentNumberOfSensors = Object.keys(this.state.sensors).length
        const newSensor = {
            name: name,
            endpoint: endpoint,
            status: offline,
            temperature: NaN,
            humidity: NaN,
        }
        this.state.sensors[[`sensor${currentNumberOfSensors + 1}`]] = newSensor;
    }

}

const temperatureManager = new TemperatureManager();

module.exports = temperatureManager;