const temperatureManager = require('../Services/temperatureManager');

exports.getAllTemperatures = async (req, res) => {
    try {
        const data = await temperatureManager.getAllTemperatures();
        res.status('200').send(data);
    } catch (error) {
        res.status('400').send(error.message);
    }
}