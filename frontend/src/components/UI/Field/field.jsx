import React, { useState } from 'react';
import classes from './field.module.css';
import axios from 'axios';

const Field = (props) => {
    let timerValue = (props.timer / 60000);

    const [timer, setTimer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`api/valve/Timer/${timer}`);
    }

    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit}>
                <label className={classes.label} type="label" htmlFor="timerValue" className={classes.label}>Timer:{timerValue} min</label>
                <div className="test">
                    <input type="text" placeholder="Set timer" id="timerValue" name="timerValue" className={classes.inputField} onChange={e => setTimer(e.target.value * 60000)} required />

                    <input type="submit" value="Set" className={classes.submitButton} />
                </div>


            </form>
        </div>
    );
};

export default Field;
