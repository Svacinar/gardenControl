import React, { Component } from 'react';

import { Link, NavLink, Route } from 'react-router-dom';

import logo from "../../images/gardenApp_logo2.png";


import classes from './navbar.module.css';

const navbar = (props) => {
  return (
    <div className={classes.navbar}>
      <img src={logo} alt="logo" />
      <Link to="/">Manual Control</Link>
      <Link to="/settings">Automatic Irrigation</Link>
      <Link to="/weather">Weather</Link>
      <Link to="/about">About</Link>
    </div>
  )
}

export default navbar