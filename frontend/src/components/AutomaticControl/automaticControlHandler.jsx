import React, { useState } from "react";
import Scheduler from "../UI/ScheduleCalendar/scheduler";
import AutomaticControl from "./automaticControl";

const automaticControlHandler = (props) => {

    const [componentSwitch, setSwitch] = useState("null");

    function handleClick(e) {
        e.preventDefault();
        setSwitch(e.target.value);
    }
    let automaticComponent = null;
    if (componentSwitch === "calendar") {
        automaticComponent = <Scheduler />
    } else if (componentSwitch === "strategy") {
        automaticComponent = <AutomaticControl />
    }

    return (
        <div >
            <div>
                <button value="calendar" name="calendar" onClick={e => handleClick(e)}>Calendar</button>
                <button value="strategy" name="strategy" onClick={e => handleClick(e)}>Strategy</button>
            </div>
            {automaticComponent}
        </div>
    );
};

export default automaticControlHandler;