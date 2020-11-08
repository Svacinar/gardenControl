import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale("en");
const localizer = momentLocalizer(moment);


const submitHandler = async (e, name, duration, date, description) => {
    e.preventDefault();
    let res = await axios.post(`${process.env.REACT_APP_API}/schedule/post`, {
        name: name,
        duration: duration,
        scheduledDate: date,
        description: description
    })

}

const fetchData = (setEvents) => {
    axios.get(`${process.env.REACT_APP_API}/schedule/getAll`)
        .then(res => {
            let data = res.data.data
            let newEvents = []
            Object.keys(data).map(event => {
                const endDate = new Date(data[event].scheduledDate)
                endDate.setMinutes(endDate.getMinutes() + data[event].duration / 60000);
                let newEvent = {
                    id: data[event].id,
                    title: data[event].name,
                    start: new Date(data[event].scheduledDate),
                    end: endDate,
                    duration: data[event].duration / 60000,
                    description: data[event].description
                }
                newEvents = [...newEvents, newEvent];

            })
            setEvents([...newEvents])
        })
        .catch(err => console.log(err))
}

const Scheduler = (props) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetchData(setEvents);
    }, [])

    const handleSubmit = (e) => {
        submitHandler(e, name, duration, date, description);
        fetchData(setEvents);
    }

    const doubleClickHandler = (e) => {
        let eventToDeleteId = e.id;
        axios.delete(`${process.env.REACT_APP_API}/schedule/delete/${eventToDeleteId}`)
            .then(res => {
                console.log(res);
            })
            .then(fetchData(setEvents));
    }

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" required onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Duration</label>
                    <input type="number" name="duration" required onChange={e => setDuration(e.target.value)} />
                </div>
                <div>
                    <label>Scheduled Date</label>
                    <input type="datetime-local" name="scheduled_date" required onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="String" name="description" onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Schedule</button>
                </div>
            </form>
            <div style={{ height: '400pt' }}>
                <Calendar
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    onDoubleClickEvent={e => doubleClickHandler(e)}
                />
            </div>

        </div>
    );
};

export default Scheduler;

