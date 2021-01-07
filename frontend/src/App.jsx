import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/UI/Navbar/navbar';
import VideoFeature from './components/videoFeature';
import Weather from './components/Weather/weather';
import ManualControl from './components/ManualControl/ManualControl';
import AutomaticControlHandler from './components/AutomaticControl/automaticControlHandler';
import Login from './components/LoginComponent/login'
import LawnDashboard from './components/LawnDashboard/LawnDashboard';
import LandingPage from './components/LandingPage/LandingPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <VideoFeature />
        <div /* id="wrapper" */>
          <Route path="/" exact component={LandingPage} />
          <Route path="/lawn" component={LawnDashboard} />
          <Route path="/login" component={Login} />
          <Route path="/weather" component={Weather} />
          <Route path="/lights" render={() => <div>There will be Lights Control Panel</div>} />
          <Route path="/heating" render={() => <div>There will be Heating Control Panel</div>} />
          <Route path="/smart" render={() => <div>There will be Smart Devices Control Panel</div>} />

        </div>
        <footer className="footer">Created 2020, Patrik Mackerle, version 1</footer>
      </div>
    );
  }
}

export default App;
