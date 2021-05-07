import React, { Component } from "react";
import Button from '../UI/Button/button';

import axios from 'axios';
import StrategyCard from "../UI/StrategyCard/strategyCard";
import Scheduler from "../UI/ScheduleCalendar/scheduler";

import AutomaticControlHandler from '../AutomaticControl/automaticControlHandler'

class AutomaticControl extends Component {

    constructor(props) {
        super(props)
        this.intervalID = null;
    }

    state = {
        strategy: null,
        serverConnected: false,
        apiResponse: "Error has occured, please refresh...",
        strategies: []
    }


    callAPI() {
        axios.get(`/api/cron/`)
            .then(res => {
                console.log(window.location.hostname)
                let newState = res.data;
                this.setState({ apiResponse: "Server Connected", serverConnected: true, strategies: newState })

            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.callAPI();
        this.intervalID = setInterval(this.callAPI.bind(this), 1000);

    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    handleStartButtonClick(e, strategy) {
        e.preventDefault();
        axios.post(`/api/cron/`, {
            state: true,
            strategy: strategy,
            strategyID: Math.floor(Math.random() * 100)
        })
            .then(res => console.log(res))
            .then(this.callAPI())

    }

    handleStopButtonClick(e, strategyID) {
        //unfinished click ID - will delete all active strategies
        e.preventDefault();
        axios.post(`/api/cron/`, {
            state: false,
            strategy: "N/A",
            strategyID: strategyID
        })
            .then(this.callAPI())

    }

    render() {
        const activeStrategies = Object.keys(this.state.strategies);
        const activeStrategiesCards = activeStrategies.map((strategy, id) =>
            <StrategyCard data={this.state.strategies[strategy]} />
        )

        return (
            <div className="switch-group">
                <h2>Choose Automated Irrigation Strategy</h2>
                <div onChange={e => this.setState({ strategy: e.target.value })}>
                    <input type="radio" value="newSeedStrategy" name="strategy" /> New Seed
                    <input type="radio" value="normalStrategy" name="strategy" /> Normal
                    <input type="radio" value="droughtStrategy" name="strategy" /> Drought
                </div>
                <Button name="start schedule" clicked={e => this.handleStartButtonClick(e, this.state.strategy)} />
                {activeStrategiesCards}
                <Button name="stop schedule" clicked={e => this.handleStopButtonClick(e, this.state.strategies["strategyID"])} />
            </div>
        );
    }
}

export default AutomaticControl;