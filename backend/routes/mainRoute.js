const express = require('express');
const router = express.Router();

// Define your route handlers using the db connection
router.post('/newpatient', (req, res) => {

    const {caseid} = req.params
    const {} = req.body 

    

});

// ... Define more route handlers using the 'db' connection

// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router
    return router;
};
