const express = require('express');
const router = express.Router();

function xrayModule(xray_result){
    if (xray_result === "With Signs of TB"){
        return 1
    }
    else if (xray_result === "No signs"){
        return -1
    }
    else {
        return 0; //either the result is INVALID or not done
    }
}

function MTBmodule(MTB_result){
    const MTB_RIF = MTB_result.split('-');

    const MTB = MTB_RIF[0]; 

    if(MTB === "MTB"){
        return 1
    }
    else {
        return -1
    }

}

function RIFmodule(RIF_result){
    const MTB_RIF = RIF_result.split('-');

    const RIF = MTB_RIF[1]; 

    if(RIF === "R"){
        return 1
    }
    else if(RIF === "S"){
        return -1
    }
    else if(RIF === "NA"){
        return -1
    }
    else {
        return 0
    }
}

function TSTmodule(TST_result){
    if (TST_result === ">10 MM"){
        return 1
    }
    else if (TST_result === "<10 MM"){
        return -1
    }
    else {
        return 0; //either the result is INVALID or not done
    }
}

function IGRAmodule(IGRA_result){
    if (IGRA_result === "Positive"){
        return 1
    }
    else if (IGRA_result === "Negative"){
        return -1
    }
    else {
        return 0; //either the result is INVALID or not done
    }
}



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

        const PARAMETERS = {
            health_assessment: null,
            xray: null, 
            mtb: null, 
            rif: null,
            igra: null
        }

        //1. REFERENCE VARIABLE QUERY
        const getCurrentCase = `SELECT * FROM PEDTBDSS_new.TD_HEALTHASSESSMENT t1
        JOIN (SELECT
            MAX(CaseNo) AS CaseNo,
            MAX(XRAY) AS XRAY,
            MAX(MTB) AS MTB,
            MAX(TST) AS TST,
            MAX(IGRA) AS IGRA
        FROM (
            SELECT
                CaseNo,
                CASE WHEN DGTestNo = 1 THEN TestValue END AS XRAY,
                CASE WHEN DGTestNo = 2 THEN TestValue END AS MTB,
                CASE WHEN DGTestNo = 3 THEN TestValue END AS TST,
                CASE WHEN DGTestNo = 7 THEN TestValue END AS IGRA
            FROM PEDTBDSS_new.TD_DIAGNOSTICRESULTS
            WHERE CaseNo = ${caseid} AND DGTestNo IN (1, 2, 3, 7) AND validity = 1
            ORDER BY DGTestNo, DGResultsNo DESC
        ) AS CombinedResults
        GROUP BY CaseNo) t2 ON t1.CaseNo = t2.CaseNo
        WHERE t1.CaseNo = ${caseid};`

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

            if (Q1results.length === 0) {
                res.status(404).json({ error: 'Case not found' });
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

    router.get('/getsimcases2/:caseid', (req, res) => {
        let ruleNo;

        const RETOBEJCT = {
            bd_res: null,
            bd_nonres: null,
            clinical_diag: null,
            no_tb: null
        }

        const PARAMETERS = {
            cough: null,	
            c_weeks: null,	
            c_persist: null,	
            fever: null,	
            fe_weeks: null,	
            fe_persist: null,	
            weight_loss: null,	
            wl_weeks: null,	
            wl_persist: null,	
            night_sweats: null,	
            ns_weeks: null,	
            ns_persist: null,	
            fatigue: null,	
            fat_weeks: null,	
            fat_persist: null,	
            red_playfulness: null,	
            rp_weeks: null,	
            rp_persist: null,	
            dec_acts: null,	
            da_weeks: null,	
            da_persist: null,	
            not_eating_well: null,	
            new_weeks: null,	
            new_persist: null,	
            non_painful_ecl: null,	
            drowsy: null,	
            prevPTB_diagnosed: null,	
            can_stand: null,	
            plhiv: null,	
            hiv: null,	
            mother_hiv: null,	
            smoking: null,	
            drinking: null,	
            sex_active: null,	
            renal_disease: null,	
            malnutrition: null,
            xray: null,
            MTB_positive: null,
            RIF_resistant: null,
            tst: null,
            igra: null
        }

        const caseid = req.params.caseid
    
        //GET ASSESSEMENT DATA 
        const assessmentQuery = `SELECT *
        FROM PEDTBDSS_new.TD_HEALTHASSESSMENT
        WHERE CaseNo = ${caseid}
        ORDER BY AssessNo DESC
        LIMIT 1;`;

        //GET XRAY 
        const xrayQuery = `SELECT *
        FROM PEDTBDSS_new.TD_DIAGNOSTICRESULTS
        WHERE CaseNo = ${caseid} AND DGTestNo = 1 AND validity = 1
        ORDER BY DGResultsNo DESC
        LIMIT 1;`;

        //GET MTB 
        const MTBQuery = `SELECT *
        FROM PEDTBDSS_new.TD_DIAGNOSTICRESULTS
        WHERE CaseNo = ${caseid} AND DGTestNo = 2 AND validity = 1
        ORDER BY DGResultsNo DESC
        LIMIT 1;`;

        //GET TST 
        const TSTQuery = `SELECT *
        FROM PEDTBDSS_new.TD_DIAGNOSTICRESULTS
        WHERE CaseNo = ${caseid} AND DGTestNo = 3 AND validity = 1
        ORDER BY DGResultsNo DESC
        LIMIT 1;`;

        //GET IGRA
        const IGRAQuery = `SELECT *
        FROM PEDTBDSS_new.TD_DIAGNOSTICRESULTS
        WHERE CaseNo = ${caseid} AND DGTestNo = 7 AND validity = 1
        ORDER BY DGResultsNo DESC
        LIMIT 1;`;

        // Initialize an array to store the results
        const comparisonResults = [];
        
        // Execute queries
        db.query(assessmentQuery, (error1, assessmentResults) => {
            if (error1) {
                res.status(500).json({ error: "Error fetching assessment data" });
                return;
            }

            if (assessmentResults.length === 0) {
                res.status(500).json({ error: "No Assessment Data Found: Please Provide Health Assessment" });
            } else {
                    const {
                        cough,	
                        c_weeks,	
                        c_persist,	
                        fever,	
                        fe_weeks,	
                        fe_persist,	
                        weight_loss,	
                        wl_weeks,	
                        wl_persist,	
                        night_sweats,	
                        ns_weeks,	
                        ns_persist,	
                        fatigue,	
                        fat_weeks,	
                        fat_persist,	
                        red_playfulness,	
                        rp_weeks,	
                        rp_persist,	
                        dec_acts,	
                        da_weeks,	
                        da_persist,	
                        not_eating_well,	
                        new_weeks,	
                        new_persist,	
                        non_painful_ecl,	
                        drowsy,	
                        prevPTB_diagnosed,	
                        can_stand,	
                        plhiv,	
                        hiv,	
                        mother_hiv,	
                        smoking,	
                        drinking,	
                        sex_active,	
                        renal_disease,	
                        malnutrition
                        
                    } = assessmentResults[0];

                    PARAMETERS.cough = cough
                    PARAMETERS.c_weeks = c_weeks,	
                    PARAMETERS.c_persist = c_persist,	
                    PARAMETERS.fever = fever,	
                    PARAMETERS.fe_weeks = fe_weeks,	
                    PARAMETERS.fe_persist = fe_persist,	
                    PARAMETERS.weight_loss = weight_loss,	
                    PARAMETERS.wl_weeks = wl_weeks,	
                    PARAMETERS.wl_persist = wl_persist,	
                    PARAMETERS.night_sweats = night_sweats,	
                    PARAMETERS.ns_weeks = ns_weeks,	
                    PARAMETERS.ns_persist = ns_persist,	
                    PARAMETERS.fatigue = fatigue,	
                    PARAMETERS.fat_weeks = fat_weeks,	
                    PARAMETERS.fat_persist = fat_persist,	
                    PARAMETERS.red_playfulness = red_playfulness,	
                    PARAMETERS.rp_weeks = rp_weeks,	
                    PARAMETERS.rp_persist = rp_persist,	
                    PARAMETERS.dec_acts = dec_acts,	
                    PARAMETERS.da_weeks = da_weeks,	
                    PARAMETERS.da_persist = da_persist,	
                    PARAMETERS.not_eating_well = not_eating_well,	
                    PARAMETERS.new_weeks = new_weeks,	
                    PARAMETERS.new_persist = new_persist,	
                    PARAMETERS.non_painful_ecl = non_painful_ecl,	
                    PARAMETERS.drowsy = drowsy,	
                    PARAMETERS.prevPTB_diagnosed = prevPTB_diagnosed,	
                    PARAMETERS.can_stand = can_stand,	
                    PARAMETERS.plhiv= plhiv,	
                    PARAMETERS.hiv = hiv,	
                    PARAMETERS.mother_hiv = mother_hiv,	
                    PARAMETERS.smoking = smoking,	
                    PARAMETERS.drinking = drinking,	
                    PARAMETERS.sex_active = sex_active,	
                    PARAMETERS.renal_disease = renal_disease,	
                    PARAMETERS.malnutrition = malnutrition

                    console.log("QUERY 1: ASSESSMENT - CHECK")
                    console.log(PARAMETERS)

            }

            db.query(xrayQuery, (error2, xrayResults) => {
                if (error2) {
                    res.status(500).json({ error: "Error fetching xray data" });
                    return;
                }

                console.log("QUERY 2: XRAY QUERY - CHECK")

                if (xrayResults.length === 0) {
                    PARAMETERS.xray = 0
                } else {
                    const {TestValue} = xrayResults[0]

                    PARAMETERS.xray = xrayModule(TestValue)
                    console.log("XRAY: " + PARAMETERS.xray)
                }

                db.query(MTBQuery, (error3, MTBResults) => {
                    if (error3) {
                        res.status(500).json({ error: "Error fetching MTB data" });
                        return;
                    }
                    console.log(MTBResults)
                    console.log("QUERY 3: MTB - CHECK")

                    if (MTBResults.length === 0) {
                        PARAMETERS.MTB_positive = 0 
                        PARAMETERS.RIF_resistant = 0
                    } else {
                        const {TestValue} = MTBResults[0]

                        
                        PARAMETERS.MTB_positive = MTBmodule(TestValue)
                        PARAMETERS.RIF_resistant = RIFmodule(TestValue)
                        
                    }

                    console.log("MTB: " +  PARAMETERS.MTB_positive)
                    console.log("RIF: " + PARAMETERS.RIF_resistant)

                    db.query(TSTQuery, (error4, TSTResults) => {
                        if (error4) {
                            res.status(500).json({ error: "Error fetching TST data" });
                            return;
                        }
                        
                        console.log("QUERY 4: TST - CHECK")

                        if (TSTResults.length === 0) {
                            PARAMETERS.tst = 0;
                        } else {
                            const {TestValue} = TSTResults[0]

                            
                            PARAMETERS.tst = TSTmodule(TestValue)
                            
                        }

                        console.log( "TST: " + PARAMETERS.tst)

                        db.query(IGRAQuery, (errorA, IGRAResults) => {
                            
                            if (errorA) {
                                res.status(500).json({ error: "Error fetching IGRA data" });
                                return;
                            }
                            
                            console.log("QUERY: IGRA - CHECK")
    
                            if (IGRAResults.length === 0) {
                                PARAMETERS.igra = 0;
                            } else {
                                const {TestValue} = IGRAResults[0]
    
                                
                                PARAMETERS.igra = IGRAmodule(TestValue)
                            }
                        
                            console.log("igra value: " + PARAMETERS.igra)

                            console.log(PARAMETERS)

                            db.query(`
                            SELECT 
                            t4.diagnosis, t4.EPTBpositive
                            FROM (SELECT d.CaseNo, MAX(d.DGNo) AS latest_diagnosis, MAX(ha.AssessNo) AS latest_healthassess
                            FROM PEDTBDSS_new.TD_PTDIAGNOSIS d 
                            JOIN  PEDTBDSS_new.TD_HEALTHASSESSMENT ha ON d.CaseNo = ha.CaseNo
                            JOIN PEDTBDSS_new.MD_DIAGNOSISRULES dr ON d.RuleNo = dr.RuleNo
                            WHERE d.CaseNo <> ${caseid}
                            GROUP BY d.CaseNo) t1 
                            JOIN PEDTBDSS_new.TD_HEALTHASSESSMENT t2 on t1.latest_healthassess = t2.AssessNo
                            JOIN PEDTBDSS_new.TD_PTDIAGNOSIS t3 on t1.latest_diagnosis = t3.DGNo
                            JOIN PEDTBDSS_new.MD_DIAGNOSISRULES t4 ON t3.RuleNo = t4.RuleNo
                            WHERE 
                                -- Check for the cough parameter
                                (
                                (
                                    t2.cough IS NULL OR t2.cough = ${PARAMETERS.cough}
                                )
                                -- Check for the c_weeks parameter
                                AND (
                                    t2.c_weeks IS NULL OR t2.c_weeks = ${PARAMETERS.c_weeks}
                                )
                                -- Check for the c_persist parameter
                                AND (
                                    t2.c_persist IS NULL OR t2.c_persist = ${PARAMETERS.c_persist}
                                )
                                -- Check for the fever parameter
                                AND (
                                    t2.fever IS NULL OR t2.fever = ${PARAMETERS.fever}
                                )
                                -- Check for the fe_weeks parameter
                                AND (
                                    t2.fe_weeks IS NULL OR t2.fe_weeks = ${PARAMETERS.fe_weeks}
                                )
                                -- Check for the fe_persist parameter
                                AND (
                                    t2.fe_persist IS NULL OR t2.fe_persist = ${PARAMETERS.fe_persist}
                                )
                                -- Check for the weight_loss parameter
                                AND (
                                    t2.weight_loss IS NULL OR t2.weight_loss = ${PARAMETERS.weight_loss}
                                )
                                -- Check for the wl_weeks parameter
                                AND (
                                    t2.wl_weeks IS NULL OR t2.wl_weeks = ${PARAMETERS.wl_weeks}
                                )
                                -- Check for the wl_persist parameter
                                AND (
                                    t2.wl_persist IS NULL OR t2.wl_persist = ${PARAMETERS.wl_persist}
                                )
                                -- Check for the night_sweats parameter
                                AND (
                                    t2.night_sweats IS NULL OR t2.night_sweats = ${PARAMETERS.night_sweats}
                                )
                                -- Check for the ns_weeks parameter
                                AND (
                                    t2.ns_weeks IS NULL OR t2.ns_weeks = ${PARAMETERS.ns_weeks}
                                )
                                -- Check for the ns_persist parameter
                                AND (
                                    t2.ns_persist IS NULL OR t2.ns_persist = ${PARAMETERS.ns_persist}
                                )
                                -- Check for the fatigue parameter
                                AND (
                                    t2.fatigue IS NULL OR t2.fatigue = ${PARAMETERS.fatigue}
                                )
                                -- Check for the fat_weeks parameter
                                AND (
                                    t2.fat_weeks IS NULL OR t2.fat_weeks = ${PARAMETERS.fat_weeks}
                                )
                                -- Check for the fat_persist parameter
                                AND (
                                    t2.fat_persist IS NULL OR t2.fat_persist = ${PARAMETERS.fat_persist}
                                )
                                -- Check for the red_playfulness parameter
                                AND (
                                    t2.red_playfulness IS NULL OR t2.red_playfulness = ${PARAMETERS.red_playfulness}
                                )
                                -- Check for the rp_weeks parameter
                                AND (
                                    t2.rp_weeks IS NULL OR t2.rp_weeks = ${PARAMETERS.rp_weeks}
                                )
                                -- Check for the rp_persist parameter
                                AND (
                                    t2.rp_persist IS NULL OR t2.rp_persist = ${PARAMETERS.rp_weeks}
                                )
                                -- Check for the dec_acts parameter
                                AND (
                                    t2.dec_acts IS NULL OR t2.dec_acts = ${PARAMETERS.dec_acts}
                                )
                                -- Check for the da_weeks parameter
                                AND (
                                    t2.da_weeks IS NULL OR t2.da_weeks = ${PARAMETERS.da_weeks}
                                )
                                -- Check for the da_persist parameter
                                AND (
                                    t2.da_persist IS NULL OR t2.da_persist = ${PARAMETERS.da_persist}
                                )
                                -- Check for the not_eating_well parameter
                                AND (
                                    t2.not_eating_well IS NULL OR t2.not_eating_well = ${PARAMETERS.not_eating_well}
                                )
                                -- Check for the new_weeks parameter
                                AND (
                                    t2.new_weeks IS NULL OR t2.new_weeks = ${PARAMETERS.new_weeks}
                                )
                                -- Check for the new_persist parameter
                                AND (
                                    t2.new_persist IS NULL OR t2.new_persist = ${PARAMETERS.new_persist}
                                )
                                -- Check for the non_painful_ecl parameter
                                AND (
                                    t2.non_painful_ecl IS NULL OR t2.non_painful_ecl = ${PARAMETERS.non_painful_ecl}
                                )
                                -- Check for the drowsy parameter
                                AND (
                                    t2.drowsy IS NULL OR t2.drowsy = ${PARAMETERS.drowsy}
                                )
                                -- Check for the prevPTB_diagnosed parameter
                                AND (
                                    t2.prevPTB_diagnosed IS NULL OR t2.prevPTB_diagnosed = ${PARAMETERS.prevPTB_diagnosed}
                                )
                                -- Check for the can_stand parameter
                                AND (
                                    t2.can_stand IS NULL OR t2.can_stand = ${PARAMETERS.can_stand}
                                )
                                -- Check for the plhiv parameter
                                AND (
                                    t2.plhiv IS NULL OR t2.plhiv = ${PARAMETERS.plhiv}
                                )
                                -- Check for the hiv parameter
                                AND (
                                    t2.hiv IS NULL OR t2.hiv = ${PARAMETERS.hiv}
                                )
                                -- Check for the mother_hiv parameter
                                AND (
                                    t2.mother_hiv IS NULL OR t2.mother_hiv = ${PARAMETERS.mother_hiv}
                                )
                                -- Check for the smoking parameter
                                AND (
                                    t2.smoking IS NULL OR t2.smoking = ${PARAMETERS.smoking}
                                )
                                -- Check for the drinking parameter
                                AND (
                                    t2.drinking IS NULL OR t2.drinking = ${PARAMETERS.drinking}
                                )
                                -- Check for the sex_active parameter
                                AND (
                                    t2.sex_active IS NULL OR t2.sex_active = ${PARAMETERS.sex_active}
                                )
                                -- Check for the renal_disease parameter
                                AND (
                                    t2.renal_disease IS NULL OR t2.renal_disease = ${PARAMETERS.renal_disease}
                                )
                                -- Check for the malnutrition parameter
                                AND (
                                    t2.malnutrition IS NULL OR t2.malnutrition = ${PARAMETERS.malnutrition}
                                )
                                    -- Check for the xray parameter
                                OR (
                                    t4.xray IS NULL OR t4.xray = ${PARAMETERS.xray}
                                )
                                -- Check for the MTB_positive parameter
                                OR (
                                    t4.MTB_positive IS NULL OR t4.MTB_positive = ${PARAMETERS.MTB_positive}
                                )
                                -- Check for the RIF_resistant parameter
                                OR (
                                    t4.RIF_resistant IS NULL OR t4.RIF_resistant = ${PARAMETERS.RIF_resistant}
                                )
                                -- Check for the tst parameter
                                OR (
                                    t4.tst IS NULL OR t4.tst = ${PARAMETERS.tst}
                                )
                                -- Check for the igra parameter
                                OR (
                                    t4.igra IS NULL OR t4.igra = ${PARAMETERS.igra}
                                )
                                )
                                AND (
                                    t4.diagnosis IN ('Bacteriologically Confirmed - Drug Sensitive',
                                                     'Bacteriologically Confirmed - Drug Resistant',
                                                     'NO TB',
                                                     'Clinically Diagnosed TB')
                                )
                            ;
                            
                            `, (errorResults, CompareResults) => {
                            
                                if (errorResults) {
                                    res.status(500).json({ error: errorResults});
                                    return;
                                }
                                
                                console.log("COMPARE - CHECK")
        
                                console.log(CompareResults)

                                const diagnosisValues = CompareResults.map(result => result.diagnosis);
                                const tbTypeValues = CompareResults.map(result => result.EPTBpositive);

                                const TOTAL_SIMCASES = CompareResults.length
                                console.log(TOTAL_SIMCASES)
                                console.log('diagnosis values: ' + diagnosisValues)
                                console.log('tb type values: ' + tbTypeValues)

                                // Create a mapping object
                                const mapping = {
                                    "Bacteriologically Confirmed - Drug Resistant": "bd_res",
                                    "Bacteriologically Confirmed - Drug Sensitive": "bd_nonres",
                                    "Clinically Diagnosed TB": "clinical_diag",
                                    "NO TB": "no_tb"
                                };

                                const typeMapping = {
                                    1: "eptb", 
                                    "-1": "ptb"
                                };

                                // Initialize the object with null values
                                const resultObject = {
                                    bd_res: null,
                                    bd_nonres: null,
                                    clinical_diag: null,
                                    no_tb: null,
                                    ptb: null,
                                    eptb: null
                                };


                                // Step 1: Count the occurrences
                                const occurrenceCounts = diagnosisValues.reduce((counts, item) => {
                                    counts[item] = (counts[item] || 0) + 1;
                                    return counts;
                                }, {});

                                const occurrenceCountsTBType = tbTypeValues.reduce((counts, item) => {
                                    counts[item] = (counts[item] || 0) + 1;
                                    return counts;
                                }, {});

                                console.log(occurrenceCountsTBType)
            

                                // Step 2: Map the occurrences to the result object
                                for (const key in occurrenceCounts) {
                                    const mappedKey = mapping[key];
                                    if (mappedKey) {
                                        resultObject[mappedKey] = occurrenceCounts[key];
                                    }
                                }

                                for (const key in occurrenceCountsTBType) {
                                    const mappedKey = typeMapping[key];
                                    if (mappedKey) {
                                        resultObject[mappedKey] = occurrenceCountsTBType[key];
                                    }
                                }

                                //Step 3: Remove NULL VALUES
                                for (const key in resultObject) {
                                    if (resultObject[key] === null) {
                                        resultObject[key] = 0;
                                    }
                                    else{
                                        resultObject[key] = ((resultObject[key] / diagnosisValues.length) * 100).toFixed(2);
                                    }
                                }

                                console.log(resultObject);
                                res.send(resultObject)
                        });
                            


                    });

                 })
                });
                
            });
        });
      });

    return router;
};
