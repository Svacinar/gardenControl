import React, { useState, useEffect } from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/UI/Navbar/navbar';
import VideoFeature from './components/videoFeature';
import Weather from './components/Weather/weather';
import Login from './components/LoginComponent/login'
import LawnDashboard from './components/LawnDashboard/LawnDashboard';
import HeatingDashboard from './components/HeatingDashboard/HeatingDashboard';
import LandingPage from './components/LandingPage/LandingPage';
import Page404 from './components/UI/Page404/Page404.jsx';

import auth from './components/Authentication/Auth'
import PrivateRoute from './components/Authentication/PrivateRoute'
import Axios from 'axios';

const App = () => {
  const history = useHistory()
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    Axios.get('/api/valve')
      .then(res => {
        if (res.status === 200) {
          setAuthenticated(true);
          history.push({
            pathname: '/',
          });
        }
      })
      .catch(err => console.log(err))
  }, [])
  const getCurrentVersion = () => {
    const version = JSON.stringify(require('../package.json').version);
    return version;
  }

  return (
    <auth.Provider value={{ authenticated, setAuthenticated }}>
      <div className="App">
        <Navbar />
        <VideoFeature />
        <Switch>
          <PrivateRoute path="/" exact component={LandingPage} />
          <Route path="/lawn" exact component={LawnDashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact render={() => <div>logout component</div>} />
          <Route path="/weather" exact component={Weather} />
          <PrivateRoute path="/lights" exact render={() => <div>There will be Lights Control Panel</div>} />
          <PrivateRoute path="/heating" exact component={HeatingDashboard} />
          <PrivateRoute path="/smart" exact render={() => <div>There will be Smart Devices Control Panel</div>} />
          <Route component={Page404} />
        </Switch>
        <footer className="footer">Created 2020, Patrik Mackerle, version {getCurrentVersion()}</footer>
      </div>
    </auth.Provider>
  );
}

export default App;