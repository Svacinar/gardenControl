import React, { Component } from 'react';

const strategyCard = (props) => {
    return (
        <div>
            <p>Strategy Name: {props.data.strategy}</p>
            <p>Strategy ID: {props.data.strategyID}</p>
            <p>Next Date: {props.data.nextDate}</p>
            <p>Schedule: {props.data.waterringSchedule}</p>
            <p>Timer: {props.data.timer}</p>
        </div>
    )
}

export default strategyCard