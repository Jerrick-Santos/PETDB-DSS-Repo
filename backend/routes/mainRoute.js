const express = require('express');
const router = express.Router();


module.exports = (db) => {
    // Define your route handlers using the db connection

    //get all patient info
    router.get('/allpatients', (req, res) => {

        db.query(`
        SELECT pt.PatientNo, CONCAT(pt.first_name, ' ', pt.middle_initial, '. ' , pt.last_name) AS fullname,
            pt.birthdate,
            pt.sex,
            pt.age,
            pt.initial_bodyweight,
            pt.initial_height,
            pt.nationality,
            pt.address_1,
            pt.address_2,
            pt.city,
            pt.admission_date,
            pt.mother_name,
            pt.m_birthdate,
            pt.m_contactno,
            pt.m_email,
            pt.mother_name,
            pt.m_birthdate,
            pt.m_contactno,
            pt.m_email,
            pt.father_name,
            pt.f_birthdate,
            pt.f_contactno,
            pt.f_email,
            pt.emergency_name,
            pt.e_birthdate,
            pt.e_contactno,
            pt.e_email
        FROM PEDTBDSS_new.TD_PTINFORMATION pt
       
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

    //get all patient info of 1 patient 
    //:id patient no.
    router.get('/patient/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        db.query(`
        SELECT pt.PatientNo, CONCAT(pt.first_name, ' ', pt.middle_initial, '. ' , pt.last_name) AS fullname,
            pt.birthdate,
            pt.sex,
            pt.age,
            pt.initial_bodyweight,
            pt.initial_height,
            pt.nationality,
            pt.address_1,
            pt.address_2,
            pt.city,
            pt.admission_date,
            pt.mother_name,
            pt.m_birthdate,
            pt.m_contactno,
            pt.m_email,
            pt.mother_name,
            pt.m_birthdate,
            pt.m_contactno,
            pt.m_email,
            pt.father_name,
            pt.f_birthdate,
            pt.f_contactno,
            pt.f_email,
            pt.emergency_name,
            pt.e_birthdate,
            pt.e_contactno,
            pt.e_email
        FROM PEDTBDSS_new.TD_PTINFORMATION pt
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

    //Get all cases of 1 patient
    router.get('/patientcase/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        db.query(`
        SELECT *
        FROM PEDTBDSS_new.TD_PTCASE pc
        WHERE pc.PatientNo = ${id};
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


