const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const cors = require('cors');
//const gpio = require('rpi-gpio');

//setup the GPIO gpio.setup(7, gpio.DIR_OUT); for both of the valves

let valveState = {
    timer: 5000,
    valve1: false, 
    valve2: false   
}

function setGPIO(valve) {
    console.log("this function will set the GPIO 1/0")
    
    return (valveState[valve] ? console.log(1) : console.log(0) )
}

function countDown(res, valve) {
    if(valveState[valve]) {
        setTimeout(
            function() {
                valveState[valve] = false;
                setGPIO(valve)
            }, 
                valveState.timer);  
    }
    console.log( `timer set, valve will turn of in ${valveState.timer}`);
} 
    

app.use(cors());
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('/', (req, res) => {   
    res.sendFile(path.join(__dirname, './frontend/build/', 'index.html'));
})

function switchValve(valve) {
    valveState[valve] = !valveState[valve]
    setGPIO(valve);
}

app.listen(port, () => console.log( `The app is listening on the port ${port} `));

app.get('/api', (req, res) => {
    res.send(valveState);
})

app.get('/valve1', (req, res) => {
    switchValve('valve1');
    countDown(res, 'valve1');
    res.redirect('/');
})
app.get('/valve2', (req, res) => {
    switchValve('valve2');
    countDown(res, 'valve2');
    res.redirect('/');
})
