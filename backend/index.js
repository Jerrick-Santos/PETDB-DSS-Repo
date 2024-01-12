const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const MainRoutes = require('./routes/mainRoute');
const kaloyRoute = require('./routes/kaloyRoute');
const raymondRoute = require('./routes/raymondRoute');
const diagnoseRoute = require('./routes/diagnoseRoute');
const simCasesRoute = require('./routes/simCasesRoute');
const authRoute = require('./routes/authRoute');
// CONNECTIONS

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

let dbPool;

// function createDBPool() {
//     dbPool = mysql.createPool({
//         user: 'PEDTBDSSADMIN',
//         port: 19459,
//         host: 'mysql-117137-0.cloudclusters.net',
//         password: 'pedtbdss6676!',
//         database: 'PEDTBDSS_new',
//         connectionLimit: 10, // Adjust as needed
//         waitForConnections: true,
//         queueLimit: 0,
//     });
// }

function createDBPool() {
    dbPool = mysql.createPool({
        user: 'root',
        port: 3306,
        host: 'localhost',
        database: 'pedtbdss_new',
        password: '12345',
        connectionLimit: 10, // Adjust as needed
        waitForConnections: true,
        queueLimit: 0,
    });
}


function handleDisconnect() {
    createDBPool();

    dbPool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
        } else {
            console.log('SQL DB is now Connected!');
            connection.release();
        }
    });

    dbPool.on('error', (err) => {
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

app.use('/api', MainRoutes(dbPool));
app.use('/api', kaloyRoute(dbPool));
app.use('/api', raymondRoute(dbPool));
app.use('/api', diagnoseRoute(dbPool));
app.use('/api', simCasesRoute(dbPool));
app.use('/api', authRoute(dbPool));