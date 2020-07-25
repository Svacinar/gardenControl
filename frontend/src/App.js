import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Button from "./components/UI/Button/button.js";

import axios from 'axios';

class App extends Component {          
    state = {
          serverConnected: false,
          apiResponse: "Hi there, server not connected....", 
          };
    

    callAPI() {
      console.log("api called")
        fetch("http://localhost:9000/api")            
            .then(res => res.text())
            .then(res => {
              let newState = JSON.parse(res);
              this.setState({...newState, apiResponse: "Server Connected", serverConnected: true})              
            })
            .catch(err => err);
    }
    componentDidMount() {
        this.callAPI();
    } 
    countdownHandler(valveName) {
      setTimeout(() => this.setState({[valveName]:false}), this.state.timer)
    }   

    handleButtonClick(e, valveName) {    
      axios.get(`http://localhost:9000/${valveName}`)
      .then(this.setState({[valveName]: !this.state[valveName]}, () => console.log(this.state[valveName])))
      .then(this.countdownHandler(valveName));
    }
  

    render() {     
        return (
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to the Control System</h1>                        
                </header>

                <h2 className = "App-intro">{this.state.apiResponse}</h2>

                <div className= "btn-group">                  
                   <Button name={"Valve 1"} status = {this.state.valve1} clicked = {e => this.handleButtonClick(e, "valve1")}/>
                   <Button name={"Valve 2"} status = {this.state.valve2} clicked = {e => this.handleButtonClick(e, "valve2")}/>
                </div>
              
                <footer className="footer">Created 2020, Patrik Mackerle, version 0.1 ALFA</footer>
            </div>
        );
    }
}

export default App;