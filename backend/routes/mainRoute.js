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
        SELECT pt.PatientNo, CONCAT(pt.first_name, ' ', pt.middle_initial, '. ' , pt.last_name) AS fullname,
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
        SELECT *
        FROM PEDTBDSS_new.TD_HEALTHASSESSMENT ha
        WHERE ha.CaseNo = ${id};
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
        SELECT pc.CaseNo,
        pc.PatientNo,
        pc.case_refno,
        pc.case_status
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
        const assessQuery = "INSERT INTO TD_HEALTHASSESSMENT (`CaseNo`, `cough`, `c_weeks`, `c_persist`, `fever`, `fe_weeks`, `fe_persist`, `weight_loss`, `wl_weeks`, `wl_persist`, `night_sweats`, `ns_weeks`, `ns_persist`, `fatigue`, `fat_weeks`, `fat_persist`, `red_playfulness`, `rp_weeks`, `rp_persist`, `dec_acts`, `da_weeks`, `da_persist`, `not_eating_well`, `new_weeks`, `new_persist`, `gibbus_deform`, `non_painful_ecl`, `stiff_neck`, `drowsy`, `pleural_effusion`, `pericard_effusion`, `dist_abdomen`, `non_painful_ejoint`, `tuberculin_hyper`, `can_stand`, `ass_body_weight`, `ass_height`, `diabetes`, `plhiv`, `hiv`, `mother_hiv`, `smoking`, `drinking`, `sex_active`, `renal_disease`, `malnutrition`, `other_health_issues`, `other_meds`, `other_dd_interacts`, `other_comorbid`, `assessment_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
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
            req.body.gibbus_deform,
            req.body.non_painful_ecl,
            req.body.stiff_neck,
            req.body.drowsy,
            req.body.pleural_effusion,
            req.body.pericard_effusion,
            req.body.dist_abdomen,
            req.body.non_painful_ejoint,
            req.body.tuberculin_hyper,
            req.body.can_stand,
            req.body.ass_body_weight,
            req.body.ass_height,
            req.body.diabetes,
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


    //SEARCH PATIENT ROUTES
    router.get('/searchpatient/:id', (req, res) => {
        const searchTerm = req.params.id;
        db.query(`
        SELECT
    pt.PatientNo,
    CONCAT(
        COALESCE(pt.first_name, ''),
        ' ',
        COALESCE(pt.middle_initial, ''),
        '. ',
        COALESCE(pt.last_name, '')
    ) AS fullname,
    pt.birthdate,
    pt.sex,
    pt.age,
    pt.initial_bodyweight,
    pt.initial_height,
    pt.nationality,
    CONCAT(
        COALESCE(pt.per_houseno, ''),
        ' ',
        COALESCE(pt.per_street, ''),
        ' ',
        COALESCE(pt.per_barangay, ''),
        ' ',
        COALESCE(pt.per_city, ''),
        ' ',
        COALESCE(pt.per_region, ''),
        ' ',
        COALESCE(pt.per_zipcode, '')
    ) AS per_address,
    CONCAT(
        COALESCE(pt.curr_houseno, ''),
        ' ',
        COALESCE(pt.curr_street, ''),
        ' ',
        COALESCE(pt.curr_barangay, ''),
        ' ',
        COALESCE(pt.curr_city, ''),
        ' ',
        COALESCE(pt.curr_region, ''),
        ' ',
        COALESCE(pt.curr_zipcode, '')
    ) AS curr_address,
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
WHERE 
    CONCAT(
        COALESCE(pt.PatientNo, ''),
        COALESCE(pt.last_name, ''),
        COALESCE(pt.first_name, ''),
        COALESCE(pt.middle_initial, ''),
        COALESCE(pt.age, ''),
        COALESCE(pt.sex, ''),
        COALESCE(pt.birthdate, ''),
        COALESCE(pt.initial_bodyweight, ''),
        COALESCE(pt.initial_height, ''),
        COALESCE(pt.nationality, ''),
        COALESCE(pt.per_houseno, ''),
        COALESCE(pt.per_street, ''),
        COALESCE(pt.per_barangay, ''),
        COALESCE(pt.per_city, ''),
        COALESCE(pt.per_region, ''),
        COALESCE(pt.per_zipcode, ''),
        COALESCE(pt.curr_houseno, ''),
        COALESCE(pt.curr_street, ''),
        COALESCE(pt.curr_barangay, ''),
        COALESCE(pt.curr_city, ''),
        COALESCE(pt.curr_region, ''),
        COALESCE(pt.curr_zipcode, ''),
        COALESCE(pt.admission_date, ''),
        COALESCE(pt.mother_name, ''),
        COALESCE(pt.m_birthdate, ''),
        COALESCE(pt.m_contactno, ''),
        COALESCE(pt.m_email, ''),
        COALESCE(pt.father_name, ''),
        COALESCE(pt.f_birthdate, ''),
        COALESCE(pt.f_contactno, ''),
        COALESCE(pt.f_email, ''),
        COALESCE(pt.emergency_name, ''),
        COALESCE(pt.e_birthdate, ''),
        COALESCE(pt.e_contactno, ''),
        COALESCE(pt.e_email, '')
    ) LIKE '%${searchTerm}%';

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

    router.get('/advancedsearch/:lnm/:fnm/:mnm/:age/:sex/:bd/:nt/:phn/:ps/:pb/:pc/:pr/:pz/:chn/:cs/:cb/:cc/:cr/:cz/:ad/:mn/:mb/:mc/:me/:fn/:fb/:fc/:fe/:en/:eb/:ec/:ee', (req, res) => {
        const lnm = req.params.lnm.replace('_','');
        const fnm = req.params.fnm.replace('_','');
        const mnm = req.params.mnm.replace('_','');
        const age = req.params.age.replace('_','');
        const sex = req.params.sex.replace('_','');
        const bd = req.params.bd.replace('_','');
        const nt = req.params.nt.replace('_','');
        const phn = req.params.phn.replace('_','');
        const ps = req.params.ps.replace('_','');
        const pb = req.params.pb.replace('_','');
        const pc = req.params.pc.replace('_','');
        const pr = req.params.pr.replace('_','');
        const pz = req.params.pz.replace('_','');
        const chn = req.params.chn.replace('_','');
        const cs = req.params.cs.replace('_','');
        const cb = req.params.cb.replace('_','');
        const cc = req.params.cc.replace('_','');
        const cr = req.params.cr.replace('_','');
        const cz = req.params.cz.replace('_','');
        const ad = req.params.ad.replace('_','');
        const mn = req.params.mn.replace('_','');
        const mb = req.params.mb.replace('_','');
        const mc = req.params.mc.replace('_','');
        const me = req.params.me.replace('_','');
        const fn = req.params.fn.replace('_','');
        const fb = req.params.fb.replace('_','');
        const fc = req.params.fc.replace('_','');
        const fe = req.params.fe.replace('_','');
        const en = req.params.en.replace('_','');
        const eb = req.params.eb.replace('_','');
        const ec = req.params.ec.replace('_','');
        const ee = req.params.ee.replace('_','');
        
        db.query(`
        SELECT
    pt.PatientNo,
    CONCAT(
        COALESCE(pt.first_name, ''),
        ' ',
        COALESCE(pt.middle_initial, ''),
        '. ',
        COALESCE(pt.last_name, '')
    ) AS fullname,
    pt.birthdate,
    pt.sex,
    pt.age,
    pt.initial_bodyweight,
    pt.initial_height,
    pt.nationality,
    CONCAT(
        COALESCE(pt.per_houseno, ''),
        ' ',
        COALESCE(pt.per_street, ''),
        ' ',
        COALESCE(pt.per_barangay, ''),
        ' ',
        COALESCE(pt.per_city, ''),
        ' ',
        COALESCE(pt.per_region, ''),
        ' ',
        COALESCE(pt.per_zipcode, '')
    ) AS per_address,
    CONCAT(
        COALESCE(pt.curr_houseno, ''),
        ' ',
        COALESCE(pt.curr_street, ''),
        ' ',
        COALESCE(pt.curr_barangay, ''),
        ' ',
        COALESCE(pt.curr_city, ''),
        ' ',
        COALESCE(pt.curr_region, ''),
        ' ',
        COALESCE(pt.curr_zipcode, '')
    ) AS curr_address,
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
WHERE 
    (
            COALESCE(pt.last_name, '')LIKE "%${lnm}%" AND
            COALESCE(pt.first_name, '')LIKE "%${fnm}%" AND
            COALESCE(pt.middle_initial, '')LIKE "%${mnm}%" AND
            COALESCE(pt.age, '')LIKE "%${age}%" AND
            COALESCE(pt.sex, '')LIKE "%${sex}%" AND
            COALESCE(pt.birthdate, '')LIKE "%${bd}%" AND
            COALESCE(pt.nationality, '')LIKE "%${nt}%" AND
            COALESCE(pt.per_houseno, '')LIKE "%${phn}%" AND
            COALESCE(pt.per_street, '')LIKE "%${ps}%" AND
            COALESCE(pt.per_barangay, '')LIKE "%${pb}%"AND
            COALESCE(pt.per_city, '')LIKE "%${pc}%"AND
            COALESCE(pt.per_region, '')LIKE "%${pr}%"AND
            COALESCE(pt.per_zipcode, '')LIKE "%${pz}%"AND
            COALESCE(pt.curr_houseno, '')LIKE "%${chn}%"AND
            COALESCE(pt.curr_street, '')LIKE "%${cs}%"AND
            COALESCE(pt.curr_barangay, '')LIKE "%${cb}%"AND
            COALESCE(pt.curr_city, '')LIKE "%${cc}%"AND
            COALESCE(pt.curr_region, '')LIKE "%${cr}%"AND
            COALESCE(pt.curr_zipcode, '')LIKE "%${cz}%"AND
            COALESCE(pt.admission_date, '')LIKE "%${ad}%"AND
            COALESCE(pt.mother_name, '')LIKE "%${mn}%"AND
            COALESCE(pt.m_birthdate, '')LIKE "%${mb}%"AND
            COALESCE(pt.m_contactno, '')LIKE "%${mc}%"AND 
            COALESCE(pt.m_email, '')LIKE "%${me}%"AND 
            COALESCE(pt.father_name, '')LIKE "%${fn}%"AND  
            COALESCE(pt.f_birthdate, '')LIKE "%${fb}%"AND 
            COALESCE(pt.f_contactno, '')LIKE "%${fc}%"AND  
            COALESCE(pt.f_email, '')LIKE "%${fe}%"AND  
            COALESCE(pt.emergency_name, '')LIKE "%${en}%"AND 
            COALESCE(pt.e_birthdate, '')LIKE "%${eb}%"AND 
            COALESCE(pt.e_contactno, '')LIKE "%${ec}%"AND 
            COALESCE(pt.e_email, '')LIKE "%${ee}%");
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
    
    





    //ADMIN ROUTES
    //create a BHC
    router.post('/newbhc', (req, res) => {
        const q = "INSERT INTO MD_BARANGAYS (`BGYName`, `BGYOperatingHours`, `BGYContactNumber`, `BGYEmailAddress`, `BGYUnitNo`, `BGYStreet`, `BGYBarangay`, `BGYCity`, `BGYRegion`, `BGYZipCode`, `XCoord`, `YCoord`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
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
            req.body.BGYZipCode,
            req.body.XCoord,
            req.body.YCoord
        ]

        db.query(q, values, (err, data) => {
            if(err) {
                console.log("Error inserting into MD_BARANGAY:", err);
                return res.json(err)
            }
            console.log("Successfully inserted into MD_BARANGAY:", data);
            return res.json(data)
        });
    })

    //create a new health institution
    router.post('/newhi', (req, res) => {
        const q = "INSERT INTO MD_HI (`HIName`, `HIOperatingHours`, `HIContactNumber`, `HIEmailAddress`, `HIUnitNo`, `HIStreet`, `HIBarangay`, `HICity`, `HIRegion`, `HIZipCode`, `XCoord`, `YCoord`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
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
            req.body.HIZipCode,
            req.body.XCoord,
            req.body.YCoord
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
        const q = "INSERT INTO MD_DGTESTS(`DGTestName`, `DGValidityMonths`) VALUES (?, ?)"
        const values = [
            req.body.DGTestName,
            req.body.DGValidityMonths,
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
        const testresultsQuery = "INSERT INTO TD_DIAGNOSTICRESULTS (`CaseNo`, `DGTestNo`, `TestValue`, `HINo`, `issue_date`, `test_refno`) VALUES (?, ?, ?, ?, ?, ?)"
        const testresultsValues = [
            req.body.CaseNo,
            3,
            req.body.TestValue,
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
            CONCAT(bg.BGYUnitNo, ' ', bg.BGYStreet, ' ', bg.BGYBarangay, ' ', bg.BGYCity, ' ', bg.BGYRegion, ' ', bg.BGYZipCode) AS address,
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
            CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', h.HIBarangay, ' ', h.HICity, ' ', h.HIRegion, ' ', h.HIZipCode) AS address,
            h.HIOperatingHours,
            h.HIContactNumber,
            h.HIEmailAddress,
            h.XCoord,
            h.YCoord
        FROM PEDTBDSS_new.MD_HI h
       
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

    //get all Diagnostic Test Records
    router.get('/alldt', (req, res) => {

        db.query(`
        SELECT *
        FROM PEDTBDSS_new.MD_DGTESTS
       
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
            CONCAT(bg.BGYUnitNo, ' ', bg.BGYStreet, ' ', bg.BGYBarangay, ' ', bg.BGYCity, ' ', bg.BGYRegion, ' ', bg.BGYZipCode) AS address,
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
            CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', h.HIBarangay, ' ', h.HICity, ' ', h.HIRegion, ' ', h.HIZipCode) AS address,
            h.HIOperatingHours,
            h.HIContactNumber,
            h.HIEmailAddress,
            h.XCoord,
            h.YCoord
        FROM PEDTBDSS_new.MD_HI h
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
        SELECT 
        bh.BGYNo,
        h.HINo,
        h.HIName, 
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', h.HIBarangay, ' ', h.HICity, ' ', h.HIRegion, ' ', h.HIZipCode) AS address,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord
            FROM  PEDTBDSS_new.MD_BRGYHI bh
            JOIN   PEDTBDSS_new.MD_HI h ON bh.HINo = h.HINo
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
        SELECT 
        h.HINo,
        h.HIName, 
        CONCAT(h.HIUnitNo, ' ', h.HIStreet, ' ', h.HIBarangay, ' ', h.HICity, ' ', h.HIRegion, ' ', h.HIZipCode) AS address,
        h.HIOperatingHours,
        h.HIContactNumber,
        h.HIEmailAddress,
        h.XCoord,
        h.YCoord
            FROM  PEDTBDSS_new.MD_HI h
            WHERE HINo NOT IN(SELECT h.HINo
            FROM PEDTBDSS_new.MD_HI h
            JOIN PEDTBDSS_new.MD_BRGYHI bh ON h.HINo = bh.HINo
            WHERE bh.BGYNo=${id});
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
        const q = "INSERT INTO MD_HIDGTESTS(`HINo`, `DGTestNo`, `AcceptingVoucher`, `Price` ) VALUES (?, ?, ?, ?)"
        const values = [
            req.body.HINo,
            req.body.DGTestNo,
            req.body.AcceptingVoucher,
            req.body.Price
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
  

    return router;
};

