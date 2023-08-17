const express = require('express');
const router = express.Router();


module.exports = (db) => {
    // Define your route handlers using the db connection
    router.get('/allpatients', (req, res) => {

        db.query(`
        SELECT pt.PatientNo, CONCAT(pt.first_name, ' ', pt.last_name) AS fullname,
            pt.birthdate,
            pt.sex,
            pt.age,
            pc.CaseNo
        FROM PEDTBDSS_new.TD_PTINFORMATION pt
        JOIN PEDTBDSS_new.TD_PTCASE pc ON pt.PatientNo = pc.PatientNo;
    `, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            results.forEach(result => {
                console.log(result.age);
            });
            res.send(results)
        }
    });
    });

    router.get('/patient/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        db.query(`
            SELECT pt.PatientNo, CONCAT(pt.first_name, ' ', pt.last_name) AS fullname,
            pt.birthdate,
            pt.sex,
            pt.age,
            pc.CaseNo
        FROM PEDTBDSS_new.TD_PTINFORMATION pt
        JOIN PEDTBDSS_new.TD_PTCASE pc ON pt.PatientNo = pc.PatientNo
        WHERE pt.PatientNo = ${id};
    `, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            results.forEach(result => {
                 result.fullname;
            });
            res.send(results)
        }
    });
    });


    // ... Define more route handlers using the 'db' connection

    return router;
};


