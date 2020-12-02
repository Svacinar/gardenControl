const cronManager = require('../cronManager');
const valveManager = require('../valveManager')

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

exports.rainProtect = (req, res) => {
    try {
        valveManager.setRainProtect();
        res.redirect(200, '/');
    } catch (error) {
        res.redirect(400, '/');
    }

}
