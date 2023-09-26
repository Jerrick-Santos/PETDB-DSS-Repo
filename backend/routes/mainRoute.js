const express = require('express');
const router = express.Router();


module.exports = (db) => {
    // Define your route handlers using the db connection

    //get all patient info
    router.get('/allpatients', (req, res) => {

        db.query(`
        SELECT pt.PatientNo,
        pc.CaseNo,
        pc.case_refno, pc.case_status,
        CONCAT(pt.last_name, ', ', pt.first_name, ' ', pt.middle_initial) AS fullname,
        pt.birthdate,
        pt.sex,
        pt.age,
        pt.initial_bodyweight,
        pt.initial_height,
        pt.nationality,
        CONCAT(pt.per_houseno, ' ', pt.per_street, ' ', pt.per_barangay, ' ', pt.per_city, ' ', pt.per_region, ' ', pt.per_zipcode) AS per_address,
        CONCAT(pt.curr_houseno, ' ', pt.curr_street, ' ', pt.curr_barangay, ' ', pt.curr_city, ' ', pt.curr_region, ' ', pt.curr_zipcode) AS curr_address,
        pt.admission_date,
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
 JOIN PEDTBDSS_new.TD_PTCASE pc ON pc.PatientNo = pt.PatientNo
 JOIN (
     SELECT PatientNo, MAX(start_date) AS latest_start_date
     FROM PEDTBDSS_new.TD_PTCASE
     GROUP BY PatientNo
 ) latest_cases ON pc.PatientNo = latest_cases.PatientNo AND pc.start_date = latest_cases.latest_start_date
 WHERE pc.case_status = 'O' OR (
     pc.case_status <> 'O' AND NOT EXISTS (
         SELECT 1
         FROM PEDTBDSS_new.TD_PTCASE sub_pc
         WHERE sub_pc.PatientNo = pc.PatientNo AND sub_pc.start_date = latest_cases.latest_start_date AND sub_pc.case_status = 'O'
     )

 )
 ORDER BY pt.last_name, pt.first_name, pt.middle_initial;
 
       
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
    //id is PatientNo
    router.get('/patient/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        db.query(`
        SELECT pt.PatientNo, CONCAT(pt.last_name, ', ', pt.first_name, ' ', pt.middle_initial ) AS fullname,
        pt.birthdate,
        pt.sex,
        pt.age,
        pt.initial_bodyweight,
        pt.initial_height,
        pt.nationality,
        CONCAT(pt.per_houseno, ' ', pt.per_street, ' ', pb.barangay_name, ' ', pm.municipality_name, ' ', pp.province_name, ' ', pr.region_name, ' ', pt.per_zipcode) AS per_address,
        CONCAT(pt.curr_houseno, ' ', pt.curr_street, ' ', cb.barangay_name, ' ', cm.municipality_name, ' ', cp.province_name, ' ', cr.region_name, ' ', pt.curr_zipcode) AS curr_address,
        pt.admission_date,
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
        pt.e_email,
        pt.guardian_name,
        pt.g_birthdate,
        pt.g_contactno,
        pt.g_email
        FROM PEDTBDSS_new.TD_PTINFORMATION pt
        JOIN PEDTBDSS_new.table_region cr ON pt.per_region = cr.region_id 
        JOIN PEDTBDSS_new.table_region pr ON pt.curr_region = pr.region_id 
        JOIN PEDTBDSS_new.table_province cp ON pt.per_province= cp.province_id 
        JOIN PEDTBDSS_new.table_province pp ON pt.curr_province = pp.province_id 
        JOIN PEDTBDSS_new.table_municipality cm ON pt.per_city= cm.municipality_id 
        JOIN PEDTBDSS_new.table_municipality pm ON pt.curr_city = pm.municipality_id 
        JOIN PEDTBDSS_new.table_barangay cb ON pt.per_barangay= cb.barangay_id 
        JOIN PEDTBDSS_new.table_barangay pb ON pt.curr_barangay = pb.barangay_id 
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

    //Get all assessments of 1 case
    router.get('/patientassessment/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        db.query(`
        SELECT ha.AssessNo, ha.CaseNo, ha.cough, ha.c_weeks, ha.c_persist, ha.fever,
		ha.fe_weeks, ha.fe_persist, ha.weight_loss, ha.wl_weeks, ha.wl_persist, ha.night_sweats, ha.ns_weeks,
        ha.ns_persist, ha.fatigue, ha.fat_weeks, ha.fat_persist, ha.red_playfulness, ha.rp_weeks, ha.rp_persist, 
        ha.dec_acts, ha.da_weeks, ha.da_persist, ha.not_eating_well, ha.new_weeks, ha.new_persist, ha.non_painful_ecl, 
        ha.drowsy, ha.can_stand, ha.ass_body_weight, ha.ass_height, ha.ass_bmi, ha.ass_temp, ha.ass_bp, ha.plhiv,
        ha.hiv, ha.mother_hiv, ha.smoking, ha.drinking, ha.sex_active, ha.renal_disease, ha.malnutrition, ha.other_health_issues,
        ha.other_meds, ha.other_dd_interacts, ha.other_comorbid, ha.assessment_date, ha.userNo, ha.prevPTB_diagnosed,
        CONCAT(u.last_name, ', ', u.first_name, ' ', u.middle_name) AS user_fullname
		
        FROM PEDTBDSS_new.TD_HEALTHASSESSMENT ha
        JOIN PEDTBDSS_new.MD_USERS u ON u.UserNo = ha.UserNo
        WHERE ha.CaseNo = ${id}
        ORDER BY ha.assessment_date desc;
        `, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                results.forEach(result => {
                     result.fullname;
                });
                res.send(results)
            }
        })
    })

    //Get all cases of 1 patient
    //id is PatientNo
    router.get('/patientcase/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        db.query(`
        SELECT
			
            ptc.CaseNo, 
            ptc.case_refno,
            sr.SRDescription,
            ptc.start_date,
            ptc.end_date,
            ptc.case_status,
            p.PRESref,
            l.LATENTref
        FROM PEDTBDSS_new.TD_PTCASE ptc
        JOIN PEDTBDSS_new.REF_STATUSREASONS sr ON ptc.SRNo = sr.SRNo
        LEFT JOIN PEDTBDSS_new.ML_PRESUMPTIVE p ON p.CaseNo = ptc.CaseNo
        LEFT JOIN PEDTBDSS_new.ML_LATENT l ON l.CaseNo = ptc.CaseNo
        WHERE ptc.PatientNo = ${id}
        ORDER BY ptc.start_date DESC;
    `, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            results.forEach(result => {
                 result.fullname;
                 result.formatStartDate = new Date(result.start_date).toLocaleDateString()
            });
            res.send(results)
        }
    });
    });

    //Get 1 case details
    //id is CaseNo
    router.get('/case/:id', (req, res) => {
        const id = req.params.id;
        console.log(id)
        db.query(`
        SELECT *
        FROM PEDTBDSS_new.TD_PTCASE pc
        WHERE pc.CaseNo = ${id};
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

    router.post('/newcase', (req, res) => {
        const query = "INSERT INTO TD_PTCASE (`PatientNo`, `case_refno`, `SRNo`, `start_date`, `case_status`) VALUES (?, ?, ?, ?, ?)"
        const queryValues = [req.body.patientNo, req.body.case_refno, 2, req.body.startDate, "O"]
        db.query(query, queryValues, (err, data) => {
            if(err) {
                console.log("Error inserting into TD_PTCASE:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into TD_PTCASE:", data);
            return res.json(data)
        });
    })

    router.post('/newassessment', (req, res) => {
        const assessQuery = "INSERT INTO TD_HEALTHASSESSMENT (`CaseNo`, `cough`, `c_weeks`, `c_persist`, `fever`, `fe_weeks`, `fe_persist`, `weight_loss`, `wl_weeks`, `wl_persist`, `night_sweats`, `ns_weeks`, `ns_persist`, `fatigue`, `fat_weeks`, `fat_persist`, `red_playfulness`, `rp_weeks`, `rp_persist`, `dec_acts`, `da_weeks`, `da_persist`, `not_eating_well`, `new_weeks`, `new_persist`, `non_painful_ecl`, `drowsy`, `prevPTB_diagnosed`, `can_stand`, `ass_body_weight`, `ass_height`, `ass_bmi`, `ass_temp`, `ass_bp`, `plhiv`, `hiv`, `mother_hiv`, `smoking`, `drinking`, `sex_active`, `renal_disease`, `malnutrition`, `other_health_issues`, `other_meds`, `other_dd_interacts`, `other_comorbid`, `assessment_date`, `userNo`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const assessQueryValues = [
            req.body.case_no,
            req.body.cough,
            req.body.c_weeks,
            req.body.c_persist,
            req.body.fever,
            req.body.fe_weeks,
            req.body.fe_persist,
            req.body.weight_loss,
            req.body.wl_weeks,
            req.body.wl_persist,
            req.body.night_sweats,
            req.body.ns_weeks,
            req.body.ns_persist,
            req.body.fatigue,
            req.body.fat_weeks,
            req.body.fat_persist,
            req.body.red_playfulness,
            req.body.rp_weeks,
            req.body.rp_persist,
            req.body.dec_acts,
            req.body.da_weeks,
            req.body.da_persist,
            req.body.not_eating_well,
            req.body.new_weeks,
            req.body.new_persist,
            req.body.non_painful_ecl,
            req.body.drowsy,
            req.body.prevPTB_diagnosed,
            req.body.can_stand,
            req.body.ass_body_weight,
            req.body.ass_height,
            req.body.ass_bmi,
            req.body.ass_temp,
            req.body.ass_bp,
            req.body.plhiv,
            req.body.hiv,
            req.body.mother_hiv,
            req.body.smoking,
            req.body.drinking,
            req.body.sex_active,
            req.body.renal_disease,
            req.body.malnutrition,
            req.body.other_health_issues,
            req.body.other_meds,
            req.body.other_dd_interacts,
            req.body.other_comorbid,
            req.body.assessment_date,
            req.body.userNo,
        ]
        db.query(assessQuery, assessQueryValues, (err, data) => {
            if(err) {
                console.log("Error inserting into TD_HEALTHASSESMENT:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into TD_HEALTHASSESMENT:", data);
            return res.json(data)
        });
    })


    //get all diagnostic test results based on caseid: and testno :id
    router.get('/testresults/:caseid/:id', (req, res) => {
        const testno = req.params.id;
        const caseid = req.params.caseid;
        db.query(`
        SELECT dr.DGResultsNo, dr.CaseNo, dr.DGTestNo, dr.TestValue, dr.validity, dr.HINo, h.HIName, dr.issue_date, dr.test_refno
            FROM PEDTBDSS_new.MD_HI h 
            JOIN PEDTBDSS_new.TD_DIAGNOSTICRESULTS dr ON dr.HINo = h.HINo 
        WHERE dr.CaseNo=${caseid} AND dr.DGTestNo=${testno};
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


    //SEARCH PATIENT ROUTES
    router.get('/searchpatient/:id', (req, res) => {
        const searchTerm = req.params.id;
        db.query(`
        SELECT pt.PatientNo,
        pc.CaseNo,
        pc.case_refno, pc.case_status,
        CONCAT(pt.last_name, ', ', pt.first_name, ' ', pt.middle_initial) AS fullname,
        pt.birthdate,
        pt.sex,
        pt.age,
        pt.initial_bodyweight,
        pt.initial_height,
        pt.nationality,
        CONCAT(pt.per_houseno, ' ', pt.per_street, ' ', pt.per_barangay, ' ', pt.per_city, ' ', pt.per_region, ' ', pt.per_zipcode) AS per_address,
        CONCAT(pt.curr_houseno, ' ', pt.curr_street, ' ', pt.curr_barangay, ' ', pt.curr_city, ' ', pt.curr_region, ' ', pt.curr_zipcode) AS curr_address,
        pt.admission_date,
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
 JOIN PEDTBDSS_new.TD_PTCASE pc ON pc.PatientNo = pt.PatientNo
 JOIN (
     SELECT PatientNo, MAX(start_date) AS latest_start_date
     FROM PEDTBDSS_new.TD_PTCASE
     GROUP BY PatientNo
 ) latest_cases ON pc.PatientNo = latest_cases.PatientNo AND pc.start_date = latest_cases.latest_start_date
 WHERE (pc.case_status = 'O' OR (
     pc.case_status <> 'O' AND NOT EXISTS (
         SELECT 1
         FROM PEDTBDSS_new.TD_PTCASE sub_pc
         WHERE sub_pc.PatientNo = pc.PatientNo AND sub_pc.start_date = latest_cases.latest_start_date AND sub_pc.case_status = 'O'
     )
 )) AND (
    CONCAT(COALESCE(pt.last_name," "), ' ', COALESCE(pt.first_name," "), ' ', COALESCE(pt.middle_initial," ")) LIKE '%${searchTerm}%'
    OR CONCAT(COALESCE(pt.first_name," "), ' ', COALESCE(pt.middle_initial," "), ' ', COALESCE(pt.last_name," ")) LIKE '%${searchTerm}%'
    OR CONCAT(COALESCE(pt.first_name," "), ' ', COALESCE(pt.last_name," ")) LIKE '%${searchTerm}%'
    OR pc.CaseNo LIKE '%${searchTerm}%'
  );

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

    router.get('/advancedsearch/:lnm/:fnm/:mnm/:age/:sex/:bd/:nt', (req, res) => {
        const lnm = req.params.lnm.replace('_','');
        const fnm = req.params.fnm.replace('_','');
        const mnm = req.params.mnm.replace('_','');
        const age = req.params.age.replace('_','');
        const sex = req.params.sex.replace('_','');
        const bd = req.params.bd.replace('_','');
        const nt = req.params.nt.replace('_','');
       
        
        db.query(`
        SELECT pt.PatientNo,
        pc.CaseNo,
        pc.case_refno, pc.case_status,
        CONCAT(pt.last_name, ', ', pt.first_name, ' ', pt.middle_initial) AS fullname,
        pt.birthdate,
        pt.sex,
        pt.age,
        pt.initial_bodyweight,
        pt.initial_height,
        pt.nationality,
        CONCAT(pt.per_houseno, ' ', pt.per_street, ' ', pt.per_barangay, ' ', pt.per_city, ' ', pt.per_region, ' ', pt.per_zipcode) AS per_address,
        CONCAT(pt.curr_houseno, ' ', pt.curr_street, ' ', pt.curr_barangay, ' ', pt.curr_city, ' ', pt.curr_region, ' ', pt.curr_zipcode) AS curr_address,
        pt.admission_date,
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
 JOIN PEDTBDSS_new.TD_PTCASE pc ON pc.PatientNo = pt.PatientNo
 JOIN (
     SELECT PatientNo, MAX(start_date) AS latest_start_date
     FROM PEDTBDSS_new.TD_PTCASE
     GROUP BY PatientNo
 ) latest_cases ON pc.PatientNo = latest_cases.PatientNo AND pc.start_date = latest_cases.latest_start_date
 WHERE (pc.case_status = 'O' OR (
     pc.case_status <> 'O' AND NOT EXISTS (
         SELECT 1
         FROM PEDTBDSS_new.TD_PTCASE sub_pc
         WHERE sub_pc.PatientNo = pc.PatientNo AND sub_pc.start_date = latest_cases.latest_start_date AND sub_pc.case_status = 'O'
     )
 )) AND (
    COALESCE(pt.last_name, '')LIKE "%${lnm}%" AND
    COALESCE(pt.first_name, '')LIKE "%${fnm}%" AND
    COALESCE(pt.middle_initial, '')LIKE "%${mnm}%" AND
    COALESCE(pt.age, '')LIKE "%${age}%" AND
    COALESCE(pt.sex, '')LIKE "%${sex}%" AND
    COALESCE(pt.birthdate, '')LIKE "%${bd}%" AND
    COALESCE(pt.nationality, '')LIKE "%${nt}%" 
  );



       
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
    
    
    router.get('/validity/:id', (req, res) => {
        const testno = req.params.id;
        db.query(`
        SELECT d.DGValidityMonths
        FROM PEDTBDSS_new.MD_DGTESTS d
        WHERE DGTestNo = ${testno};
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
    })




    //ADMIN ROUTES

    //create a new health institution
    router.post('/newhi', (req, res) => {
        const q = "INSERT INTO MD_HI (`HIName`, `HIOperatingHours`, `HIContactNumber`, `HIEmailAddress`, `HIUnitNo`, `HIStreet`, `HIBarangay`, `HICity`, `HIRegion`, `HIProvince`, `HIZipCode`, `XCoord`, `YCoord` , `HIContactPerson`, `isActive`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [
            req.body.HIName,
            req.body.HIOperatingHours,
            req.body.HIContactNumber,
            req.body.HIEmailAddress,
            req.body.HIUnitNo,
            req.body.HIStreet,
            req.body.HIBarangay,
            req.body.HICity,
            req.body.HIRegion,
            req.body.HIProvince,
            req.body.HIZipCode,
            req.body.XCoord,
            req.body.YCoord,
            req.body.HIContactPerson,
            req.body.isActive
        ]

        db.query(q, values, (err, data) => {
            if(err) {
                console.log("Error inserting into MD_HI:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into MD_HI:", data);
            return res.json(data)
        });
    })

    //create a new diagnostic test
    router.post('/createdt', (req, res) => {
        const q = "INSERT INTO MD_DGTESTS(`DGTestName`, `DGValidityMonths` , `isRequired` , `isActive`) VALUES (?, ?, ?, ?)"
        const values = [
            req.body.DGTestName,
            req.body.DGValidityMonths,
            req.body.isRequired,
            req.body.isActive
        ]

        db.query(q, values, (err, data) => {
            if(err) {
                console.log("Error inserting into MD_DGTESTS:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into MD_DGTESTS:", data);
            return res.json(data)
        });
    })

    router.post('/newTSTresults', (req, res) => {
        const testresultsQuery = "INSERT INTO TD_DIAGNOSTICRESULTS (`CaseNo`, `DGTestNo`, `TestValue`, `validity`, `HINo`, `issue_date`, `test_refno`) VALUES (?, ?, ?, ?, ?, ?, ?)"
        const testresultsValues = [
            req.body.CaseNo,
            3,
            req.body.TestValue,
            req.body.validity,
            req.body.HINo,
            req.body.issue_date,
            req.body.test_refno
        ]
        db.query(testresultsQuery, testresultsValues, (err, data) => {
            if(err) {
                console.log("Error inserting into TD_DIAGNOSTICRESULTS:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into TD_DIAGNOSTICRESULTS:", data);
            return res.json(data)
        })
    })

    function interpretRIF(RIF_result){
        const MTB_RIF = RIF_result.split('-');
    
        const RIF = MTB_RIF[1]; 

        return RIF

    }

    router.post('/newMTBresults', (req, res) => {
        const insertDrugResistance = "INSERT INTO TD_DRUGRESISTANCE (`CaseNo`, `rif`, `drug1`, `drug2`, `drug3`, `DGResultsNo`) VALUES (?, ?, ?, ?, ?, ?)";
        const testresultsQuery = "INSERT INTO TD_DIAGNOSTICRESULTS (`CaseNo`, `DGTestNo`, `TestValue`, `validity`, `HINo`, `issue_date`, `test_refno`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const testresultsValues = [
            req.body.CaseNo,
            2,
            req.body.TestValue,
            req.body.validity,
            req.body.HINo,
            req.body.issue_date,
            req.body.test_refno
        ];
    
        db.query(testresultsQuery, testresultsValues, (err, result) => {
            if (err) {
                console.log("Error inserting into TD_DIAGNOSTICRESULTS:", err);
                return res.json(err);
            }
    
            console.log("Successfully inserted into TD_DIAGNOSTICRESULTS:", result);
    
            // Get the auto-incremented primary key (DGResultsNo)
            const DGResultsNo = result.insertId;
    
            const RIFresult = interpretRIF(req.body.TestValue);
    
            if (RIFresult === "R" || RIFresult === "S") {
                db.query(insertDrugResistance, [req.body.CaseNo, RIFresult, "NA", "NA", "NA", DGResultsNo], (err1, result1) => {
                    if (err1) {
                        console.log("Error inserting into TD_DRUGRESISTANCE:", err1);
                        return res.json(err1);
                    }
    
                    console.log("Successfully inserted into TD_DRUGRESISTANCE:", result1);
    
                    return res.json(result); // Return the result of the first query
                });
            } else {
                return res.json(result); // Return the result of the first query
            }
        });
    });

    function DSTinterpreter(drug1, drug2, drug3){
        let R_count = 0 
        const drugResults = [drug1, drug2, drug3]

        for (let i = 0; i < drugResults.length; i++) {
                if(drugResults[i] === "R"){
                    R_count++;
                }
          }

        if(R_count >= 2){
            return 2;
        }
        else if(R_count == 1){
            return 1;
        }
        else {
            return -1;
        }
    }

    router.post('/newDSTresults', (req, res) => {
        const insertDrugResistance = "INSERT INTO TD_DRUGRESISTANCE (`CaseNo`, `rif`, `drug1`, `drug2`, `drug3`, `DGResultsNo`) VALUES (?, ?, ?, ?, ?, ?)";
        const testresultsQuery = "INSERT INTO TD_DIAGNOSTICRESULTS (`CaseNo`, `DGTestNo`, `TestValue`, `validity`, `HINo`, `issue_date`, `test_refno`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const testValue = DSTinterpreter(req.body.drug1, req.body.drug2, req.body.drug3)
        
        const testresultsValues = [
            req.body.CaseNo,
            9,
            testValue,
            req.body.validity,
            req.body.HINo,
            req.body.issue_date,
            req.body.test_refno
        ];
    
        db.query(testresultsQuery, testresultsValues, (err, result) => {
            if (err) {
                console.log("Error inserting into TD_DIAGNOSTICRESULTS:", err);
                return res.json(err);
            }
    
            console.log("Successfully inserted into TD_DIAGNOSTICRESULTS:", result);
    
            // Get the auto-incremented primary key (DGResultsNo)
            const DGResultsNo = result.insertId;
    
    
                db.query(insertDrugResistance, [req.body.CaseNo, "NA", req.body.drug1, req.body.drug2, req.body.drug3, DGResultsNo], (err1, result1) => {
                    if (err1) {
                        console.log("Error inserting into TD_DRUGRESISTANCE:", err1);
                        return res.json(err1);
                    }
    
                    console.log("Successfully inserted into TD_DRUGRESISTANCE:", result1);
    
                    return res.json(result); // Return the result of the first query
                });

        });
    }); 
    

    router.post('/newXrayresults', (req, res) => {
        const testresultsQuery = "INSERT INTO TD_DIAGNOSTICRESULTS (`CaseNo`, `DGTestNo`, `TestValue`, `validity`, `HINo`, `issue_date`, `test_refno`) VALUES (?, ?, ?, ?, ?, ?, ?)"
        const testresultsValues = [
            req.body.CaseNo,
            1,
            req.body.TestValue,
            req.body.validity,
            req.body.HINo,
            req.body.issue_date,
            req.body.test_refno
        ]
        db.query(testresultsQuery, testresultsValues, (err, data) => {
            if(err) {
                console.log("Error inserting into TD_DIAGNOSTICRESULTS:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into TD_DIAGNOSTICRESULTS:", data);
            return res.json(data)
        })
    })

    router.post('/newIGRAresults', (req, res) => {
        const testresultsQuery = "INSERT INTO TD_DIAGNOSTICRESULTS (`CaseNo`, `DGTestNo`, `TestValue`, `validity`, `HINo`, `issue_date`, `test_refno`) VALUES (?, ?, ?, ?, ?, ?, ?)"
        const testresultsValues = [
            req.body.CaseNo,
            7,
            req.body.TestValue,
            req.body.validity,
            req.body.HINo,
            req.body.issue_date,
            req.body.test_refno
        ]
        db.query(testresultsQuery, testresultsValues, (err, data) => {
            if(err) {
                console.log("Error inserting into TD_DIAGNOSTICRESULTS:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into TD_DIAGNOSTICRESULTS:", data);
            return res.json(data)
        })
    })

    //get all BHC records
    router.get('/allbhc', (req, res) => {

        db.query(`
        SELECT bg.BGYNo,
            bg.BGYName, 
            CONCAT(bg.BGYUnitNo, ' ', bg.BGYStreet, ' ', bg.BGYBarangay, ' ', bg.BGYCity, ' ', bg.BGYRegion, ' ', bg.BGYProvince, ' ', bg.BGYZipCode) AS address,
            bg.BGYOperatingHours,
            bg.BGYContactNumber,
            bg.BGYEmailAddress,
            bg.XCoord,
            bg.YCoord
        FROM PEDTBDSS_new.MD_BARANGAYS bg
       
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

    //get all HI records
    router.get('/allhi', (req, res) => {

        db.query(`
        SELECT h.HINo,
        h.HIName, 
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion,
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', b.barangay_name , ' ', m.municipality_name , ' ', p.province_name, ' ', r.region_name ,' ', h.HIZipCode) AS address,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIContactPerson,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord,
        h.isActive
    FROM PEDTBDSS_new.MD_HI h
    JOIN PEDTBDSS_new.table_region r ON h.HIRegion = r.region_id 
    JOIN PEDTBDSS_new.table_province p ON h.HIProvince= p.province_id 
    JOIN PEDTBDSS_new.table_municipality m ON  h.HICity= m.municipality_id 
    JOIN PEDTBDSS_new.table_barangay b ON h.HIBarangay = b.barangay_id
        ORDER BY HIName;
       
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

    //get all HI records
    router.get('/hiwithtests/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT h.HINo,
        h.HIName 
        FROM PEDTBDSS_new.MD_HI h
        JOIN PEDTBDSS_new.MD_HIDGTESTS dt ON h.HINo = dt.HINo
        WHERE dt.DGTestNo = ${id}
        ORDER BY h.HIName;
       
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

    router.get('/allregions', (req, res) => {
        db.query(`
        SELECT r.region_id,
            r.region_name,
            r.region_description
        FROM PEDTBDSS_new.table_region r
        ORDER BY region_id;
        `, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                results.forEach(result => {
                    console.log(result.age);
                });
                res.send(results)
            }
        })
    })

    router.get('/provinces/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT *
        FROM PEDTBDSS_new.table_province r
        WHERE region_id = ${id}
        ORDER BY province_id;
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

    router.get('/cities/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT *
        FROM PEDTBDSS_new.table_municipality c
        WHERE province_id = ${id}
        ORDER BY municipality_id;
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

    router.get('/barangays/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT *
        FROM PEDTBDSS_new.table_barangay b
        WHERE municipality_id = ${id}
        ORDER BY barangay_id;
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

    //get all Diagnostic Test Records
    router.get('/alldt', (req, res) => {

        db.query(`
        SELECT *
        FROM PEDTBDSS_new.MD_DGTESTS
        ORDER BY DGTestName
       
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

    //get a single BHC info given a bhc id
    router.get('/bhc/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT bg.BGYNo,
            bg.BGYName, 
            CONCAT(bg.BGYUnitNo, ' ', bg.BGYStreet, ' ', bg.BGYBarangay, ' ', bg.BGYCity, ' ', bg.BGYRegion, ' ', bg.BGYProvince, ' ', bg.BGYZipCode) AS address,
            bg.BGYOperatingHours,
            bg.BGYContactNumber,
            bg.BGYEmailAddress,
            bg.XCoord,
            bg.YCoord
        FROM PEDTBDSS_new.MD_BARANGAYS bg
        WHERE bg.BGYNo=${id};
       
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

    //get a single HI info based on an HI ID
    router.get('/hi/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT h.HINo,
        h.HIName, 
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion, 
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', b.barangay_name , ' ', m.municipality_name , ' ', p.province_name, ' ', r.region_name ,' ', h.HIZipCode) AS address,
        h.HIUnitNo,
        h.HIStreet,
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion,
        h.HIZipCode,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIContactPerson,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord,
        h.isActive
    FROM PEDTBDSS_new.MD_HI h
    JOIN PEDTBDSS_new.table_region r ON h.HIRegion = r.region_id 
    JOIN PEDTBDSS_new.table_province p ON h.HIProvince= p.province_id 
    JOIN PEDTBDSS_new.table_municipality m ON  h.HICity= m.municipality_id 
    JOIN PEDTBDSS_new.table_barangay b ON h.HIBarangay = b.barangay_id
        WHERE h.HINo =${id};
       
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

    //get all HIs under a given BHC id
    router.get('/bhchi/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT h.HINo,
        h.HIName, 
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion, 
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', b.barangay_name , ' ', m.municipality_name , ' ', p.province_name, ' ', r.region_name ,' ', h.HIZipCode) AS address,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIContactPerson,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord
    FROM PEDTBDSS_new.MD_HI h
    JOIN PEDTBDSS_new.table_region r ON h.HIRegion = r.region_id 
    JOIN PEDTBDSS_new.table_province p ON h.HIProvince= p.province_id 
    JOIN PEDTBDSS_new.table_municipality m ON  h.HICity= m.municipality_id 
    JOIN PEDTBDSS_new.table_barangay b ON h.HIBarangay = b.barangay_id
            JOIN   PEDTBDSS_new.MD_BRGYHI bh ON bh.HINo = h.HINo
            WHERE bh.BGYNO=${id};
       
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


    router.get('/searchbhchi/:id/:search', (req, res) => {
        const searchTerm = req.params.search;
        const id = req.params.id;
        db.query(`
        SELECT h.HINo,
        h.HIName, 
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion,
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', b.barangay_name , ' ', m.municipality_name , ' ', p.province_name, ' ', r.region_name ,' ', h.HIZipCode) AS address,
        h.HIUnitNo,
        h.HIStreet,
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion,
        h.HIZipCode,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIContactPerson,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord,
        h.isActive
    FROM PEDTBDSS_new.MD_HI h
    JOIN PEDTBDSS_new.table_region r ON h.HIRegion = r.region_id 
    JOIN PEDTBDSS_new.table_province p ON h.HIProvince= p.province_id 
    JOIN PEDTBDSS_new.table_municipality m ON  h.HICity= m.municipality_id 
    JOIN PEDTBDSS_new.table_barangay b ON h.HIBarangay = b.barangay_id
            JOIN   PEDTBDSS_new.MD_BRGYHI bh ON bh.HINo = h.HINo
            WHERE bh.BGYNO=${id} AND
    COALESCE(h.HIName, '')
    LIKE '%${searchTerm}%'
    ORDER BY h.HIName;
    `, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            results.forEach(result => {
                console.log(result.age);
            });
            res.send(results)
        }
    })
})

     //get all tests under a given HI id
     router.get('/hitests/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT *
            FROM  PEDTBDSS_new.MD_HIDGTESTS ht
            JOIN   PEDTBDSS_new.MD_DGTESTS d ON ht.DGTestNo = d.DGTestNo
            WHERE ht.HINo=${id};
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

    //get all tests that are NOT under a given HI id
    router.get('/himissingtests/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT * 
            FROM  PEDTBDSS_new.MD_DGTESTS
            WHERE DGTestNo NOT IN(SELECT d.DGTestNo
            FROM PEDTBDSS_new.MD_HIDGTESTS ht
            JOIN PEDTBDSS_new.MD_DGTESTS d ON ht.DGTestNo = d.DGTestNo
            WHERE ht.HINo=${id});
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

    //get all HIs that are NOT under a given BHC id
    router.get('/bhcmissinghi/:id', (req, res) => {
        const id = req.params.id;
        db.query(`
        SELECT h.HINo,
        h.HIName, 
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion,
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', b.barangay_name , ' ', m.municipality_name , ' ', p.province_name, ' ', r.region_name ,' ', h.HIZipCode) AS address,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIContactPerson,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord,
        h.isActive
    FROM PEDTBDSS_new.MD_HI h
    JOIN PEDTBDSS_new.table_region r ON h.HIRegion = r.region_id 
    JOIN PEDTBDSS_new.table_province p ON h.HIProvince= p.province_id 
    JOIN PEDTBDSS_new.table_municipality m ON  h.HICity= m.municipality_id 
    JOIN PEDTBDSS_new.table_barangay b ON h.HIBarangay = b.barangay_id
            WHERE HINo NOT IN(SELECT h.HINo
            FROM PEDTBDSS_new.MD_HI h
            JOIN PEDTBDSS_new.MD_BRGYHI bh ON h.HINo = bh.HINo
            WHERE bh.BGYNo=${id})
            ORDER BY h.HIName ;
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

     //get all HIs that are NOT under a given BHC id
     router.get('/searchbhcmissinghi/:id/:search', (req, res) => {
        const id = req.params.id;
        const searchTerm = req.params.search;
        db.query(`
        SELECT h.HINo,
        h.HIName, 
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion,
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', b.barangay_name , ' ', m.municipality_name , ' ', p.province_name, ' ', r.region_name ,' ', h.HIZipCode) AS address,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIContactPerson,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord,
        h.isActive
    FROM PEDTBDSS_new.MD_HI h
    JOIN PEDTBDSS_new.table_region r ON h.HIRegion = r.region_id 
    JOIN PEDTBDSS_new.table_province p ON h.HIProvince= p.province_id 
    JOIN PEDTBDSS_new.table_municipality m ON  h.HICity= m.municipality_id 
    JOIN PEDTBDSS_new.table_barangay b ON h.HIBarangay = b.barangay_id
            WHERE HINo NOT IN(SELECT h.HINo
            FROM PEDTBDSS_new.MD_HI h
            JOIN PEDTBDSS_new.MD_BRGYHI bh ON h.HINo = bh.HINo
            WHERE bh.BGYNo=${id})
            AND COALESCE(h.HIName, '')
    LIKE '%${searchTerm}%'
    ORDER BY h.HIName ;
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

     //assign an hi to a bhc by adding to MD_BRGYHI
     router.post('/assignhi', (req, res) => {
        const q = "INSERT INTO MD_BRGYHI(`BGYNo`, `HINo`) VALUES (?, ?)"
        const values = [
            req.body.BGYNo,
            req.body.HINo,
        ]

        db.query(q, values, (err, data) => {
            if(err) {
                console.log("Error inserting into  MD_BRGYHI:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into  MD_BRGYHI:", data);
            return res.json(data)
        });
    })

     //assign a test to an hi by adding to MD_HIDGTESTS
     router.post('/assigntest', (req, res) => {
        const q = "INSERT INTO MD_HIDGTESTS(`HINo`, `DGTestNo`, `AcceptingVoucher`, `Price`, `isActive` ) VALUES (?, ?, ?, ?, ?)"
        const values = [
            req.body.HINo,
            req.body.DGTestNo,
            req.body.AcceptingVoucher,
            req.body.Price,
            req.body.isActive
        ]

        db.query(q, values, (err, data) => {
            if(err) {
                console.log("Error inserting into  MD_HIDGTESTS:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into  MD_HIDGTESTS:", data);
            return res.json(data)
        });
    })

    //SEARCH ROUTES FOR ADMIN VIEW
    router.get('/searchhi/:id/', (req, res) => {
        const searchTerm = req.params.id;
        db.query(`
        SELECT h.HINo,
        h.HIName, 
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion, 
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', b.barangay_name , ' ', m.municipality_name , ' ', p.province_name, ' ', r.region_name ,' ', h.HIZipCode) AS address,
        h.HIUnitNo,
        h.HIStreet,
        h.HIBarangay,
        h.HICity,
        h.HIProvince,
        h.HIRegion,
        h.HIZipCode,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIContactPerson,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord,
        h.isActive
    FROM PEDTBDSS_new.MD_HI h
    JOIN PEDTBDSS_new.table_region r ON h.HIRegion = r.region_id 
    JOIN PEDTBDSS_new.table_province p ON h.HIProvince= p.province_id 
    JOIN PEDTBDSS_new.table_municipality m ON  h.HICity= m.municipality_id 
    JOIN PEDTBDSS_new.table_barangay b ON h.HIBarangay = b.barangay_id
WHERE 
    COALESCE(h.HIName, '')
    LIKE '%${searchTerm}%'
    ORDER BY h.HIName;
    `, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            results.forEach(result => {
                console.log(result.age);
            });
            res.send(results)
        }
    })
})


//CHECKING OF REFERENCES FOR HI
router.get('/checkhiref/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT
    (SELECT COUNT(*) FROM MD_HIDGTESTS WHERE HINo = ${id}) +
    (SELECT COUNT(*) FROM MD_BRGYHI WHERE HINo = ${id}) +
    (SELECT COUNT(*) FROM TD_DIAGNOSTICRESULTS WHERE HINo = ${id}) AS total_references;
`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})

router.post('/updatetests', (req, res) => {
    const values = [
        req.body.HINo,
        req.body.issue_date,
        req.body.test_refno,
        req.body.TestValue,
        req.body.validity,
        req.body.DGResultsNo,
    ]

    db.query(`UPDATE 	TD_DIAGNOSTICRESULTS
                SET		HINo = ?, issue_date = ?, test_refno = ?, TestValue = ?, validity = ?
                WHERE	DGResultsNo = ?;
            `, values, (err, data) => {
        if(err) {
            console.log("Error updating into  TD_DIAGNOSTICRESULTS:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  TD_DIAGNOSTICRESULTS:", data);
        return res.json(data)
    });
})

router.post('/updateassess', (req, res) => {
    const values = [
        req.body.ass_bmi,
        req.body.ass_temp,
        req.body.ass_bp,
        req.body.cough,
        req.body.c_weeks,
        req.body.c_persist,
        req.body.fever,
        req.body.fe_weeks,
        req.body.fe_persist,
        req.body.weight_loss,//10
        req.body.wl_weeks,
        req.body.wl_persist,
        req.body.night_sweats,
        req.body.ns_weeks,
        req.body.ns_persist,
        req.body.fatigue,
        req.body.fat_weeks,
        req.body.fat_persist,
        req.body.red_playfulness,
        req.body.rp_weeks,//10
        req.body.rp_persist,
        req.body.dec_acts,
        req.body.da_weeks,
        req.body.da_persist,
        req.body.not_eating_well,
        req.body.new_weeks,
        req.body.new_persist,
        req.body.non_painful_ecl,
        req.body.drowsy,
        req.body.can_stand,//10
        req.body.ass_body_weight,
        req.body.ass_height,
        req.body.plhiv,
        req.body.hiv,
        req.body.mother_hiv,
        req.body.smoking,
        req.body.drinking,
        req.body.sex_active,
        req.body.renal_disease,
        req.body.malnutrition,//10
        req.body.other_health_issues,
        req.body.other_meds,
        req.body.other_dd_interacts,
        req.body.other_comorbid,
        req.body.assessment_date,
        req.body.prevPTB_diagnosed,
        req.body.AssessNo,//7
    ]

    db.query(`UPDATE 	TD_HEALTHASSESSMENT
                SET		ass_bmi = ?, ass_temp = ?, ass_bp = ?, cough = ?, c_weeks = ?, c_persist = ?, fever = ?, fe_weeks = ?, fe_persist = ?, weight_loss = ?, wl_weeks = ?, wl_persist = ?, night_sweats = ?, ns_weeks = ?, ns_persist = ?, fatigue = ?, fat_weeks = ?, fat_persist = ?, red_playfulness = ?, rp_weeks = ?, rp_persist = ?, dec_acts = ?, da_weeks = ?, da_persist = ?, not_eating_well = ?, new_weeks = ?, new_persist = ?, non_painful_ecl = ?, drowsy = ?, can_stand = ?, ass_body_weight = ?, ass_height = ?, plhiv = ?, hiv = ?, mother_hiv = ?, smoking = ?, drinking = ?, sex_active = ?, renal_disease = ?, malnutrition = ?, other_health_issues = ?, other_meds = ?, other_dd_interacts = ?, other_comorbid = ?, assessment_date = ?, prevPTB_diagnosed = ?
                WHERE	AssessNo = ?;
            `, values, (err, data) => {
        if(err) {
            console.log("Error updating into  TD_HEALTHASSESSMENT:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  TD_HEALTHASSESSMENT:", data);
        return res.json(data)
    });
})

router.post('/updateassessnopersist', (req, res) => {
    const values = [
        req.body.ass_bmi,
        req.body.ass_temp,
        req.body.ass_bp,
        req.body.cough,
        req.body.c_weeks,
        req.body.fever,
        req.body.fe_weeks,
        req.body.weight_loss,//10
        req.body.wl_weeks,
        req.body.night_sweats,
        req.body.ns_weeks,
        req.body.fatigue,
        req.body.fat_weeks,
        req.body.red_playfulness,
        req.body.rp_weeks,//10
        req.body.dec_acts,
        req.body.da_weeks,
        req.body.not_eating_well,
        req.body.new_weeks,
        req.body.non_painful_ecl,
        req.body.drowsy,
        req.body.can_stand,//10
        req.body.ass_body_weight,
        req.body.ass_height,
        req.body.plhiv,
        req.body.hiv,
        req.body.mother_hiv,
        req.body.smoking,
        req.body.drinking,
        req.body.sex_active,
        req.body.renal_disease,
        req.body.malnutrition,//10
        req.body.other_health_issues,
        req.body.other_meds,
        req.body.other_dd_interacts,
        req.body.other_comorbid,
        req.body.assessment_date,
        req.body.prevPTB_diagnosed,
        req.body.AssessNo,//7
    ]

    db.query(`UPDATE 	TD_HEALTHASSESSMENT
                SET		ass_bmi = ?, ass_temp = ?, ass_bp = ?, cough = ?, c_weeks = ?, fever = ?, fe_weeks = ?, weight_loss = ?, wl_weeks = ?, night_sweats = ?, ns_weeks = ?, fatigue = ?, fat_weeks = ?, red_playfulness = ?, rp_weeks = ?, dec_acts = ?, da_weeks = ?, not_eating_well = ?, new_weeks = ?, non_painful_ecl = ?, drowsy = ?, can_stand = ?, ass_body_weight = ?, ass_height = ?, plhiv = ?, hiv = ?, mother_hiv = ?, smoking = ?, drinking = ?, sex_active = ?, renal_disease = ?, malnutrition = ?, other_health_issues = ?, other_meds = ?, other_dd_interacts = ?, other_comorbid = ?, assessment_date = ?, prevPTB_diagnosed = ?
                WHERE	AssessNo = ?;
            `, values, (err, data) => {
        if(err) {
            console.log("Error updating into  TD_HEALTHASSESSMENT:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  TD_HEALTHASSESSMENT:", data);
        return res.json(data)
    });
})

router.get('/checkassessref/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT COUNT(*) AS total_references FROM TD_PTDIAGNOSIS WHERE healthassess_id = ${id};
`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})

router.get('/checktestsref/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT
    (SELECT COUNT(*) FROM TD_PTDIAGNOSIS WHERE xray_id = ${id}) +
    (SELECT COUNT(*) FROM TD_PTDIAGNOSIS WHERE mtb_id = ${id}) +
    (SELECT COUNT(*) FROM TD_PTDIAGNOSIS WHERE tst_id = ${id}) +
    (SELECT COUNT(*) FROM TD_PTDIAGNOSIS WHERE igra_id = ${id}) AS total_references;
`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})

router.delete('/deletetests/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    DELETE FROM TD_DIAGNOSTICRESULTS
    WHERE DGResultsNo = ${id};
`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                res.send(results);
            }
        }
    );
});

router.delete('/deleteassess/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    DELETE FROM TD_HEALTHASSESSMENT
    WHERE AssessNo = ${id};
`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                res.send(results);
            }
        }
    );
});

//Delete a row in MD_HI based on a given id
router.delete('/deletehi/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    DELETE FROM MD_HI
    WHERE HINo = ${id};
`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                res.send(results);
            }
        }
    );
});


router.patch('/updatehistatus/:id', (req, res) => {
    const isActive = req.body.isActive;
    const id = req.params.id;
    
    db.query(
        `UPDATE MD_HI SET isActive = ? WHERE HINo = ?`,
        [isActive, id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'An error occurred while updating status.' });
            } else {
                console.log(`Health institution ${id} status updated to ${isActive}.`);
                res.json({ message: 'Status updated successfully.' });
            }
        }
    );
});

router.get('/chartdata/:id', (req, res) => {
    const year = req.params.id;
    db.query(`
    SELECT
    YEAR(dg.DGDate) AS DiagnosisYear,
    MONTH(dg.DGDate) AS DiagnosisMonth,
    CASE
        WHEN dr.diagnosis LIKE '%Presumptive TB%' THEN 'Presumptive TB'
        WHEN dr.diagnosis LIKE '%Bacteriologically Confirmed - Drug Resistant%' THEN 'Bacteriologically Confirmed - Drug Resistant'
        WHEN dr.diagnosis LIKE '%Bacteriologically Confirmed - Drug Sensitive%' THEN 'Bacteriologically Confirmed - Drug Sensitive'
        WHEN dr.diagnosis LIKE '%Clinically Diagnosed TB%' THEN 'Clinically Diagnosed TB'
        WHEN dr.diagnosis LIKE '%Latent TB%' THEN 'Latent TB'
        ELSE 'Other'
    END AS DiagnosisType,
    SUM(CASE WHEN c.case_status = 'O' AND dr.EPTBpositive = 1 THEN 1 ELSE 0 END) AS OpenCasesWithEPTB,
    SUM(CASE WHEN c.case_status = 'O' AND dr.EPTBpositive = -1 THEN 1 ELSE 0 END) AS OpenCasesWithoutEPTB,
    SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 1 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo1,
    SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 3 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo3,
    SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 4 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo4,
    SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 5 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo5
FROM PEDTBDSS_new.TD_PTDIAGNOSIS dg
JOIN PEDTBDSS_new.MD_DIAGNOSISRULES dr ON dg.RuleNo = dr.RuleNo
JOIN PEDTBDSS_new.TD_PTCASE c ON dg.CaseNo = c.CaseNo
WHERE (c.case_refno, dg.DGNO) IN (
    SELECT c1.case_refno, MAX(d1.DGNO)
    FROM PEDTBDSS_new.TD_PTDIAGNOSIS d1
    JOIN PEDTBDSS_new.TD_PTCASE c1 ON d1.CaseNo = c1.CaseNo
    GROUP BY c1.case_refno
)
AND YEAR(dg.DGDate) =  ${year}
GROUP BY YEAR(dg.DGDate), MONTH(dg.DGDate), DiagnosisType
ORDER BY DiagnosisMonth, DiagnosisType;

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
})

router.get('/chartyear', (req, res) => {
    const year = req.params.id;
    db.query(`
    SELECT DISTINCT dy.DiagnosisYear 
    FROM(SELECT
       YEAR(dg.DGDate) AS DiagnosisYear,
       MONTH(dg.DGDate) AS DiagnosisMonth,
       CASE
           WHEN dr.diagnosis LIKE '%Presumptive TB%' THEN 'Presumptive TB'
           WHEN dr.diagnosis LIKE '%Bacteriologically Confirmed - Drug Resistant%' THEN 'Bacteriologically Confirmed - Drug Resistant'
           WHEN dr.diagnosis LIKE '%Bacteriologically Confirmed - Drug Sensitive%' THEN 'Bacteriologically Confirmed - Drug Sensitive'
           WHEN dr.diagnosis LIKE '%Clinically Diagnosed TB%' THEN 'Clinically Diagnosed TB'
           WHEN dr.diagnosis LIKE '%Latent TB%' THEN 'Latent TB'
           ELSE 'Other'
       END AS DiagnosisType,
       SUM(CASE WHEN c.case_status = 'O' AND dr.EPTBpositive = 1 THEN 1 ELSE 0 END) AS OpenCasesWithEPTB,
       SUM(CASE WHEN c.case_status = 'O' AND dr.EPTBpositive = -1 THEN 1 ELSE 0 END) AS OpenCasesWithoutEPTB,
       SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 1 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo1,
       SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 3 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo3,
       SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 4 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo4,
       SUM(CASE WHEN c.case_status = 'C' AND c.SRNo = 5 THEN 1 ELSE 0 END) AS ClosedCasesWithSRNo5
   FROM PEDTBDSS_new.TD_PTDIAGNOSIS dg
   JOIN PEDTBDSS_new.MD_DIAGNOSISRULES dr ON dg.RuleNo = dr.RuleNo
   JOIN PEDTBDSS_new.TD_PTCASE c ON dg.CaseNo = c.CaseNo
   WHERE (c.case_refno, dg.DGNO) IN (
       SELECT c1.case_refno, MAX(d1.DGNO)
       FROM PEDTBDSS_new.TD_PTDIAGNOSIS d1
       JOIN PEDTBDSS_new.TD_PTCASE c1 ON d1.CaseNo = c1.CaseNo
       GROUP BY c1.case_refno
   )
   GROUP BY YEAR(dg.DGDate), MONTH(dg.DGDate), DiagnosisType
   ORDER BY DiagnosisMonth, DiagnosisType) dy;

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
})

 //get all tests that are NOT under a given HI id
 router.get('/treatments/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT * FROM PEDTBDSS_new.TD_TREATMENTS
    WHERE CaseNo=${id};
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
  

router.post('/addtreatment', (req, res) => {
    const q = "INSERT INTO TD_TREATMENTS(`CaseNo`, `Medicine`, `Dosage`, `Frequency`, `StartDate`, `EndDate`) VALUES (?, ?, ?, ?, ?, ?)"
    const values = [
        req.body.CaseNo,
        req.body.Medicine,
        req.body.Dosage,
        req.body.Frequency,
        req.body.StartDate,
        req.body.EndDate
    ]

    db.query(q, values, (err, data) => {
        if(err) {
            console.log("Error inserting into TD_TREATMENTS:", err);
            return res.json(err)
        }
        console.log("Successfully inserted into TD_TREATMENTS:", data);
        return res.json(data)
    });
})

router.get('/allusers/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    
    SELECT u.userNo,
    CONCAT(u.last_name, ', ', u.first_name, ' ', u.middle_name) AS fullname,
    u.last_name,
    u.first_name,
    u.middle_name,
    u.IDNo AS username,
    u.passwordChanged,
    u.isActive
FROM PEDTBDSS_new.MD_USERS u
WHERE u.user_type = "BHW" AND u.BGYNo = ${id}
ORDER BY u.last_name, u.first_name, u.middle_name ;

`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})

router.get('/user/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    
    SELECT 
    u.passwordChanged
FROM PEDTBDSS_new.MD_USERS u
WHERE u.userNo = ${id}

`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})


router.post('/newuser', (req, res) => {
    const q = "INSERT INTO MD_USERS (`first_name`, `middle_name`, `last_name`, `IDNo`, `pw`, `BGYNo`, `isActive`, `user_type`, `passwordChanged`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const values = [
        req.body.first_name,
        req.body.middle_name,
        req.body.last_name,
        req.body.IDNo,
        req.body.pw,
        req.body.BGYNo,
        req.body.isActive,
        req.body.user_type,
        req.body.passwordChanged,
    ]

    db.query(q, values, (err, data) => {
        if(err) {
            console.log("Error inserting into MD_USERS:", err);
            return res.json(err)
        }
        console.log("Successfully inserted into MD_USERS:", data);
        return res.json(data)
    });
})

router.post('/adminupdateuser', (req, res) => {
    const values = [
        req.body.first_name,
        req.body.middle_name,
        req.body.last_name,
        req.body.IDNo,
        req.body.UserNo
    ]

    db.query(`UPDATE 	MD_USERS
                SET		first_name = ?, middle_name = ?, last_name = ?, IDNo = ?
                WHERE	UserNo = ?;
            `, values, (err, data) => {
        if(err) {
            console.log("Error updating into  MD_USERS:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  MD_USERS:", data);
        return res.json(data)
    });
})

router.get('/checkuserref/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT
	(SELECT COUNT(*) FROM TD_PTDIAGNOSIS WHERE UserNo = ${id}) +
	(SELECT COUNT(*) FROM TD_TREATMENTS WHERE UserNo = ${id}) +
	(SELECT COUNT(*) FROM TD_PTINFORMATION WHERE UserNo = ${id}) +
	(SELECT COUNT(*) FROM TD_DIAGNOSTICRESULTS WHERE UserNo = ${id}) +
 	(SELECT COUNT(*) FROM MD_CONTACTTRACING WHERE UserNo = ${id}) +
	(SELECT COUNT(*) FROM TD_HEALTHASSESSMENT WHERE UserNo = ${id}) AS total_references;
`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})

//Delete a row in MD_HI based on a given id
router.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    DELETE FROM MD_USERS
    WHERE userNo = ${id};
`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                res.send(results);
            }
        }
    );
});


router.patch('/updateuserstatus/:id', (req, res) => {
    const isActive = req.body.isActive;
    const id = req.params.id;
    
    db.query(
        `UPDATE MD_USERS SET isActive = ? WHERE userNo = ?`,
        [isActive, id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'An error occurred while updating status.' });
            } else {
                console.log(`User ${id} status updated to ${isActive}.`);
                res.json({ message: 'Status updated successfully.' });
            }
        }
    );
});

router.get('/searchuser/:id', (req, res) => {
    const searchTerm = req.params.id;
    db.query(`
    SELECT u.userNo,
    CONCAT(u.last_name, ', ', u.first_name, ' ', u.middle_name) AS fullname,
    u.last_name,
    u.first_name,
    u.middle_name,
    u.IDNo AS username,
    u.passwordChanged,
    u.isActive
FROM PEDTBDSS_new.MD_USERS u
WHERE u.user_type = "BHW" 
  AND u.BGYNo = 1 
  AND (
    CONCAT(COALESCE(u.last_name," "), ' ', COALESCE(u.first_name," "), ' ', COALESCE(u.middle_name," ")) LIKE '%${searchTerm}%'
    OR CONCAT(COALESCE(u.first_name," "), ' ', COALESCE(u.middle_name," "), ' ', COALESCE(u.last_name," ")) LIKE '%${searchTerm}%'
    OR CONCAT(COALESCE(u.first_name," "), ' ', COALESCE(u.last_name," ")) LIKE '%${searchTerm}%'
    OR u.IDNo LIKE '%${searchTerm}%'
  );
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

router.post('/updatehi', (req, res) => {
    const values = [
        req.body.HIName,
        req.body.HIOperatingHours,
        req.body.HIContactNumber,
        req.body.HIEmailAddress,
        req.body.HIUnitNo,
        req.body.HIStreet,
        req.body.HIBarangay,
        req.body.HICity,
        req.body.HIRegion,
        req.body.HIProvince,
        req.body.HIContactPerson,
        req.body.HINo
    ]

    db.query(`UPDATE 	MD_HI
                SET		HIName = ?, HIOperatingHours = ?, HIContactNumber = ?, HIEmailAddress = ?, HIUnitNo = ?, HIStreet = ?, HIBarangay = ?, HICity = ?, HIRegion= ?, HIProvince = ?, HIContactPerson = ?
                WHERE	HINo = ?;
            `, values, (err, data) => {
        if(err) {
            console.log("Error updating into  MD_USERS:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  MD_USERS:", data);
        return res.json(data)
    });
})


router.get('/checkhidgtestref/:id/:testid', (req, res) => {
    const id = req.params.id;
    const testid = req.params.testid;
    db.query(`
    SELECT COUNT(*) AS total_references FROM TD_DIAGNOSTICRESULTS WHERE HINo = ${id} AND DGTestNo = ${testid} 
`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})


router.patch('/updatehidgteststatus/:id/:testid', (req, res) => {
    const isActive = req.body.isActive;
    const id = req.params.id;
    const testid = req.params.testid;
    
    db.query(
        `UPDATE MD_HIDGTESTS SET isActive = ? WHERE HINo = ? AND DGTESTNO = ?`,
        [isActive, id, testid],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'An error occurred while updating status.' });
            } else {
                console.log(`Health institution ${id} status updated to ${isActive}.`);
                res.json({ message: 'Status updated successfully.' });
            }
        }
    );
});

router.delete('/deletehidgtest/:id/:testid', (req, res) => {
    const id = req.params.id;
    const testid = req.params.testid;
    db.query(`
    DELETE FROM MD_HIDGTESTS
    WHERE  HINo = ${id} AND DGTestNo = ${testid};
`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                res.send(results);
            }
        }
    );
});


router.post('/updatehidgtest', (req, res) => {
    const values = [
        req.body.Price,
        req.body.AcceptingVoucher,
        req.body.HINo,
        req.body.DGTestNo
    ]

    db.query( `UPDATE MD_HIDGTESTS SET Price = ?, AcceptingVoucher = ? WHERE HINo = ? AND DGTESTNO = ?`, values, (err, data) => {
        if(err) {
            console.log("Error updating into  MD_USERS:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  MD_USERS:", data);
        return res.json(data)
    });
})

router.delete('/deletebhchi/:id/:hiid', (req, res) => {
    const id = req.params.id;
    const hiid = req.params.hiid;
    db.query(`
    DELETE FROM MD_BRGYHI
    WHERE  BGYNo = ${id} AND HINo = ${hiid};
`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                res.send(results);
            }
        }
    );
});

router.post('/updatedgtest', (req, res) => {
    const values = [
        req.body.DGTestName,
        req.body.DGValidityMonths,
        req.body.DGTestNo
    ]

    db.query( `UPDATE MD_DGTESTS SET DGTestName = ?, DGValidityMonths = ? WHERE DGTestNo = ?`, values, (err, data) => {
        if(err) {
            console.log("Error updating into  MD_USERS:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  MD_USERS:", data);
        return res.json(data)
    });
})

router.get('/checkdgtestref/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    SELECT
    (SELECT COUNT(*) FROM MD_HIDGTESTS WHERE DGTestNo = ${id}) +
    (SELECT COUNT(*) FROM TD_DIAGNOSTICRESULTS WHERE DGTestNo = ${id}) AS total_references;
`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})

router.delete('/deletedgtest/:id', (req, res) => {
    const id = req.params.id;
    db.query(`
    DELETE FROM MD_DGTESTS
    WHERE  DGTestNo = ${id};
`,
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred.');
            } else {
                res.send(results);
            }
        }
    );
});

router.patch('/updatedgteststatus', (req, res) => {
    const values = [
        req.body.isActive,
        req.body.DGTestNo
    ]

    db.query( `UPDATE MD_DGTESTS SET isActive = ? WHERE DGTestNo = ?`, values, (err, data) => {
        if(err) {
            console.log("Error updating into  MD_USERS:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  MD_USERS:", data);
        return res.json(data)
    });
})

router.get('/searchdt/:search', (req, res) => {
    const searchTerm = req.params.search;
    db.query(`
    SELECT *
    FROM PEDTBDSS_new.MD_DGTESTS
    WHERE 
    COALESCE(DGTestName, '')
    LIKE '%${searchTerm}%'
    ORDER BY DGTestName
`, (err, results) => {
    if (err) {
        console.log(err)
    } else {
        results.forEach(result => {
            console.log(result.age);
        });
        res.send(results)
    }
})
})

router.post('/updatepw/:id', (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.pw
    ]

    db.query(`UPDATE 	MD_USERS
                SET		pw = ?, passwordChanged=1
                WHERE	UserNo = ${id};
            `, values, (err, data) => {
        if(err) {
            console.log("Error updating into  MD_USERS:", err);
            return res.json(err)
        }
        console.log("Successfully updating into  MD_USERS:", data);
        return res.json(data)
    });
})

    return router;
};
