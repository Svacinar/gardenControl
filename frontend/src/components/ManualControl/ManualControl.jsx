import React, { Component } from "react";
import Switch from '../UI/Switch/switch';
import Field from '../UI/Field/field';
import axios from 'axios';

class ManualControl extends Component {

  constructor(props) {
    super(props)
    this.intervalID = null;
  }

  state = {
    serverConnected: false,
    apiResponse: "API offline, please login",
    valves: {
      valve: {
        name: 'N/A',
        status: false,
      }
    },
    cycling: false
  }


  callAPI() {
    axios.get(`${process.env.REACT_APP_API}/valve/`)
      .then(res => {
        let newState = res.data;
        this.setState({ ...newState, apiResponse: "Server Connected", serverConnected: true })
      })
      .then(console.log(this.state))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.callAPI();
    this.intervalID = setInterval(this.callAPI.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleButtonClick(e, valveName) {
    if (this.state.cycling && this.state.valves[valveName].status === false) {
      axios.get(`${process.env.REACT_APP_API}/valve/cycle`)
        .then(this.callAPI())
      return
    }
    axios.get(`${process.env.REACT_APP_API}/valve/run/${valveName}`)
      .then(this.callAPI())
  }
  handleCycleClick(e) {
    this.setState({ cycling: !this.state.cycling })
  }

  render() {
    const valves = Object.keys(this.state.valves);
    const valvesSwitches = valves.map((valve, id) =>
      <Switch key={id} name={"Valve " + (id + 1)} status={this.state.valves[valve].status} clicked={e => this.handleButtonClick(e, valve)} />
    )
    return (
      <div className="switch-group">
        <h2>{this.state.apiResponse}</h2>
        <Field timer={this.state.timer} />
        <Switch name={"Cycling"} status={this.state.cycling} clicked={e => this.handleCycleClick(e)} />
        {valvesSwitches}
      </div>
    );
  }
}

export default ManualControl;