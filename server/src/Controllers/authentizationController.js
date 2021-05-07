const authentization = require('../Services/authentization');

exports.getLoginPage = (req, res) => {
    res.send('Please login');
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    let token = null;
    try {
        token = await authentization.getUserToken(email, password);
        res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.send(200, "User Logged In");
    } catch (error) {
        res.send(400, error.message)
    }

}

exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await authentization.userRegister(name, email, password);
        res.sendStatus(200);
    } catch (error) {
        res.send(400, error.message);
    }

}

exports.logout = (req, res) => {
    res.cookie('jwt', "", { expires: new Date(Date.now()), httpOnly: true });
    res.send(200, 'User logged out');
}