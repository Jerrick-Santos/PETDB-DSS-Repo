const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./authFunc');

//Enter routes here

// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router
    const util = require('util');
    const queryPromise = util.promisify(db.query).bind(db);

    // helper functions
    function getHaversineDistance(lng2, lat2, lng1, lat1) {
        // COMPUTED USING HAVERSINE FORMULA
    
        const rad = (Math.PI / 180)
        lng1 *= rad
        lat1 *= rad
        lng2 *= rad
        lat2 *= rad
        
        // console.log("COORD IN RAD: ", lng1, lat1, lng2, lat2);
    
        let dist = 2 * 6371.009 * Math.asin(Math.sqrt((Math.sin((lat2 - lat1) ** 2 / 2)) + (Math.cos(lat1) * Math.cos(lat2) * (Math.sin((lng2 - lng1) ** 2 / 2)))))
    
        // console.log("DIST: ", dist)
    
        return dist;
    }


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
    }),

    router.get('/loadLocations/:test', authenticateToken, async (req, res) => {
        /** ROUTER GOAL: get barangay and health institution information associated to the logged user */
        const userid = req.user.userNo

        const user_query = `SELECT b.BGYNo, b.XCoord, b.YCoord, b.BGYName FROM PEDTBDSS_new.MD_USERS u JOIN PEDTBDSS_new.MD_BARANGAYS b ON u.BGYNo = b.BGYNo WHERE userNo = ?;`
        const hi_query = `SELECT * 
                        FROM PEDTBDSS_new.MD_BRGYHI bhi
                        JOIN PEDTBDSS_new.MD_HI hi ON bhi.HINo = hi.HINo
                        JOIN PEDTBDSS_new.MD_HIDGTESTS hidg ON bhi.HINo = hidg.HINo
                        WHERE bhi.BGYNo = 1
                        AND hi.isActive = 1
                        AND hidg.DGTestNo = ${req.params.test};`

        try {
            let res1, res2
            res1 = await queryPromise(user_query, [userid])
            console.log("QUERY 1: ", res1)
            if (res1 && res1.length > 0) {
                res2 = await queryPromise(hi_query, [res1[0].BGYNo])
                console.log("QUERY 2: ", res2)
            }

            if (res2 && res2.length > 0 && res1 && res1.length > 0) {
                let dist_arr = []
                res2.map((hi) => {
                    // console.log(hi.XCoord, hi.YCoord, res1[0].XCoord, res1[0].YCoord)
                    let distance = getHaversineDistance(hi.XCoord, hi.YCoord, res1[0].XCoord, res1[0].YCoord)
                    hi.distance = distance
                    dist_arr.push(distance)
                })

                let min_dist = dist_arr[dist_arr.indexOf(Math.min(...dist_arr))]
                // console.log(min_dist)
                res2.map((hi) => {
                    if (hi.distance === min_dist) { hi.isClosest = 1 } else { hi.isClosest = 0 }
                })

                const response = {
                    res1: res1[0],
                    res2: res2
                }
                res.send(response)
                return
            }
            res.json({message: 'user does not exist'})
        } catch (error) {
            console.error(error)
        }
        
    }),

    router.get('/getLatestCase/:caseid', (req, res) => {
        const q = `SELECT MAX(CaseNo) as latest_case
                    FROM TD_PTCASE
                    WHERE PatientNo in (SELECT PatientNo
                                        FROM TD_PTCASE
                                        WHERE CaseNo = ?);`

        db.query(q, [req.params.caseid], (err, result) => {
            if (err) { console.error(err) } else { res.send(result) }
        })
    }),

    router.get('/getCaseByPatient/:PatientNo', (req, res) => {
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

    // TESTING UPDATED /LOADLOCATION WITH TEST CONDITION
    router.get('/loadHIwithTest/:test', async (req, res) => {

        /** ROUTER GOAL: /loadLocations but with test */
        const userid = 1 // test value without authenticatetoken so that you can use postman
        const user_query = `SELECT b.BGYNo, b.XCoord, b.YCoord FROM PEDTBDSS_new.MD_USERS u JOIN PEDTBDSS_new.MD_BARANGAYS b ON u.BGYNo = b.BGYNo WHERE userNo = ?;`
        const hi_query = `SELECT * 
                        FROM PEDTBDSS_new.MD_BRGYHI bhi
                        JOIN PEDTBDSS_new.MD_HI hi ON bhi.HINo = hi.HINo
                        JOIN PEDTBDSS_new.MD_HIDGTESTS hidg ON bhi.HINo = hidg.HINo
                        WHERE bhi.BGYNo = 1
                        AND hi.isActive = 1
                        AND hidg.DGTestNo = ${req.params.test};`

        try {
            let res1, res2
            res1 = await queryPromise(user_query, [userid])
            console.log("QUERY 1: ", res1)
            if (res1 && res1.length > 0) {
                res2 = await queryPromise(hi_query, [res1[0].BGYNo])
                console.log("QUERY 2: ", res2)

                // test res.send()
                res.send(res2)
            }
        } catch (error) {
            console.error(error)
        }
    })
    

    return router;

    
};
