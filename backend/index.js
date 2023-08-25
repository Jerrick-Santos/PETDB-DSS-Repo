const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const MainRoutes = require('./routes/mainRoute');
const kaloyRoute = require('./routes/kaloyRoute');
const raymondRoute = require('./routes/raymondRoute');
const diagnoseRoute = require('./routes/diagnoseRoute');

// CONNECTIONS

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

let db;

function handleDisconnect() {
    db = mysql.createConnection({
        user: 'PEDTBDSSADMIN',
        port: 19459,
        host: 'mysql-117137-0.cloudclusters.net',
        password: 'pedtbdss6676!',
        database: 'PEDTBDSS_new'
    });

    db.connect(function(err) {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000); // Attempt to reconnect after 2 seconds
        } else {
            console.log("SQL DB is now Connected!");
        }
    });

    db.on('error', function(err) {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

app.listen(4000, () => {
    console.log("Server is RUNNING ON PORT 4000");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log tracker - middleware
app.use((req, res, next) => {
    console.log(req.path, res.method);
    next();
});

app.use('/api', MainRoutes(db));
app.use('/api', kaloyRoute(db));
app.use('/api', raymondRoute(db));
app.use('/api', diagnoseRoute(db));
