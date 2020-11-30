const valveManager = require('../valveManager');

exports.getValveAPI = (req, res) => {
    res.send(valveManager.getValveState());
}

exports.runValve = (req, res) => {
    const valveToRun = req.params.valve;
    valveManager.handleValveChange(valveToRun);
    res.redirect('/');
}

exports.cycleValves = (req, res) => {
    valveManager.handleValveCycling();
    res.redirect('/');
}

exports.setTimer = (req, res) => {
    const timerValue = parseInt(req.params.timerValue);
    valveManager.setTimerValue(timerValue);
    res.redirect('/');
}
