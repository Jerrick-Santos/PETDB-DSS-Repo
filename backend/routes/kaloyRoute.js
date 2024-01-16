const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./authFunc');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10
// Enter routes here


// Export the router with the attached 'db' connection
module.exports = (db) => {


    // Attach the 'db' connection to all route handlers before returning the router
    function findFirstInstance(arr, healthAssesmentDate) {
        let dateObj = {
          healthAssessment: healthAssesmentDate,
          presumptve_tb: 0,
          latent_tb: 0,
          confirmed_tb: 0,
          no_tb: 0,
        };

        let sequenceObj = {
            healthAssessment: 0,
            presumptve_tb: -1,
            latent_tb: -1,
            confirmed_tb: -1,
            no_tb: -1,
        }

        let sequence = 1
      
        for (let i = 0; i < arr.length; i++) {
          if (dateObj.presumptve_tb === 0 && (arr[i].presumptive_tb === 1 || arr[i].diagnosis.includes("Presumptive"))) {
            dateObj.presumptve_tb = arr[i].date;
            sequenceObj.presumptve_tb = sequence
            sequence++
          }
      
          if (dateObj.latent_tb === 0 && (arr[i].latent_tb === 1 || arr[i].diagnosis.includes("Latent"))) {
            dateObj.latent_tb = arr[i].date;
            sequenceObj.latent_tb = sequence
            sequence++
          }
      
          if (
            dateObj.confirmed_tb === 0 &&
            (arr[i].cli_diagnosed === 1 || (arr[i].baconfirmed === 1 || arr[i].diagnosis.includes("Clinically") ||  arr[i].diagnosis.includes("Confirmed")))
          ) {
            dateObj.confirmed_tb = arr[i].date;
            sequenceObj.confirmed_tb = sequence
            sequence++
          }
      
          if (dateObj.no_tb === 0 && (arr[i].no_tb === 1 || arr[i].diagnosis.includes("NO TB"))) {
            dateObj.no_tb = arr[i].date;
            sequenceObj.no_tb = sequence
            sequence++
          }
      
          // Break the loop if all first instances are found
          if (
            dateObj.presumptve_tb !== 0 &&
            dateObj.latent_tb !== 0 &&
            dateObj.confirmed_tb !== 0 &&
            dateObj.no_tb !== 0
          ) {
            break;
          }
        }

        retObj = {
            date: dateObj,
            sequence: sequenceObj
        }
        return retObj;
      }
    
    router.get('/getttimelineinfo/:caseid', (req, res) => {
        const caseid = req.params.caseid

        const getFirstHealthAssessment = `SELECT assessment_date
        FROM pedtbdss_new.td_healthassessment
        WHERE CaseNo = ${caseid}
        LIMIT 1;`

        const getDiagnosisByCase = `SELECT 
        t1.alldiag_id, 
        t1.sysdiag_id,
        t1.phydiag_id, 
        t2.DGNo,
        t2.DGDate AS date, 
        t2.CaseNo, 
        t3.diagnosis,
        t3.EPTBpositive, 
        t3.presumptive_tb, 
        t3.cli_diagnosed, 
        t3.baconfirmed, 
        t3.drug_res, 
        t3.drug_sens, 
        t3.multi_res, 
        t3.latent_tb, 
        t3.no_tb, 
        t3.need_eval, 
        t3.need_xray, 
        t3.need_mtb, 
        t3.need_tst, 
        t3.need_igra, 
        t3.need_dst,
        t3.need_followup,
        t2.need_hiv,
        t3.has_TBcontact
        FROM pedtbdss_new.td_alldiagnosis t1
        JOIN pedtbdss_new.td_ptdiagnosis t2 ON t1.sysdiag_id = t2.DGNo
        LEFT JOIN pedtbdss_new.md_diagnosisrules t3 ON t2.RuleNo = t3.RuleNo
        WHERE t2.CaseNo = ${caseid}
        
        UNION
        
        SELECT 
        t1.alldiag_id, 
        t1.sysdiag_id,
        t1.phydiag_id,
        NULL AS DGNo,
        t2.date,
        t3.CaseNo, 
        t2.reco_diagnosis AS diagnosis, 
        t2.recoEPTBpositive AS EPTBpositive, 
        NULL AS presumptive_tb, 
        NULL AS cli_diagnosed, 
        NULL AS baconfirmed, 
        NULL AS drug_res, 
        NULL AS drug_sens, 
        NULL AS multi_res, 
        NULL AS latent_tb, 
        NULL AS no_tb, 
        NULL AS need_eval, 
        t2.req_xray AS need_xray, 
        t2.req_mtb AS need_mtb, 
        t2.req_tst AS need_tst, 
        t2.req_igra AS need_igra, 
        t2.req_dst AS need_dst,
        t2.req_followup AS need_followup,
        t2.need_hiv,
        NULL AS has_TBcontact
        FROM pedtbdss_new.td_alldiagnosis t1
        JOIN pedtbdss_new.td_diagnosisfeedback t2 ON t1.phydiag_id = t2.feedback_id
        JOIN pedtbdss_new.td_ptdiagnosis t3 ON t2.DGNo = t3.DGNo
        WHERE t3.CaseNo = ${caseid};`

        db.query(getFirstHealthAssessment, (err, results) => {
            if (err) {
                res.status(500).json(err);
                console.log(err)
            }
            else if (results.length == 0){ //if no results found
                const noHAObj = {
                    date: {
                        "healthAssessment":0,
                        "presumptve_tb": 0,
                        "latent_tb": 0,
                        "confirmed_tb": 0,
                        "no_tb": 0
                    },
                    sequence: {
                        "healthAssessment": -1,
                        "presumptve_tb": -1,
                        "latent_tb": -1,
                        "confirmed_tb": -1,
                        "no_tb": -1
                    }
                }
                res.send(noHAObj);
            } else {

                db.query(getDiagnosisByCase, (err2, results2) => {
                    if (err2) {
                        res.status(500).json(err2);
                        console.log(err2)
                    } else {
                        console.log(results2)
                        const responseObj = {
                            ...findFirstInstance(results2, results[0].assessment_date)
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