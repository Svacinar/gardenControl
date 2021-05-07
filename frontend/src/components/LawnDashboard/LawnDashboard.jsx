import React from 'react';
import AutomaticControl from '../AutomaticControl/automaticControl';
import ManualControl from '../ManualControl/ManualControl';
import Scheduler from '../UI/ScheduleCalendar/scheduler';

import './LawnDashboard.css';

const LawnDashboard = (props) => {
    return (
        <div className="panels">
            <div className="intro">
                <h2>
                    Lawn Control
                </h2>
            </div>
            <div className="manualPanel">
                <ManualControl />
            </div>
            <div className="automaticPanel">
                <AutomaticControl />
            </div>
            <div className="schedulerPanel">
                <Scheduler />
            </div>
        </div>
    )
}

export default LawnDashboard