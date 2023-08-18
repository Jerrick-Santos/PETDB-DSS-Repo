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

        const formattedDate = new Date().toISOString().split('T')[0];

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
                        case_no = result[0].MAXCaseNo;
                        console.log();
                         /** Query Goal: Add the necessary close contact data to the latest case of a specificed patient */

                        await db.query('INSERT INTO MD_CONTACTTRACING (last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, date_added, CaseNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                        [last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, formattedDate, case_no]);
                    }
                });
        
        // TODO: return value
    }),

    router.post('/convertContact', (req, res) => {

        /** ROUTER GOAL: Collect the contact information and insert it as new patient */
        
        // Get necesary data
            // either passing the contact_no of the contact or;
            // their currently available information that was passed into the frontend already
        
        // query insert a new patient using the acquired information

        // return value
        



    }),

    router.get('/getPatient', (req, res) => {

        /** ROUTER GOAL: Match the first name, last name and middle initial
         *               of a to-be-added close contact and check if they are already
         *               added in the database as a patient
        */

        // Request sent data
        const last_name = req.query.last_name;
        const first_name = req.query.first_name;
        const middle_initial = req.query.middle_initial;
        const case_no = req.query.CaseNo;

        // SQL Query -- Find a patient record matching the given name
        const query = `SELECT 
                        pi.birthdate,
                        pi.sex,
                        pi.PatientNo
                       FROM PEDTBDSS_new.TD_PTINFORMATION pi
                       WHERE pi.last_name = '${last_name}'
                       AND pi.first_name = '${first_name}'
                       AND pi.middle_initial = '${middle_initial}';`
        
        // Guard clause to check if the query already exist in the contact tracing master list
        db.query(`SELECT * FROM PEDTBDSS_new.MD_CONTACTTRACING ct WHERE ct.last_name = '${last_name}' 
                  AND ct.first_name = '${first_name}' AND ct.middle_initial = '${middle_initial}'`, (err, result) => {
            if (err) {console.log(err);}
            else {
                if (result[0] != null) {
                    const message = "Contact exists in the contact tracing master list already!";
                    res.json({success: false, message: message});
                    console.log(message); // TESTING
                }
            }
        })
        
        // Find patient record with matching fields
        db.query(query, (err, result) => {
            if (err) {console.error(err);}
            else {
                if (result[0] != null) {
                    const birthdate = result[0].birthdate;

                    const formattedDate = new Date(birthdate).toISOString().split('T')[0];
                    const curr_date = new Date().toISOString().split('T')[0];

                    const sex = result[0].sex;
                    const patient_no = result[0].PatientNo;

                    // TODO: Missing Infomration for Contacts

                    const query_2 = `INSERT INTO PEDTBDSS_new.MD_CONTACTTRACING (last_name, first_name, middle_initial, birthdate, sex, date_added, CaseNo, PatientNo)
                                    VALUES ('${last_name}', '${first_name}', '${middle_initial}', '${formattedDate}', '${sex}','${curr_date}', ${case_no}, ${patient_no})`       

                    // Insert Patient Record into PEDTBDSS_new.MD_CONTACTTRACING
                    db.query(query_2, (err, result) => {
                        if (err) {console.log(err);}
                        else { 
                            const message = "Patient successfully added as a close contact!";
                            res.json({success: true, message: message});
                            console.log(message);
                        }
                    });

                    
                }
                else {
                    const message = "Patient does not exist in PEDTBDSS_new.TD_PTINFORMATION";
                    res.json({success: false, message: message});
                    console.log(message); // TESTING
                }
            }
        });
    })


    return router;

    
};
