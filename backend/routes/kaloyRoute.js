const express = require('express');
const router = express.Router();

// Enter routes here


// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router
    router.post('/newpatient', (req, res) => {
        const q = "INSERT INTO TD_PTINFORMATION (`last_name`, `first_name`, `middle_initial`, `age`, `sex`, `birthdate`, `initial_bodyweight`, `initial_height`, `nationality`, `per_houseno`, `per_street`, `per_barangay`, `per_city`, `per_region`, `per_zipcode`, `curr_houseno`, `curr_street`, `curr_barangay`, `curr_city`, `curr_region`, `curr_zipcode`, `admission_date`, `mother_name`, `m_birthdate`, `m_contactno`, `m_email`, `father_name`, `f_birthdate`, `f_contactno`, `f_email`, `emergency_name`, `e_birthdate`, `e_contactno`, `e_email`) VALUES (?)"
        const values = [
            req.body.last_name,
            req.body.first_name,
            req.body.middle_initial,
            req.body.age,
            req.body.sex,
            req.body.birthdate,
            req.body.initial_bodyweight,
            req.body.initial_height,
            req.body.nationality,
            req.body.per_houseno,
            req.body.per_street,
            req.body.per_barangay,
            req.body.per_city,
            req.body.per_region,
            req.body.per_zipcode,
            req.body.curr_houseno,
            req.body.curr_street,
            req.body.curr_barangay,
            req.body.curr_city,
            req.body.curr_region,
            req.body.curr_zipcode,
            req.body.admission_date,
            req.body.mother_name,
            req.body.m_birthdate,
            req.body.m_contactno,
            req.body.m_email,
            req.body.father_name,
            req.body.f_birthdate,
            req.body.f_contactno,
            req.body.f_email,
            req.body.emergency_name,
            req.body.e_birthdate,
            req.body.e_contactno,
            req.body.e_email,
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.json(err)
            return res.json(data)
        })
    });
    return router;
};
