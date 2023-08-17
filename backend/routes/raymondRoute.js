const express = require('express');
const router = express.Router();

//Enter routes here

// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router

    router.get('/getContacts', (req, res) => {

        /** Query Goals: Collect and return all of the close contacts of a specific patient's LATEST case */

        const patient_id = req.query.patient_id;
        const query = `
            SELECT mdct.last_name, mdct.first_name, mdct.middle_initial, mdct.birthdate, mdct.sex, mdct.contact_person, mdct.contact_num, mdct.contact_email, mdct.contact_relationship, mdct.date_added, mdct.remarks, mdct.refno
            FROM (SELECT p.PatientNo, MAX(c.CaseNo) AS latest_case_no FROM PEDTBDSS_new.TD_PTINFORMATION p INNER JOIN PEDTBDSS_new.TD_PTCASE c ON p.PatientNo = c.PatientNo WHERE p.PatientNo = ${patient_id} GROUP BY p.PatientNo) AS pc
            JOIN PEDTBDSS_new.TD_PTCASE c ON pc.PatientNo = c.PatientNo AND pc.latest_case_no = c.CaseNo
            JOIN PEDTBDSS_new.MD_CONTACTTRACING mdct ON c.CaseNo = mdct.CaseNo;
        `;

    
        db.query(query, (err, result) => {
            if (err) {
                console.error(err);
            }
            else {
                res.send(result);
            }
        });
    
    }),

    router.post('/addContacts', async (req, res) => {

        const {last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, patient_id} = req.body

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        /**TESTING */
        console.log(req.body);


        /**Query Goal: Find the latest case of a specific patient */

        let case_no;
        await db.query(`SELECT MAX(c.CaseNO) as MAXCaseNo
                FROM PEDTBDSS_new.TD_PTCASE c
                JOIN PEDTBDSS_new.TD_PTINFORMATION pi ON c.PatientNo = pi.PatientNo
                WHERE pi.PatientNo = ${patient_id};`, async (err, result) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        case_no = result;

                         /** Query Goal: Add the necessary close contact data to the latest case of a specificed patient */

                        await db.query('INSERT INTO PEDTB-DSS_new.MD_CONTACTTRACING (last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, date_added, CaseNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                        [last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, formattedDate, case_no]);
                    }
                });
    }),

    router.post('/convertContact', (req, res) => {

        /** ROUTER GOAL: Collect the contact information and insert it as new patient */
    })


    return router;

    
};
