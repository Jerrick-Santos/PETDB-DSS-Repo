const express = require('express')
const app = express()
const mysql = require('mysql')
const MainRoutes = require('./routes/mainRoute')
//CONNECTIONS
const db = mysql.createConnection({
    user: 'PEDTBDSSADMIN',
    port: 19459,
    host: 'mysql-117137-0.cloudclusters.net',
    password: 'pedtbdss6676!',
    database: 'PEDTBDSS_new'
})

db.connect(function(err) {  
    if (err) throw err;  
    console.log("SQL DB is now Connected!");  
  });  

app.listen(4000, () => {
    console.log("Server is RUNNINF ON PORT 4000")
})

//log tracker - middleware
app.use((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

app.use('/api', MainRoutes(db))

