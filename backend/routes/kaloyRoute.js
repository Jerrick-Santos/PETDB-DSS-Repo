const express = require('express');
const router = express.Router();

// Enter routes here


// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router
    return router;
};
