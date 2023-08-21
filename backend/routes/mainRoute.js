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


