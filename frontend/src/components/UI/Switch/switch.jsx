import React, { Component } from 'react';

import classes from './switch.module.css';

const Switch = (props) => {
  let text = props.name
  if (props.status) {
    text += " is ON"
  } else {
    text += " is OFF"
  }
  return (
    <div className={classes.switch}>
      <p>{text}</p>
      <input
        type="checkbox"
        className={classes.switchInput}
        name={props.name}
        id={props.name}
        onClick={e => props.clicked(e)}
        status={props.status}
      />
      <label
        className={classes.switchLabel}
        htmlFor={props.name}
        style=
        {
          props.status ?
            {
              backgroundColor: `rgba(124, 252, 0,0.6)`
            }
            : null
        }
      >
        <span className={classes.switchSlider} style={
          props.status ?
            {
              left: `calc(100% - 2px)`,
              transform: `translateX(-100%)`
            }
            : null}></span>
      </label>
    </div>
  )
}

export default Switch



