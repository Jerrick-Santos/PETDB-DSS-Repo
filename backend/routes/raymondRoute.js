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
                        ct.CaseNo,
                        ct.PatientNo,
                        ct.date_contacted,
                        ct.ContactNo
                    FROM PEDTBDSS_new.MD_CONTACTTRACING ct
                    JOIN PEDTBDSS_new.TD_PTCASE ptc ON ct.CaseNo = ptc.CaseNo
                    WHERE ptc.CaseNo = ${case_id};
        `;

    
        db.query(query, (err, results) => {
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

    router.get('/getOneContact/:ContactNo', (req, res) => {

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

        const {last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, CaseNo} = req.body

        const formattedDate = new Date().toISOString().split('T')[0];
        const formattedBirthdate = new Date(birthdate).toISOString().split('T')[0];
        /**TESTING */
        console.log(req.body);
        
        /** Query Goal: Add the necessary close contact data to the latest case of a specificed patient */
        await db.query('INSERT INTO MD_CONTACTTRACING (last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, date_added, CaseNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                        [last_name, first_name, middle_initial, formattedBirthdate, sex, contact_person, contact_num, contact_email, contact_relationship, formattedDate, CaseNo]);
        
        // TODO: return value
    }),

    // TO BE DELETED: (Original Purpose: Submit close contact details to patient table, but can use addPatient instead)
    router.post('/convertContact', (req, res) => {

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

        const refno = req.body.case_refno

        db.query(q, [values], (err, data) => {
            if(err) {
                return res.json(err)
            } 
            console.log("Successfully added Patient! (1/3)");
        });

        let patient_no = null;
        db.query(`SELECT MAX(PatientNo) AS max_pno FROM PEDTBDSS_new.TD_PTINFORMATION;`, (err, data) => {
            if (err) {console.error(err)}
            else {
                patient_no = data.max_pno;
                console.log("Successfully retrieved latest patient number (2/3", res)
            }
        });

        const q2 = "INSERT INTO TD_PTCASE (`PatientNo`, `case_refno`, `SRNo`, `start_date`, `case_status`) VALUES (?, ?, ?, ?, ?)"
        const values2 = [patient_no, refno, 2, req.body.admission_date, "O"]

        db.query(q2, [values2], (err, res) => {
            if (err) {console.error(err)}
            else { 
                console.log("Successfully added new case to patient (3/3)", res)
            }
        })
    }),

    // TO BE DELETED (Original Purpose: find similar and add but process needs to be broken up)
    router.get('/getPatient', (req, res) => {

        /** ROUTER GOAL: Match the first name, last name and middle initial
         *               of a to-be-added close contact and check if they are already
         *               added in the database as a patient
         *  CASES:
         *      1. Patient exists in Patient DB but is not in the Contact Tracing -- Add as new close contact
         * 
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
                    console.log(message); 
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
    }),

    router.get('/getCasePatient/:CaseNo', (req, res) => {
        
        const q = `SELECT
                    CONCAT(pi.last_name, ", ",pi.first_name, " ", pi.middle_initial,".") AS patient_name,
                    pi.birthdate AS patient_birthdate,
                    ptc.case_refno
                   FROM PEDTBDSS_new.TD_PTCASE ptc
                   JOIN PEDTBDSS_new.TD_PTINFORMATION pi ON ptc.PatientNo = pi.PatientNo
                   WHERE ptc.CaseNo=${req.params.CaseNo}`
        
        db.query(q, (err, result) => {
            if (err) {console.error(err);}
            else {
                console.log(result);
                result[0].formattedBirthdate = new Date(result[0].patient_birthdate).toLocaleDateString()
                res.send(result);
            }
        })
    })

    router.get('/getSimilarPatients', (req, res) => {

        /** ROUTER GOAL: Get an index of patients with similar first name, middle initial and last name
         *  -- Expected to return the set of information that will be used in creating a new close contact
        */

        // Query to get a list of patients with matching first name, middle initial and last name
        const q = `SELECT * 
        FROM PEDTBDSS_new.TD_PTINFORMATION
        WHERE last_name = "${req.query.last_name}" 
        AND middle_initial = "${req.query.middle_initial}"
        AND first_name = "${req.query.first_name}"`

        db.query(q, (err, results) => {
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
        const q = `SELECT CaseNo
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
    })

    return router;

    
};
