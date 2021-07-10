const valveManager = require('../Services/valveManager');

exports.getValveAPI = (req, res) => {
    res.status(200).send(valveManager.getValveState());
}

exports.runValve = (req, res) => {
    const valveToRun = req.params.valve;
    valveManager.handleValveChange(valveToRun);
    res.redirect(200, '/');
}

exports.cycleValves = (req, res) => {
    valveManager.handleValveCycling();
    res.redirect(200, '/');
}

exports.setTimer = (req, res) => {
    try {
        const timerValue = parseInt(req.params.timerValue);
        if (isNaN(timerValue)) throw new Error('Not a number');
        valveManager.setTimerValue(timerValue);
        res.redirect(200, '/');

    } catch (error) {
        res.redirect(400, '/');
    }

}
exports.rainProtect = (req, res) => {
    try {
        valveManager.setRainProtect();
        res.redirect(200, '/');
    } catch (error) {
        res.redirect(400, '/');
    }

}
