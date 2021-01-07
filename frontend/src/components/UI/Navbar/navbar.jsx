import React, { Component } from 'react';

import { Link, NavLink, Route } from 'react-router-dom';

import logo from "../../images/logo.png";


import classes from './navbar.module.css';

const navbar = (props) => {
  return (
    <div className={classes.navbar}>

      <Link to="/login">Login</Link>
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