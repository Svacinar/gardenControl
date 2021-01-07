const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../Models/userSchema');


exports.getUserToken = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User not registered')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Wrong password');
    }
    const token = jwt.sign(user.email, process.env.TOKEN_SECRET);
    return token
}

exports.userRegister = async (name, email, password) => {
    const checkForDuplicate = await User.findOne({ email: email })
    if (checkForDuplicate) {
        throw new Error('User Already Exists...')
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch (error) {
        throw new Error(error.message)
    }

}
