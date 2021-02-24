import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TemperatureInfoButton from '../UI/TemperatureInfoButton/TemperatureInfoButton'

const fetchData = (setSensors) => {
    axios.get('api/temperature')
        .then(res => {
            let data = res.data
            console.log(data);
            let sensors = []
            Object.keys(data).map((sensor, id) => {
                let newSensor = {
                    id: id,
                    name: data[sensor].name,
                    temperature: data[sensor].temperature,
                    humidity: data[sensor].humidity,
                    status: data[sensor].status,
                    updated: data[sensor].updated
                }
                sensors = [...sensors, newSensor];
            })
            setSensors([...sensors])
        })
        .catch(err => console.log(err));
}

const createTemperatureButton = (sensors) => {
    const renderButtons = []
    for (let sensor of sensors) {
        renderButtons.push(
            <TemperatureInfoButton
                key={sensor.id}
                name={sensor.name}
                temperature={sensor.temperature}
                humidity={sensor.humidity}
                status={sensor.status}
                updated={sensor.updated} />)
    }
    return (
        <div>
            {renderButtons}
        </div>
    )
}

const heatingDashboard = () => {

    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        fetchData(setSensors);
    }, []);


    return (
        <div>
            <h1>Heating and Temperature Overview</h1>
            {createTemperatureButton(sensors)}

            <button onClick={() => fetchData(setSensors)}>Update</button>
            <p>Last updated at: {new Date().toString()}</p>
        </div>
    )
}

export default heatingDashboard