import React from 'react';

const temperatureInfoButton = (props) => {
    return (
        <div>
            <h2>Sensor: {props.name}</h2>
            <p>Temperature {props.temperature}</p>
            <p>Humidity: {props.humidity}</p>
            <p>Status: {props.status}</p>
            <p>Last updated: {props.updated}</p>
        </div>
    )
}

export default temperatureInfoButton