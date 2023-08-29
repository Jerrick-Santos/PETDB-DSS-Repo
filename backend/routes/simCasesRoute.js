const express = require('express');
const router = express.Router();

// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router
    router.get('/getlatestdiagnosis/:caseid', (req, res) => {
        const caseid = req.params.caseid

        const getLatestDiagnosis = `
        SELECT c.case_refno, c.start_date, c.end_date, c.case_status, dr.diagnosis 
        FROM PEDTBDSS_new.TD_PTDIAGNOSIS d
        JOIN PEDTBDSS_new.TD_PTCASE c ON d.CaseNo = c.CaseNo 
        JOIN PEDTBDSS_new.MD_DIAGNOSISRULES dr ON d.RuleNo = dr.RuleNo
        WHERE d.CaseNo = ${caseid}
        ORDER BY d.DGNO DESC 
        LIMIT 1 ;
        `
        
        db.query(getLatestDiagnosis, (error, latestDiagResults) => {

            if (error) {
                res.status(500).json({ error: error });
                return;
            }

            res.send(latestDiagResults)
        });    
    })


    //ENTER ENDPOINTS HERE
    router.get('/getsimcases/:caseid', (req, res) => {
        const caseid = req.params.caseid

        //1. REFERENCE VARIABLE QUERY
        const getCurrentCase = `SELECT *
        FROM PEDTBDSS_new.TD_HEALTHASSESSMENT
        WHERE CaseNo = ${caseid}
        ORDER BY AssessNo 
        LIMIT 1;`

        //2. 
        const getMatchingCases = `
        SELECT t1.*
        FROM PEDTBDSS_new.TD_HEALTHASSESSMENT t1
        JOIN (
            SELECT CaseNo, MIN(AssessNo) AS MinAssessNo
            FROM PEDTBDSS_new.TD_HEALTHASSESSMENT
            WHERE CaseNo <> ${caseid}
            GROUP BY CaseNo
        ) t2 ON t1.CaseNo = t2.CaseNo AND t1.AssessNo = t2.MinAssessNo
        ORDER BY t1.CaseNo, t1.AssessNo;
        `

        db.query(getCurrentCase, (error1, Q1results) => {

            if (error1) {
                res.status(500).json({ error: error1 });
                return;
            }

            console.log("QUERY 1: SUCCESS")
            console.log("QUERY 1 RESULTS: " + Q1results[0])

            const currentCase = Q1results[0]

            db.query(getMatchingCases, (error2, Q2results) => {

                if (error2) {
                    res.status(500).json({ error: error2 });
                    return;
                }
    
                console.log("QUERY 2: SUCCESS")
                console.log("QUERY 2 RESULTS: " + Q2results)

                


                //STEP 3 IMPLEMENTATION 

                // Initialize an array to store results
                const results = [];

                // Loop through each object in the array
                for (const obj of Q2results) {
                // Initialize a counter for each object
                    let counter = 0;

                    // Loop through each property in the object variable
                    for (const prop in currentCase) {
                        // Check if the property value in the object variable matches the property value in the current object of the array
                        if (currentCase[prop] === obj[prop]) {
                        // Increment the counter if there's a match
                        counter++;
                        }
                    }

                    // Calculate the similarity index
                    const similarityIndex = counter / Object.keys(currentCase).length;

                // Store the result in the results array
                results.push([obj.CaseNo, similarityIndex]);
                }

                // 4. Get the max 3 initial assessment similarity (FILTER)

                // Sort the results array in descending order based on similarity index
                results.sort((a, b) => b[1] - a[1]);

                // Get the top 3 highest similarity indices
                const top3Results = results.slice(0, 3);

                console.log(top3Results)
                
                res.send(top3Results)
            });




        });
    })

    return router;
};
