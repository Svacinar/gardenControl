import React, { useState } from 'react';
import classes from './field.module.css';
import axios from 'axios';

const field = (props) => {
    let timerValue = (props.timer / 60000);

    const [timer, setTimer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`${process.env.REACT_APP_API}/setTimer/${timer}`);
    }

    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit}>
                <label className={classes.label} type="label" htmlFor="timerValue">Timer set to {timerValue} minutes
                <input type="text" id="timerValue" name="timerValue" className={classes.inputField} onChange={e => setTimer(e.target.value * 60000)} required />
                </label>
                <input type="submit" value="Set" className={classes.submitButton} />
            </form>
        </div>
    );
};

export default field;
