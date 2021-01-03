const router = require('express').Router();
const User = require('../Models/userSchema');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
    res.send("Please login");
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('User not registered');
    console.log(req.body.password)
    console.log(user.password);
    if (req.body.password !== user.password) {
        return res.send(400, 'Wrong password');
    }

    const token = jwt.sign(user.email, process.env.TOKEN_SECRET);
    res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
    res.send();
})

router.post('/register', async (req, res) => {

    const newUser = new User({
        name: "Test",
        email: "test@test.com",
        password: "test"
    });
    try {
        await newUser.save();
    } catch (error) {
        console.log(error);
    }

}) // delete
/*router.post('/login', async (req, res) => {
    //NAHAZET VALIDACI
    //Existuje uzivatel s timto emailem?
 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('User not registered');
 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Incorrect Password');
    //userName = user.name;
    //console.log(userName);
    //JWT TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.cookie('auth-token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
 
    //req.setHeader('auth-token', token); //problem bude zde
 
    return res.redirect('/');
})*/
module.exports = router;