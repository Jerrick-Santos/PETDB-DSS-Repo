const express = require('express');
const router = express.Router();

//Enter routes here

// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router

    router.get('/getContacts/:CaseNo', (req, res) => {

        /** Query Goals: Collect and return all of the close contacts of a specific patient's LATEST case */

        const case_id = req.params.CaseNo;
        const query = `
                    SELECT 
                        ct.last_name,
                        ct.first_name,
                        ct.middle_initial,
                        ct.birthdate,
                        ct.sex,
                        ct.contact_person,
                        ct.contact_num,
                        ct.contact_email,
                        ct.contact_relationship,
                        ct.date_added,
                        ct.PatientNo,
                        ct.ContactNo
                    FROM PEDTBDSS_new.MD_CONTACTTRACING ct
                    JOIN PEDTBDSS_new.MD_CTRACECASE ctc ON ct.ContactNo = ctc.ContactNo
                    JOIN PEDTBDSS_new.TD_PTCASE ptc ON ctc.CaseNo = ptc.CaseNo
                    WHERE ptc.CaseNo = ?;
        `;

    
        db.query(query, [case_id], (err, results) => {
            if (err) {
                console.error(err);
            }
            else {
            
                // Computing for Close Contact Age
                results.forEach(result => {
                    const currDate = new Date()
                    const birthdate = new Date(result.birthdate)
                    let age = currDate.getFullYear() - birthdate.getFullYear()

                    console.log(currDate.getFullYear(), " ", birthdate.getFullYear(), " ", age)

                    if (
                        currDate.getMonth() < birthdate.getMonth() ||
                        (currDate.getMonth() === birthdate.getMonth() &&
                            currDate.getDate() < birthdate.getDate())
                    ) {
                        age--;
                    }

                    result.age = age
                })

                console.log(results);
                res.send(results);
            }
        });
    
    }),

    // DEPRECATE: use other routers
    router.get('/getOneContact/:ContactNo', (req, res) => {

        /** Query Goals: Used for checking if a similarity exists f */

        const query = `
                    SELECT 
                        ct.last_name,
                        ct.first_name,
                        ct.middle_initial,
                        ct.birthdate,
                        ct.sex,
                        ct.contact_person,
                        ct.contact_num,
                        ct.contact_email,
                        ct.contact_relationship
                    FROM PEDTBDSS_new.MD_CONTACTTRACING ct
                    WHERE ct.ContactNo = ${req.params.ContactNo};
        `;        

        db.query(query, (err, results) => {
            if (err) {console.error(err);}
            else {
                console.log(results)
                res.send(results)
            }
        })
    }),

    router.post('/addContacts', async (req, res) => {

        const {last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, PatientNo} = req.body

        const formattedDate = new Date().toISOString().split('T')[0];
        const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];
        
        let exist
        await db.query('SELECT ContactNo FROM MD_CONTACTTRACING WHERE last_name LIKE ? AND first_name LIKE ? AND middle_initial LIKE ?', [String(last_name), String(first_name), String(middle_initial)], (err, data) => {
            if (err) {console.log(err)} else {

                console.log("data: ",data)
                if (data && data.length > 0) { exist = data[0].ContactNo } else { exist = null }
                console.log("EXIST_RES LOG: ", exist)


                if (exist == null) {
                    // TODO: Check if the relationship exists
                    db.query('INSERT INTO MD_CONTACTTRACING (last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, date_added, PatientNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [last_name, first_name, middle_initial, formattedBirthdate, sex, contact_person, contact_num, contact_email, contact_relationship, formattedDate, PatientNo], (err, data) => {
                        if (err) {console.log(err)} else {

                            db.query('SELECT MAX(ContactNo) AS latest FROM MD_CONTACTTRACING', [], (err, data) => {
                                if (err) {console.log(err)} else {
                                    db.query('INSERT INTO MD_CTRACECASE (ContactNo, CaseNo) VALUES (?, ?)', [data[0].latest, req.body.CaseNo], (err, data) => {
                                        console.log("success!! --1 "); res.status(200).json({message: 'Success... New close contact added to database'})
                                    })
                                }
                            }) 

                        }
                    });
                } else {
                    db.query('INSERT INTO MD_CTRACECASE (ContactNo, CaseNo) VALUES (?, ?)', [exist, req.body.CaseNo], (err, data) => {
                        if (err) {console.log(err)} else { res.status(200).json({message: 'Success... New case added to close contact'}) }
                    })
                }

            }
        })
    }),

    router.get('/getCasePatient/:CaseNo', (req, res) => {
        
        const q = `SELECT
                    CONCAT(UPPER(pi.last_name), ", ",pi.first_name, " ", pi.middle_initial) AS patient_name,
                    ptc.case_refno,
                    ptc.start_date,
                    ptc.end_date,
                    ptc.presumptive_id,
                    ptc.case_status,
                    ptc.PatientNo
                   FROM PEDTBDSS_new.TD_PTCASE ptc
                   JOIN PEDTBDSS_new.TD_PTINFORMATION pi ON ptc.PatientNo = pi.PatientNo
                   WHERE ptc.CaseNo=${req.params.CaseNo}`
        
        db.query(q, (err, result) => {
            if (err) {console.error(err);}
            else {
                console.log(result);
                res.send(result);
            }
        })
    })

    router.get('/getSimilarPatients/:first_name/:middle_initial/:last_name', (req, res) => {

        /** ROUTER GOAL: Get an index of patients with similar first name, middle initial and last name
         *  -- Expected to return the set of information that will be used in creating a new close contact
        */

        // Query to get a list of patients with matching first name, middle initial and last name
        const q = `SELECT 
                    last_name,
                    middle_initial,
                    first_name,
                    birthdate,
                    sex,
                    emergency_name,
                    e_contactno,
                    e_email, 
                    PatientNo
        FROM PEDTBDSS_new.TD_PTINFORMATION
        WHERE last_name like ?
        AND middle_initial like ?
        AND first_name like ?;`

        db.query(q, [req.params.last_name, req.params.middle_initial, req.params.first_name], (err, results) => {
            if (err) {console.error(err)}
            else {
                console.log(results)
                res.send(results)
            }
        })
    }),

    router.get('/getPatientNo/:caseNum', (req, res) => {

        const q = `SELECT PatientNo
        FROM PEDTBDSS_new.TD_PTCASE
        WHERE CaseNo = ${req.params.caseNum};`

        db.query(q, (err, results) => {
            if (err) {console.error(err)}
            else {
                res.send(results)
            }
        })
    }),

    router.get('/getLatestCase/:PatientNo', (req, res) => {
        const q = `SELECT CaseNo, start_date
        FROM PEDTBDSS_new.TD_PTCASE
        WHERE PatientNo = ${req.params.PatientNo}
        ORDER BY start_date DESC
        LIMIT 1;
        `

        db.query(q, (err, results) => {
            if (err) {console.error(err)}
            else {
                res.send(results)
            }
        })
    }),

    router.get('/getCaseStatus/:caseNum', (req, res) => {
        
        const q = `SELECT case_status FROM PEDTBDSS_new.TD_PTCASE WHERE CaseNo = ?;`

        db.query(q, [req.params.caseNum], (err, results) => {
            if (err) {console.error(err)}
            else {
                res.send(results)
            }
        })
    }),

    router.get('/getHealthAssessmentDate/:caseNum', (req, res) => {

        const q = `SELECT 
        pc.start_date AS ha_start
        FROM PEDTBDSS_new.TD_PTCASE pc
        JOIN PEDTBDSS_new.TD_HEALTHASSESSMENT ha ON pc.CaseNo = ha.CaseNo
        WHERE pc.CaseNo = ?;`

        db.query(q, [req.params.caseNum], (err, results) => {
            if (err) {console.error(err)}
            else {
                res.send(results)
            }
        })
    }),

    router.get('/getXrayDate/:caseNum', (req, res) => {

        const q = `SELECT issue_date
        FROM PEDTBDSS_new.TD_DIAGNOSTICRESULTS
        WHERE DGTestNo = 1
        AND CaseNo = ?;`

        db.query(q, [req.params.caseNum], (err, results) => {
            if (err) {console.error(err)}
            else {
                res.send(results)
            }
        })
    })
    

    return router;

    
};
