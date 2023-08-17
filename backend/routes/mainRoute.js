const express = require('express')

const router = express.Router()



// Export the router
module.exports = (db) => {
    // Here you can attach the 'db' connection to all your route handlers
    // before returning the router
    return router;
};