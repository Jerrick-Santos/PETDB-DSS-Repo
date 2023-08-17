const express = require('express');
const router = express.Router();

// Define your route handlers using the db connection
router.post('/newpatient', (req, res) => {

    const {last_name, first_name, middle_initial, age, sex} = req.body //kinuha mo lang ung inputs/fields sa react

    db.query('INSERT INTO table_name (last_name, first_name, middle_initial, age, sex) VALUES (?, ?, ?, ?, ?)', 
    [last_name, first_name, middle_initial, age, sex])

});

// ... Define more route handlers using the 'db' connection

// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router
    return router;
};
