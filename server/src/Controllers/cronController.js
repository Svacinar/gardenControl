const cronManager = require('../cronManager');
const valveManager = require('../valveManager')

exports.getCronAPI = (req, res) => {
    res.send(cronManager.cronAPI());
}

exports.setcron = (req, res) => {
    const { state } = req.body;
    const { strategy } = req.body;
    const { strategyID } = req.body;
    cronManager.handleCron(state, strategy, strategyID);
    res.redirect('/');
}

exports.rainProtect = (req, res) => {
    valveManager.setRainProtect();
    res.redirect('/');
}
