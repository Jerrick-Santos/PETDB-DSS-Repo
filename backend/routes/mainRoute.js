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
    router.post('/newpatient', (req, res) => {

        const {last_name, first_name, middle_initial, age, sex, birthdate, initial_bodyweight, initial_height, nationality, address_1, address_2, city, mother_name, m_birthdate, m_contactno, m_email, father_name, f_birthdate, f_contactno, f_email, emergency_name, e_birthdate, e_contactno, e_email} = req.body //kinuha mo lang ung inputs/fields sa react
    
        db.query('INSERT INTO TD_PTINFORMATION (last_name, first_name, middle_initial, age, sex, birthdate, initial_bodyweight, initial_height, nationality, address_1, address_2, city, admission_date, mother_name, m_birthdate, m_contactno, m_email, father_name, f_birthdate, f_contactno, f_email, emergency_name, e_birthdate, e_contactno, e_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, curdate(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [last_name, first_name, middle_initial, age, sex, birthdate, initial_bodyweight, initial_height, nationality, address_1, address_2, city, mother_name, m_birthdate, m_contactno, m_email, father_name, f_birthdate, f_contactno, f_email, emergency_name, e_birthdate, e_contactno, e_email],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values inserted!")
            }
        })
    
    });
    return router;
};


