const cronManager = require('../Services/cronManager');
const valveManager = require('../Services/valveManager')

exports.getCronAPI = (req, res) => {
    res.status(200).send(cronManager.cronAPI());
}

exports.setcron = (req, res) => {
    const { state } = req.body;
    const { strategy } = req.body;
    const { strategyID } = req.body;
    cronManager.handleCron(state, strategy, strategyID);
    res.redirect(200, '/');
}
