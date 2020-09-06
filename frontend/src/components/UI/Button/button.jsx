import React from 'react';

import classes from './button.module.css';

const button = (props) => {
  let text = props.name;
  if (props.status) {
    text += ' is ON';
  } else {
    text += ' is OFF';
  }
  return (
    <button type="button" className={classes.btn} onClick={(e) => props.clicked(e, 'valve2')}>{text}</button>
  );
};

export default button;
