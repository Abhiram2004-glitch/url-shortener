const User = require('../models/user');

const bcrypt = require('bcrypt');
const {setUser} = require('../service/auth');
async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
        name,
        email,
        password: hashedPassword,
    });
    return res.render('login');
}

async function handleUserLogin(req, res) {
    console.log("Login Request Received");
    const {email, password} = req.body;
    const user = await User.findOne({
        email,
    });
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    if(!user) return res.render('login', {error: "Invalid username or password"});
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isPasswordValid);

    if(!isPasswordValid) return res.render('login', {error: "Invalid username or password"});

    const token = setUser(user);
    res.cookie('token', token);
    if(!token) return res.redirect('/');
    return res.redirect('/home');  
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}
 