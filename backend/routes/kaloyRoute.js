const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./authFunc');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10
// Enter routes here


// Export the router with the attached 'db' connection
module.exports = (db) => {

    // Attach the 'db' connection to all route handlers before returning the router

    
    router.get('/getttimelineinfo/:caseid', (req, res) => {
        const caseid = req.params.caseid

        const getFirstHealthAssessment = `SELECT assessment_date
        FROM pedtbdss_new.td_healthassessment
        WHERE CaseNo = ${caseid}
        LIMIT 1;`

        const getDiagnosisByCase = `SELECT * 
        FROM pedtbdss_new.td_ptdiagnosis t1 
        JOIN pedtbdss_new.md_diagnosisrules t2 ON t1.RuleNo = t2.RuleNo
        WHERE CaseNo = ${caseid};	`

        db.query(getFirstHealthAssessment, (err, results) => {
            if (err) {
                res.status(500).json(err);
                console.log(err)
            }
            else if (!results){ //if no results found
                res.status(500).json({message: "No Health Assessments Found"});
            } else {

                db.query(getDiagnosisByCase, (err2, results2) => {
                    if (err2) {
                        res.status(500).json(err2);
                        console.log(err2)
                    } else {
                        const responseObj = {
                            healthAssessment: results,
                            diagnosisList: results2
                        };
                        res.send(responseObj)
                    }
                });
            }
        });
    })

    router.post('/newpatient', authenticateToken, async (req, res) => {

        const userid = req.user.userNo

        // Insert patient information into the database
        const insertPatientQuery = `
            INSERT INTO TD_PTINFORMATION (
                last_name, first_name, middle_initial, age, sex, birthdate, initial_bodyweight, initial_height, nationality, per_houseno, per_street, per_region, per_province, per_city, per_barangay, per_zipcode, curr_houseno, curr_street, curr_region, curr_province, curr_city, curr_barangay, curr_zipcode, admission_date, guardian_name, g_relationship, g_birthdate, g_contactno, g_email, mother_name, m_birthdate, m_contactno, m_email, father_name, f_birthdate, f_contactno, f_email, emergency_name, e_relationship, e_birthdate, e_contactno, e_email
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const patientValues = [
            // ... Populate values based on req.body
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
            req.body.per_region,
            req.body.per_province,
            req.body.per_city,
            req.body.per_barangay,
            req.body.per_zipcode,
            req.body.curr_houseno,
            req.body.curr_street,
            req.body.curr_region,
            req.body.curr_province,
            req.body.curr_city,
            req.body.curr_barangay,
            req.body.curr_zipcode,
            req.body.admission_date,
            req.body.guardian_name,
            req.body.g_relationship,
            req.body.g_birthdate,
            req.body.g_contactno,
            req.body.g_email,
            req.body.mother_name,
            req.body.m_birthdate,
            req.body.m_contactno,
            req.body.m_email,
            req.body.father_name,
            req.body.f_birthdate,
            req.body.f_contactno,
            req.body.f_email,
            req.body.emergency_name,
            req.body.e_relationship,
            req.body.e_birthdate,
            req.body.e_contactno,
            req.body.e_email,
        ];

        // Retrieve the PatientNo for the inserted patient
        db.query(insertPatientQuery, patientValues, (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
        
            // Retrieve the last inserted ID
            const patientNo = result.insertId;
        
            // Use patientNo in subsequent queries
            const refno = req.body.case_refno;
        
            // Now you can insert data into TD_PTCASE using patientNo
            const insertCaseQuery = `
                INSERT INTO TD_PTCASE (PatientNo, case_refno, SRNo, start_date, case_status)
                VALUES (?, ?, ?, ?, ?)`;
        
            var caseValues = [patientNo, refno, 2, req.body.admission_date, "O"];
            
            // For converting exisiting close contacts into patients
            const updateCloseContactQuery = `UPDATE PEDTBDSS_new.MD_CONTACTTRACING SET PatientNo = ? WHERE ContactNo = ?`   // update existing record from null to new patient id
            const searchActiveCaseQuery = `SELECT active, DRDescription FROM REF_DIAGNOSISRESULTS WHERE DRNo = ?` // check if drno is active
            const searchManualDiagnosisRule = `SELECT RuleNo FROM PEDTBDSS_new.MD_DIAGNOSISRULES WHERE has_symp = 9 AND diagnosis LIKE ?;` // reference drdescription with diagnosisrules
            const insertManualDiagnosis = `INSERT INTO TD_PTDIAGNOSIS (DGDate, CaseNo, RuleNo, userNo, need_hiv, healthassess_id, xray_id, mtb_id, tst_id, igra_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` // add manual diagnosis
            // if passed with a parameter "id", then the soon to be patient is a converted close contact. update close contact with the new patient no
            if (req.body.id) {
                db.query(updateCloseContactQuery, [patientNo, req.body.id], (err, res) => {
                    if (err) { console.log(err) }
                })
            }

            // TESTING ----------------------------------------
            // Changes:: Accounting for new cases

            // CONDITION 1: if they are a close contact convert and have a history of TB and/or treatments
            if (req.body.id && req.body.DRNo && req.body.TSNo) {
                db.query(searchActiveCaseQuery, [req.body.DRNo], (err, result) => {
                    if (err) { console.error(err) }
                    else {

                        // TEST
                        console.log("1/4", result)

                        if (result[0].active) { // CONDITION 2: checking if the diagnosis result is a form of active tb, if yes set case insert query to 'closed'
                            caseValues[caseValues.length-1] = "C" 
                        }

                        caseValues[2] = 8 // signify that the status is a manual entry

                        db.query(insertCaseQuery, caseValues, (err, caseResult) => {
                            if (err) { console.error(err) }
                            
                            // TEST
                            console.log("2/4", caseResult, caseValues)

                           
                            // search for rule no
                            db.query(searchManualDiagnosisRule, [result[0].DRDescription], (err, rulesResult) => {
                                if (err) { console.error(err) }
                                else {

                                    // TEST
                                    console.log("3/4", rulesResult, result[0].DRDescription)

                                    db.query(insertManualDiagnosis, [ req.body.admission_date, caseResult.insertId, rulesResult[0].RuleNo, userid, 9,9,9,9,9,9 ], (err, diagResult) => {
                                        if (err) { console.error(err) }
                                        else {

                                            // TEST
                                            console.log("4/4", diagResult)

                                            console.log("Successfully inserted into TD_PTCASE:", diagResult);
                                            return res.json(diagResult);
                                        }
                                    })
                                }
                            })
                            // create diagnosis record for newly added case using caseResult.insertId

                        });

                    }
                })
            }
            else {
                db.query(insertCaseQuery, caseValues, (err, caseResult) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    
                    console.log("Successfully inserted into TD_PTCASE:", caseResult);
                    return res.json(caseResult);
                });
            }
            // TESTING -----------------

            // db.query(insertCaseQuery, caseValues, (err, caseResult) => {
            //     if (err) {
            //         return res.status(500).json(err);
            //     }
                
            //     console.log("Successfully inserted into TD_PTCASE:", caseResult);
            //     return res.json(caseResult);
            // });
            
        });
    

});

router.post('/newbhc', async (req, res) => {

const q = "INSERT INTO MD_BARANGAYS (`BGYName`, `BGYOperatingHours`, `BGYContactNumber`, `BGYEmailAddress`, `BGYUnitNo`, `BGYStreet`, `BGYBarangay`, `BGYCity`, `BGYRegion`, `BGYProvince`, `BGYZipCode`, `XCoord`, `YCoord`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
const values = [
    req.body.BGYName,
    req.body.BGYOperatingHours,
    req.body.BGYContactNumber,
    req.body.BGYEmailAddress,
    req.body.BGYUnitNo,
    req.body.BGYStreet,
    req.body.BGYBarangay,
    req.body.BGYCity,
    req.body.BGYRegion,
    req.body.BGYProvince,
    req.body.BGYZipCode,
    req.body.XCoord,
    req.body.YCoord
]

        // Insert patient information into the database
        const insertBHCQuery = "INSERT INTO MD_BARANGAYS (`BGYName`, `BGYOperatingHours`, `BGYContactNumber`, `BGYEmailAddress`, `BGYUnitNo`, `BGYStreet`, `BGYBarangay`, `BGYCity`, `BGYRegion`, `BGYProvince`, `BGYZipCode`, `XCoord`, `YCoord`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const BHCValues = [
            // ... Populate values based on req.body
            req.body.BGYName,
            req.body.BGYOperatingHours,
            req.body.BGYContactNumber,
            req.body.BGYEmailAddress,
            req.body.BGYUnitNo,
            req.body.BGYStreet,
            req.body.BGYBarangay,
            req.body.BGYCity,
            req.body.BGYRegion,
            req.body.BGYProvince,
            req.body.BGYZipCode,
            req.body.XCoord,
            req.body.YCoord
        ];

        // Retrieve the PatientNo for the inserted patient
        db.query(insertBHCQuery, BHCValues, async (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
        
            // Retrieve the last inserted ID
            const bhcNo = result.insertId;
            const hashedPassword = await bcrypt.hash(req.body.pw, SALT_ROUNDS);
            // Now you can insert data into TD_PTCASE using patientNo
            const insertUserQuery = "INSERT INTO MD_USERS (`first_name`, `middle_name`, `last_name`, `IDNo`, `pw`, `BGYNo`, `isActive`, `user_type`, `passwordChanged`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const userValues = [
                req.body.first_name,
                req.body.middle_name,
                req.body.last_name,
                req.body.IDNo,
                hashedPassword,
                bhcNo,
                req.body.isActive,
                req.body.user_type,
                req.body.passwordChanged,
            ]

        
            db.query(insertUserQuery, userValues, (err, caseResult) => {
                if (err) {
                    return res.status(500).json(err);
                }
                
                console.log("Successfully inserted into TD_PTCASE:", caseResult);
                return res.json(caseResult);
            });
            
        });
           
        
    });


    
    return router;
};
