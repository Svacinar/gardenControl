import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/UI/Navbar/navbar';
import VideoFeature from './components/videoFeature';
import Weather from './components/Weather/weather';
import ManualControl from './components/ManualControl/ManualControl';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <VideoFeature />
        <div id="wrapper">
          <Route path="/" exact component={ManualControl} />
          <Route path="/weather" component={Weather} />
          <Route path="/about" render={() => <div>There will be About Component - details and stuff....</div>} />
          <Route path="/settings" render={() => <div>Calendar, where user can schedule irrigation</div>} />
        </div>
        <footer className="footer">Created 2020, Patrik Mackerle, version 1</footer>
      </div>
    );
  }
}

export default App;
