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

    function getAge(in_) {
        const currDate = new Date()
        const birthdate = new Date(in_)
        let age = currDate.getFullYear() - birthdate.getFullYear()

        if (
            currDate.getMonth() < birthdate.getMonth() ||
            (currDate.getMonth() === birthdate.getMonth() &&
                currDate.getDate() < birthdate.getDate())
        ) {
            age--;
        }

        return age
    }

    function nextTest(date, month) {
        if(!date){
            return null
        }
        let d = new Date(date)
        d.setMonth(date.getMonth() + month).toLocaleString();
        return d;
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
                        ct.ContactNo,
                        dr.DRDescription,
                        ts.TSDescription,
                        ct.DRNo,
                        ct.TSNo,
                        ct.ContactNo
                    FROM PEDTBDSS_new.MD_CONTACTTRACING ct
                    JOIN PEDTBDSS_new.MD_CTRACECASE ctc ON ct.ContactNo = ctc.ContactNo
                    JOIN PEDTBDSS_new.TD_PTCASE ptc ON ctc.CaseNo = ptc.CaseNo
                    LEFT JOIN PEDTBDSS_new.REF_DIAGNOSISRESULTS dr ON dr.DRNo = ct.DRNo
                    LEFT JOIN PEDTBDSS_new.REF_TREATMENTSTATUS ts ON ts.TSNo = ct.TSNo
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
                    SELECT *
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

        const {last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, PatientNo, DRNo, TSNo} = req.body

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
                    db.query('INSERT INTO MD_CONTACTTRACING (last_name, first_name, middle_initial, birthdate, sex, contact_person, contact_num, contact_email, contact_relationship, date_added, PatientNo, DRNo, TSNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [last_name, first_name, middle_initial, formattedBirthdate, sex, contact_person, contact_num, contact_email, contact_relationship, formattedDate, PatientNo, DRNo, TSNo], (err, data) => {
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
                    ptc.PatientNo,
                    l.LATENTref,
                    p.PRESref
                   FROM PEDTBDSS_new.TD_PTCASE ptc
                   JOIN PEDTBDSS_new.TD_PTINFORMATION pi ON ptc.PatientNo = pi.PatientNo
                   LEFT JOIN PEDTBDSS_new.ML_PRESUMPTIVE p ON p.CaseNo = ptc.CaseNo
                   LEFT JOIN PEDTBDSS_new.ML_LATENT l ON l.CaseNo = ptc.CaseNo
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

        // load barangay data
        const user_query = `SELECT b.BGYNo, b.XCoord, b.YCoord, b.BGYName FROM PEDTBDSS_new.MD_USERS u JOIN PEDTBDSS_new.MD_BARANGAYS b ON u.BGYNo = b.BGYNo WHERE userNo = ?;`

        // load health institution data associated to user's barangay -- old
        // const hi_query = `SELECT * 
        //                 FROM PEDTBDSS_new.MD_BRGYHI bhi
        //                 JOIN PEDTBDSS_new.MD_HI hi ON bhi.HINo = hi.HINo
        //                 JOIN PEDTBDSS_new.MD_HIDGTESTS hidg ON bhi.HINo = hidg.HINo
        //                 WHERE bhi.BGYNo = ?
        //                 AND hi.isActive = 1
        //                 AND hidg.DGTestNo = ${req.params.test};`

        // load health institution data associated to user's barangay -- new
        const hi_query = `SELECT hi.HIName, hi.XCoord, hi.YCoord, hi.HIOperatingHours, hi.HIContactNumber, hi.HIEmailAddress, hi.HIUnitNo, hi.HIStreet,
		                hi.HIBarangay, hi.HIContactPerson, hidg.AcceptingVoucher, hidg.Price, tb.barangay_name, tr.region_description, tp.province_name, tm.municipality_name
                        FROM PEDTBDSS_new.MD_BRGYHI bhi
                        JOIN PEDTBDSS_new.MD_HI hi ON bhi.HINo = hi.HINo
                        JOIN PEDTBDSS_new.MD_HIDGTESTS hidg ON bhi.HINo = hidg.HINo
                        JOIN table_barangay tb ON tb.barangay_id = hi.HIBarangay
                        JOIN table_region tr ON tr.region_id = hi.HIRegion
                        JOIN table_province tp ON tp.province_id = hi.HIProvince
                        JOIN table_municipality tm ON tm.municipality_id = hi.HICity
                        WHERE bhi.BGYNo = ?
                        AND hi.isActive = 1
                        AND hidg.DGTestNo = ?;`

        try {
            let res1, res2
            res1 = await queryPromise(user_query, [userid])
            console.log("QUERY 1: ", res1)
            if (res1 && res1.length > 0) {
                res2 = await queryPromise(hi_query, [res1[0].BGYNo, req.params.test])
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

    router.get('/getDiagnosisResults', (req, res) => {
        db.query('SELECT * FROM REF_DIAGNOSISRESULTS', (err, results) => {
            if (err) { console.error(err) } else { res.send(results) }
        })
    }),

    router.get('/getTreatmentStatus', (req, res) => {
        db.query('SELECT * FROM REF_TREATMENTSTATUS', (err, results) => {
            if (err) { console.error(err) } else { res.send(results) }
        })
    }),

    router.get('/getSimilarContacts/:first_name/:middle_initial/:last_name', (req, res) => {
        const q = `SELECT *
        FROM MD_CONTACTTRACING
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

    router.post('/updateContacts', (req, res) => {

        const updateQuery = `UPDATE MD_CONTACTTRACING 
                            SET last_name = ?, first_name = ?, middle_initial = ?, birthdate = ?, sex = ?, 
                            contact_person = ?, contact_num = ?, contact_email = ?, contact_relationship = ?, DRNo = ?, TSNo = ?
                            WHERE ContactNo = ?`

        db.query(updateQuery, [req.body.last_name, req.body.first_name, req.body.middle_initial, new Date(req.body.birthdate).toISOString().split('T')[0], req.body.sex, req.body.contact_person, req.body.contact_num, req.body.contact_email, req.body.contact_relationship, req.body.DRNo, req.body.TSNo, req.body.ContactNo], (err, result) => {
            if (err) { console.error(err) }
            else {
                res.status(200).json({message: 'successful updating of close contact information'})
            }
        })
    })

    router.get('/testGetNewContacts/:CaseNo', async (req, res) => {

        const case_id = req.params.CaseNo;

        // get all contacts in a patients case
        const get_contacts_query = `
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
                ct.ContactNo,
                dr.DRDescription,
                ts.TSDescription,
                ct.DRNo,
                ct.TSNo,
                ct.ContactNo
            FROM PEDTBDSS_new.MD_CONTACTTRACING ct
            JOIN PEDTBDSS_new.MD_CTRACECASE ctc ON ct.ContactNo = ctc.ContactNo
            JOIN PEDTBDSS_new.TD_PTCASE ptc ON ctc.CaseNo = ptc.CaseNo
            LEFT JOIN PEDTBDSS_new.REF_DIAGNOSISRESULTS dr ON dr.DRNo = ct.DRNo
            LEFT JOIN PEDTBDSS_new.REF_TREATMENTSTATUS ts ON ts.TSNo = ct.TSNo
            WHERE ptc.CaseNo = ?;`;

        // get latest ha and xray test of a patient case
        const get_latest_test_query = 
            `SELECT
            td.PatientNo,
            tpc.CaseNo,
            ha.ha_start,
            dr.issue_date,
            ha.ha_count,
            dr.xray_count
            FROM (
                SELECT PatientNo, MAX(start_date) AS max_start_date
                FROM PEDTBDSS_new.TD_PTCASE
                WHERE PatientNo IN (?)
                GROUP BY PatientNo
            ) AS td
            JOIN PEDTBDSS_new.TD_PTCASE AS tpc ON td.PatientNo = tpc.PatientNo AND td.max_start_date = tpc.start_date
            LEFT JOIN (
                SELECT pc.CaseNo, MAX(ha.assessment_date) AS ha_start, COUNT(*) AS ha_count
                FROM PEDTBDSS_new.TD_PTCASE pc
                JOIN PEDTBDSS_new.TD_HEALTHASSESSMENT ha ON pc.CaseNo = ha.CaseNo
                GROUP BY pc.CaseNo
            ) AS ha ON tpc.CaseNo = ha.CaseNo
            LEFT JOIN (
                SELECT CaseNo, MAX(issue_date) AS issue_date, COUNT(*) AS xray_count
                FROM PEDTBDSS_new.TD_DIAGNOSTICRESULTS
                WHERE DGTestNo = 1
                GROUP BY CaseNo
            ) AS dr ON tpc.CaseNo = dr.CaseNo;`

        try {
            var cc_result = await queryPromise(get_contacts_query,[case_id])
            console.log('load contact query: ', cc_result)

            cc_result.map(x => {
                x.age = getAge(x.birthdate)
            })
            
            if (cc_result && cc_result.length>0) {
                const patientNos = cc_result.filter(item => item.PatientNo !== null).map(item => item.PatientNo);

                // get latest ha and xray test
                if (patientNos.length>0) {
                    var latest_test_result = await queryPromise(get_latest_test_query, [patientNos])

                    // add next date for ha and xray
                    // if test count already 2 or more, OR patient has not received test, return null
                    latest_test_result.map(x => {
                        x.ha_count >= 2 ? x.next_ha = null : x.next_ha = nextTest(x.ha_start, 6)
                        x.xray_count >= 2 ? x.next_xray = null : x.next_xray = nextTest(x.xray_count,12)
                        
                    })
    
                    // merge close contact and test result
                    cc_result.forEach((cc) => {
                        const match = latest_test_result.find((test) => test.PatientNo === cc.PatientNo)
                        if(match){
                            cc.ha_count = match.ha_count
                            cc.xray_count = match.xray_count
                            cc.next_ha = match.next_ha
                            cc.next_xray = match.next_xray
                        }
                    })
                }
            }
            res.send(cc_result)
        } catch (error) {
            console.log(error)
        }
    })

    router.get('/getPatientDrilldown/:status/:year', async (req, res) => {
        const status = parseInt(req.params.status, 10);

        if (isNaN(status) || ![0,1].includes(status)) { return res.status(400).json({ error: 'Invalid parameter: status must be a number between 0 and 4.' }); }


        const base_query = `SELECT patientlist.PatientNo, patientlist.completename, patientlist.CaseNo,  DATEDIFF(CURDATE(), latestdiagnosis.DGDate) AS dayssincelastdiag, patientlist.case_refno
        FROM ( 
            SELECT pi.PatientNo, CONCAT(pi.last_name, ", ", pi.first_name, " ", pi.middle_initial) AS completename, pc.CaseNo, pc.case_refno
            FROM td_ptinformation pi
            JOIN td_ptcase pc ON pi.PatientNo = pc.PatientNo
            WHERE pc.case_status <> "C"
        ) AS patientlist
        JOIN ( 
            SELECT *
            FROM (
                SELECT pd.CaseNo, pd.DGNo, pd.RuleNo, ROW_NUMBER() OVER (PARTITION BY pd.CaseNo ORDER BY pd.DGNo DESC, pd.DGDate DESC ) AS rn, YEAR(pd.DGDate) as yeardiag, pd.DGDate
                FROM td_ptdiagnosis pd
            ) AS t
            WHERE t.rn = 1
        ) AS latestdiagnosis ON patientlist.CaseNo = latestdiagnosis.CaseNo
        JOIN md_diagnosisrules dr ON latestdiagnosis.RuleNo = dr.RuleNo
        WHERE yeardiag = ?
        AND `

        let withstatuscond_query, q1;
        status === 0 ? q1 = base_query.concat(" presumptive_tb = 1") : q1 = base_query.concat(" latent_tb = 1") 
        withstatuscond_query = q1.concat(" ORDER BY dayssincelastdiag DESC ")

        db.query(withstatuscond_query, [parseInt(req.params.year, 10)], (err, results) => {
            if (err) {
                console.error(err); 
                return res.status(400).json({message: 'Query Failed'})
            }
            else {
                console.log(results)
                res.send(results)
            }
        })
    })

    return router;

    
};
