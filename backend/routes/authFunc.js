// auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to authenticate a JWT token
function autheticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}



// // Middleware function to check if a user has a specific role
// function checkUserRole(role) {
//   return (req, res, next) => {
//     if (req.user && req.user.user_type === role) {
//       next();
//     } else {
//       res.sendStatus(403); // Forbidden
//     }
//   };
// }

module.exports = {
    autheticateToken
};
