const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()
const session = require('express-session');
const { authenticateToken } = require('./authFunc');

// function autheticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })

// }


// Export the router with the attached 'db' connection
module.exports = (db) => {

    router.get('/tokencontent', authenticateToken, (req, res) => {

        const tokenContent = {
            userNo : req.user.userNo,
            user_type : req.user.user_type,
            first_name : req.user.first_name,
            last_name : req.user.last_name,
            BGYNo : req.user.BGYNo
        }

        res.json(tokenContent)
      });

    // Attach the 'db' connection to all route handlers before returning the router
    router.post('/login', (req, res) => {
        //Authenticate User

        const tokenContent = {
            userNo: null,
            IDNo: null,
            first_name: null, 
            last_name: null, 
            user_type: null,
            BGYNo: null
        }

        const password = req.body.password
        const username = req.body.username 

        const loginQuery = `SELECT * FROM PEDTBDSS_new.MD_USERS WHERE IDNo = '${username}' AND pw = '${password}'`

        db.query(loginQuery, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).json("Login Failed")
            } else {
                
                if(results.length === 0){
                    res.status(500).json("Wrong Username or Password")
                }
                else {

                    const {userNo,
                        IDNo,
                        first_name, 
                        last_name, 
                        user_type,
                        BGYNo} = results[0]

                    tokenContent.userNo = userNo
                    tokenContent.IDNo = IDNo
                    tokenContent.first_name = first_name
                    tokenContent.last_name = last_name
                    tokenContent.user_type = user_type
                    tokenContent.BGYNo = BGYNo    

                    const oneDayInSeconds = 24 * 60 * 60; // 1 day in seconds
                    
                    const accessToken = jwt.sign(
                        {
                          ...tokenContent,
                          exp: Math.floor(Date.now() / 1000) + oneDayInSeconds, // Expiry in seconds (1 day)
                        },
                        process.env.ACCESS_TOKEN_SECRET
                      );

                    res.json({ accessToken, user_type, BGYNo });
                }
            }
        });

    });


    return router;
};
