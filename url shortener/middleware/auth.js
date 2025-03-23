const { getUser } = require('../service/auth');

async function restrictToLoggedInUseOnly(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/');
    
 

    const user = await getUser(token);
    if (!user) return res.redirect('/');

    req.user = user; 
    next();
}

module.exports = {
    restrictToLoggedInUseOnly,
};
