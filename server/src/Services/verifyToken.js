const jwt = require('jsonwebtoken');

exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt
    if (!accessToken) {
        return res.send(403);
    }

    let payload

    try {
        payload = jwt.verify(accessToken, process.env.TOKEN_SECRET)
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send("something went wrong")
    }
}