const jwt = require('jsonwebtoken');
const secret="secret@2004";

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },
    secret,
    {expiresIn:"1h"}
    );
}



function getUser(id){
    return jwt.verify(id,secret);
}

module.exports = {
    setUser,
    getUser,
}




