import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import logo from "../../images/logo.png";


import classes from './navbar.module.css';

import auth from '../../Authentication/Auth'

import axios from 'axios';



const navbar = (props) => {
  const { authenticated, setAuthenticated } = useContext(auth);

  const handleLogout = async () => {
    try {
      await axios.get('/logout')
    } catch (error) {
      console.log("error");
    }
    setAuthenticated(false)

  }

  let logButton = null;
  (authenticated) ? (logButton = <Link to="/"><span onClick={() => handleLogout()}>Logout</span></Link>) : (logButton = <Link to="/login" > Login</Link>)

  return (
    <div className={classes.navbar}>

      {logButton}
      <Link to="/weather">Weather</Link>

      <Link to="/">Home</Link>
      <Link to="/lawn" >LAWN</Link>
      <Link to="/smart" >SMART THINGS</Link>
      <Link to="/heating" >HEATING</Link>
      <Link to="/lights" >LIGHTS</Link>

      <img src={logo} alt="logo" />


    </div>
  )
}

export default navbar