import React, {Component} from 'react';

import {Link, NavLink, Route} from 'react-router-dom';


const weatherDayCard = (props) => {
  return (
  <div>
      <p>It is {props.temp} degrees</p>
  </div>
)}

export default weatherDayCard