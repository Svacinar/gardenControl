import React from 'react';

import classes from './button.module.css';

const button = (props) => {
  return (
    <button type="button" className={classes.btn} onClick={(e) => props.clicked(e, 'valve2')}>{props.name}</button>
  );
};

export default button;
