const express = require('express');
const router = express.Router();

//interpretation modules


function ageModule(age){
    if (age < 5){
        return 1;
    }
    else {
        return -1;
    }
}

//RETURNS a plhiv_val
function HIVModule(hiv){
    //TODO: Interprets the values of the HIV health assessment 
    if(hiv === 0){
        return -1
    }
    return 1
}

function prevPTBModule(prevPTB_diagnosed){
    //TODO: Interprets the values of the HIV health assessment 
    if(prevPTB_diagnosed === 0){
        return -1
    }
    return 1
}


function PLHIVmodule(plhiv, mother_hiv, sex_active){
    //TODO: Interprets the values of the HIV health assessment 
    var plhiv_val
    if(plhiv == 1|| mother_hiv == 1 || sex_active == 1){
        plhiv_val = 1
    }
    else if ( plhiv == 0 && mother_hiv == 0 && sex_active == 0){
        plhiv_val = -1
    }
    else{
        plhiv_val = -1
    }

    return plhiv_val
}

function cardinalSympModule(cough, fever, weight_loss, night_sweats){
    if(cough == 1 || fever == 1 || weight_loss == 1 || night_sweats == 1){
        return 1
    }
    else{
        return -1
    }
}

function otherSympModule(fatigue, red_playfulness, dec_acts, not_eating_well){
    if(fatigue == 1 || red_playfulness == 1 || dec_acts == 1 || not_eating_well == 1){
        return 1
    }
    else{
        return -1
    }
}

function EPTBSympModule(gibbus_deform, non_painful_ecl, stiff_neck, drowsy, 
    pleural_effusion, pericard_effusion, dist_abdomen,
    non_painful_ejoint, tuberculin_hyper){
    //TODO: Interprets the values of the HIV health assessment 

    if(gibbus_deform == 1 ||  non_painful_ecl == 1 || stiff_neck == 1 || drowsy == 1 || 
        pleural_effusion == 1 || pericard_effusion == 1 || dist_abdomen == 1 ||
        non_painful_ejoint == 1 || tuberculin_hyper){
            return 1
        }
    else {
        return -1
    }
}

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

function detectContactTB(input_contact_status){
    var retVal = -1
    for (let status of input_contact_status) {
        const {diagnosis} = status
        if (diagnosis === 'NO TB' || diagnosis === 'NO TB - Consult for other Diseases' || diagnosis === null) {
            retVal = -1// If "NO TB" or "NO TB - Consult for other Diseases" is found
        }
        else {
            retVal = 1
        }
      }
      return 1; // If neither "NO TB" nor "NO TB - Consult for other Diseases" is found
}


// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router

    // ADD TO LATENT ML
    router.post('/addlatent/:caseid/:latentref', (req, res) => {
        const caseid = req.params.caseid
        const latentref = req.params.latentref

        db.query(`INSERT INTO PEDTBDSS_new.ML_LATENT (LATENTref, CaseNo, RegistryDate) 
        VALUES (?, ?, ?)`, 
        [latentref, caseid, new Date().toISOString().split('T')[0]], 
        (error8, InsertResult) => {
            if (error8) {
                res.status(500).json({ error: "Did Not Add Data: Latent" });
                return;
            }
            else{
                console.log("Succesfully added to latent ML")
                res.status(200).json(InsertResult)
            }
        })
    })

    //ADD TO PRESUMPTIVE ML
    router.post('/addpresumptive/:caseid/:presref', (req, res) => {
        const caseid = req.params.caseid
        const presref = req.params.presref

        db.query(`INSERT INTO PEDTBDSS_new.ML_PRESUMPTIVE (PRESref, CaseNo, RegistryDate) 
        VALUES (?, ?, ?)`, 
        [presref, caseid, new Date().toISOString().split('T')[0]], 
        (error8, InsertResult) => {
            if (error8) {
                res.status(500).json({ error: "Did Not Add Data: Presumptive" });
                return;
            }
            else{
                console.log("Succesfully added to Presumptive ML")
                res.status(200).json(InsertResult)
            }
        })
    })

        //GET A SPECIFIC CASE FROM ML_LATENT
        router.get('/getlatentincase/:caseid', (req, res) => {
            const caseid = req.params.caseid
            const getCaseQuery = `SELECT * FROM PEDTBDSS_new.ML_LATENT c
            WHERE c.CaseNo = ${caseid} `
    
            db.query(getCaseQuery, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send(results)
                }
            });
        })

                //GET A SPECIFIC CASE FROM ML_presumptive
                router.get('/getpresumptiveincase/:caseid', (req, res) => {
                    const caseid = req.params.caseid
                    const getCaseQuery = `SELECT * FROM PEDTBDSS_new.ML_PRESUMPTIVE c
                    WHERE c.CaseNo = ${caseid} `
            
                    db.query(getCaseQuery, (err, results) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.send(results)
                        }
                    });
                })

    //GET A SPECIFIC CASE
    router.get('/getcase/:caseid', (req, res) => {
        const caseid = req.params.caseid
        const getCaseQuery = `SELECT * FROM PEDTBDSS_new.TD_PTCASE c
        WHERE c.CaseNo = ${caseid} `

        db.query(getCaseQuery, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.send(results[0])
            }
        });
    })

    //GET THE latest diagnostic test
    router.get('/getlatestdiagnostic/:caseid', (req, res) => {
        const caseid = req.params.caseid
        const getLatestDiagnosticQuery = `SELECT * FROM PEDTBDSS_new.TD_PTDIAGNOSIS d
        JOIN PEDTBDSS_new.MD_DIAGNOSISRULES r ON d.RuleNo = r.RuleNo
        WHERE d.CaseNo = ${caseid} 
        ORDER BY d.DGNO DESC 
        LIMIT 1 `

        db.query(getLatestDiagnosticQuery, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.send(results[0])
            }
        });
    })

    router.get('/getalldiagnosis/:caseid', (req, res) => {
        const caseid = req.params.caseid
        const getAllDiagnosisQuery = `SELECT * FROM PEDTBDSS_new.TD_PTDIAGNOSIS d
        JOIN PEDTBDSS_new.MD_DIAGNOSISRULES r ON d.RuleNo = r.RuleNo WHERE CaseNo = ${caseid}
        ORDER BY DGNo DESC `

        db.query(getAllDiagnosisQuery, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                res.send(results)
            }
        });
    })
    router.post('/diagnose/:caseid', (req, res) => {
        let ruleNo;

        const symptomsObject = {
            c_symp: null, //assessmentQuery (using cardinal symptoms module)
            EPTB_symp: null, //assessmentQuery -  EPTBSympModule()
            has_TBcontact: null, //TBcontactQuery
            other_symp:  null //assessmentQuery - otherSympModule()
        }

        const highSuspicionObject = {
            plhiv: null, //assessmentQuery (HIV module)
            hiv: null,  //assessmentQuery
            has_TBcontact: null, //TBcontactQuery
            prevPTB_diagnosed: null, 
            first_diag: null
        }

        // const inputObject = {
        //     c_symp: null, //assessmentQuery (using cardinal symptoms module)
        //     plhiv: null, //assessmentQuery (HIV module)
        //     hiv: null,  //assessmentQuery
        //     first_diag: null, //firstDiagnosisQuery
        //     has_TBcontact: null, //TBcontactQuery
        //     ETPB_symp: null, //assessmentQuery -  EPTBSympModule()
        //     xray: null, //xrayQuery
        //     MTB_positive: null, //MTBQuery - MTBModule()
        //     RIF_resistant: null, //MTBQuery - RIFModule()
        //     tst: null //TSTQuery
        // }

        
        const inputObject = {
            presumptive_tb: null, 
            high_sus: null,
            less_five: null,
            has_TBcontact: null,
            first_diag: null,
            xray: null, //xrayQuery
            MTB_positive: null, //MTBQuery - MTBModule()
            RIF_resistant: null, //MTBQuery - RIFModule()
            tst: null, //TSTQuery
            igra: null, //IGRAQuery
            EPTB_symp: null
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

        //GET CONTACT TRACING DATA
        const TBContactQuery = `SELECT ds.diagnosis
        FROM PEDTBDSS_new.TD_PTCASE ptd
        JOIN PEDTBDSS_new.MD_CONTACTTRACING ct ON ptd.CaseNo = ct.CaseNo
        LEFT JOIN PEDTBDSS_new.TD_PTDIAGNOSIS d ON ct.CaseNo = d.CaseNo
        LEFT JOIN PEDTBDSS_new.MD_DIAGNOSISRULES ds ON d.RuleNo = ds.RuleNo
        WHERE ptd.CaseNo = ${caseid};`;

        //GET FIRST DIAGNOSIS OR NOT 
        const firstDiagnosisQuery = `SELECT *
        FROM PEDTBDSS_new.TD_PTCASE ptc
        JOIN PEDTBDSS_new.TD_PTDIAGNOSIS ptd ON ptc.CaseNo = ptd.CaseNo
        WHERE ptc.CaseNo = ${caseid};`

        const diagnosisQuery = `SELECT *
        FROM PEDTBDSS_new.MD_DIAGNOSISRULES
        WHERE c_symp = ${inputObject.c_symp} AND 
        plhiv = ${inputObject.plhiv} AND
        hiv = ${inputObject.hiv} AND
        first_diag = ${inputObject.first_diag} AND
        has_TBcontact = ${inputObject.has_TBcontact} AND
        ETPB_symp = ${inputObject.ETPB_symp} AND 
        xray = ${inputObject.xray} AND
        MTB_positive = ${inputObject.MTB_positive} AND 
        RIF_resistant = ${inputObject.RIF_resistant} AND
        tst = ${inputObject.tst};`

        const ageQuery = `SELECT pi.age AS age, pi.birthdate
        FROM PEDTBDSS_new.TD_PTCASE ptc
        JOIN PEDTBDSS_new.TD_PTINFORMATION pi ON ptc.PatientNo = pi.PatientNo
        WHERE ptc.CaseNo = ${caseid};`


        const test = ``

        //INSERT TO A CASE 
        const diagnoseInsert = ''
        
            // Execute queries
        db.query(assessmentQuery, (error1, assessmentResults) => {
            if (error1) {
                res.status(500).json({ error: "Error fetching assessment data" });
                return;
            }

            if (assessmentResults.length === 0) {
                results.assessment = null;
                res.status(500).json({ error: "No Assessment Data Found: Please Provide Health Assessment" });
            } else {
                    const {
                        //Module Inputs
                        hiv, 
    
                        plhiv, mother_hiv, sex_active, 
    
                        cough, fever, weight_loss, night_sweats,
    
                        gibbus_deform, non_painful_ecl, stiff_neck, drowsy, 
                        pleural_effusion, pericard_effusion, dist_abdomen,
                        non_painful_ejoint, tuberculin_hyper, 

                        fatigue, red_playfulness, dec_acts, not_eating_well,

                        prevPTB_diagnosed
                        
                    } = assessmentResults[0];

                    console.log("QUERY 1: ASSESSMENT - CHECK")

                    //MD_SUSPECIONRULES
    
                    highSuspicionObject.hiv = HIVModule(hiv)

                    //check 
                    console.log(highSuspicionObject.hiv)

                    highSuspicionObject.plhiv = PLHIVmodule(plhiv, mother_hiv, sex_active)

                    //CHECK 
                    console.log(highSuspicionObject.plhiv)

                    highSuspicionObject.prevPTB_diagnosed = prevPTBModule(prevPTB_diagnosed)

                    console.log(highSuspicionObject.prevPTB_diagnosed)

                    //MD_SYMPTOMS RULES

                    symptomsObject.c_symp = cardinalSympModule(cough, fever, weight_loss, night_sweats)

                    //CHECK 
                    console.log(symptomsObject.c_symp)

                    symptomsObject.EPTB_symp = EPTBSympModule(gibbus_deform, non_painful_ecl, stiff_neck, drowsy, 
                        pleural_effusion, pericard_effusion, dist_abdomen,
                        non_painful_ejoint, tuberculin_hyper)

                    inputObject.EPTB_symp = EPTBSympModule(gibbus_deform, non_painful_ecl, stiff_neck, drowsy, 
                        pleural_effusion, pericard_effusion, dist_abdomen,
                        non_painful_ejoint, tuberculin_hyper)

                    //CHECK 
                    console.log(symptomsObject.EPTB_symp)


                    symptomsObject.other_symp = otherSympModule(fatigue, red_playfulness, dec_acts, not_eating_well)

                    //CHECK
                    console.log(symptomsObject.other_symp)
            }

            db.query(xrayQuery, (error2, xrayResults) => {
                if (error2) {
                    res.status(500).json({ error: "Error fetching xray data" });
                    return;
                }

                console.log("QUERY 2: XRAY QUERY - CHECK")

                if (xrayResults.length === 0) {
                    inputObject.xray = 0
                } else {
                    const {TestValue} = xrayResults[0]

                    inputObject.xray = xrayModule(TestValue)
                    console.log(inputObject.xray)
                }

                db.query(MTBQuery, (error3, MTBResults) => {
                    if (error3) {
                        res.status(500).json({ error: "Error fetching MTB data" });
                        return;
                    }

                    console.log("QUERY 3: MTB - CHECK")

                    if (MTBResults.length === 0) {
                        inputObject.MTB_positive = 0 
                        inputObject.RIF_resistant = 0
                    } else {
                        const {TestValue} = MTBResults[0]

                        
                        inputObject.MTB_positive = MTBmodule(TestValue)
                        console.log(inputObject.MTB_positive)
                        inputObject.RIF_resistant = RIFmodule(TestValue)
                        console.log(inputObject.RIF_resistant)
                    }

                    db.query(TSTQuery, (error4, TSTResults) => {
                        if (error4) {
                            res.status(500).json({ error: "Error fetching TST data" });
                            return;
                        }
                        
                        console.log("QUERY 4: TST - CHECK")

                        if (TSTResults.length === 0) {
                            inputObject.tst = 0;
                        } else {
                            const {TestValue} = TSTResults[0]

                            
                            inputObject.tst = TSTmodule(TestValue)
                            console.log(inputObject.tst)
                        }

                        db.query(IGRAQuery, (errorA, IGRAResults) => {
                            
                            if (errorA) {
                                res.status(500).json({ error: "Error fetching IGRA data" });
                                return;
                            }
                            
                            console.log("QUERY: IGRA - CHECK")
    
                            if (IGRAResults.length === 0) {
                                inputObject.igra = 0;
                            } else {
                                const {TestValue} = IGRAResults[0]
    
                                
                                inputObject.igra = IGRAmodule(TestValue)
                            }
                        
                            console.log("igra value: " + inputObject.igra)

                         db.query(ageQuery, (errorB, AgeResults) => {

                            if (errorB) {
                                res.status(500).json({ error: "Error fetching AGE data" });
                                return;
                            }

                            console.log("QUERY: AGE - CHECK")
    
                            if (AgeResults.length === 0) {
                                inputObject.tst = 0;
                            } else {
                                const {age} = AgeResults[0]
    
                                
                                inputObject.less_five = ageModule(age)
                                console.log(inputObject.less_five)
                            }

                        db.query(firstDiagnosisQuery, (error5, firstDiagnosisResults) => {
                            if (error5) {
                                res.status(500).json({ error: "Error fetching FIRST DIAGNOSIS data" });
                                return;
                            }

                            console.log("QUERY 5: FIRST DIAGNOSIS - CHECK")

                            if (firstDiagnosisResults.length === 0) {
                                
                                highSuspicionObject.first_diag = 1
                                inputObject.first_diag = 1
                            } else {
                                highSuspicionObject.first_diag = -1
                                inputObject.first_diag = -1
                            }

                            db.query(TBContactQuery, (error6, TBcontactResults) => {
                                if (error6) {
                                    res.status(500).json({ error: "Error fetching TB CONTACT data" });
                                    return;
                                }

                                console.log("QUERY 6: TB CONTACT - CHECK")

                                if (TBcontactResults.length === 0) {
                                    highSuspicionObject.has_TBcontact = -1
                                    inputObject.has_TBcontact = -1
                                    symptomsObject.has_TBcontact = -1
                                } else {
                                    // highSuspicionObject.has_TBcontact = detectContactTB(TBcontactResults)
                                    // inputObject.has_TBcontact = detectContactTB(TBcontactResults)
                                    // symptomsObject.has_TBcontact = detectContactTB(TBcontactResults)
                                    highSuspicionObject.has_TBcontact = -1
                                    inputObject.has_TBcontact = -1
                                    symptomsObject.has_TBcontact = -1
                                }

                                console.log(symptomsObject)
                                db.query(`SELECT *
                                FROM PEDTBDSS_new.MD_SYMPTOMSRULES
                                WHERE c_symp = ${symptomsObject.c_symp} AND 
                                EPTB_symp = ${symptomsObject.EPTB_symp} AND 
                                has_TBcontact = ${symptomsObject.has_TBcontact} AND
                                other_symp = ${symptomsObject.other_symp};`, (error7, symptomsRules) => {

                                    if (error7) {
                                        res.status(500).json({ error: error7 });
                                        return;
                                    }

                                    console.log(symptomsObject)

                                    console.log("Symptoms Query Results", symptomsRules);

                                    
                                    const {presumptive} = symptomsRules[0]

                                    inputObject.presumptive_tb = presumptive
                        
                                    // All queries have been executed successfully
                                    // res.status(200).json(diagnosisQueryResults);
                                    console.log(presumptive)

                                    db.query(`SELECT *
                                    FROM PEDTBDSS_new.MD_SUSPECIONRULES
                                    WHERE hiv = ${highSuspicionObject.hiv} AND
                                    plhiv = ${highSuspicionObject.plhiv} AND 
                                    has_TBcontact = ${highSuspicionObject.has_TBcontact} AND
                                    prevPTB_diagnosed =  ${highSuspicionObject.prevPTB_diagnosed} AND 
                                    first_diag = ${highSuspicionObject.first_diag};`, (error8, suspicionRules) => {
    
                                        if (error8) {
                                            res.status(500).json({ error: "Error fetching SUSPICION RULES data" });
                                            return;
                                        }
    
                                        console.log(symptomsObject)
    
                                        console.log("Suspicion Query Results", suspicionRules);
    
                                        
                                        const {high_sus, need_hiv} = suspicionRules[0]
    
                                        inputObject.high_sus = high_sus;

                                        db.query(`SELECT *
                                        FROM PEDTBDSS_new.MD_DIAGNOSISRULES
                                        WHERE presumptive_tb = ${inputObject.presumptive_tb} AND 
                                        high_sus = ${inputObject.high_sus} AND
                                        less_five = ${inputObject.less_five} AND 
                                        has_TBcontact = ${inputObject.has_TBcontact} AND
                                        first_diag = ${inputObject.first_diag} AND
                                        xray = ${inputObject.xray} AND
                                        MTB_positive = ${inputObject.MTB_positive} AND 
                                        RIF_resistant = ${inputObject.RIF_resistant} AND
                                        tst = ${inputObject.tst} AND
                                        igra = ${inputObject.igra};`, (error7, diagnosisQueryResults) => {

                                            if (error7) {
                                                res.status(500).json({ error: "Error fetching diagnosis data" });
                                                return;
                                            }

                                            console.log(inputObject)

                                            console.log("Diagnosis Query Results:", diagnosisQueryResults);

                                            
                                            // try{
                                            // const {RuleNo} = diagnosisQueryResults[0]
                                
                                            // // All queries have been executed successfully
                                            // // res.status(200).json(diagnosisQueryResults);
                                            // console.log(RuleNo)
                                            // res.status(200).json("Sunccessful Diagnosis")
                                            // }
                                            // catch(e){
                                            //     res.status(500).json({e: "query is empty"})
                                            //     console.log("Query is empty")
                                            // }

                                            try{
                                                    const {RuleNo} = diagnosisQueryResults[0]
                                        
                                                    // All queries have been executed successfully
                                                    // res.status(200).json(diagnosisQueryResults);
                                                    console.log("Rule Number: " + RuleNo)
                
                                                    db.query(`INSERT INTO PEDTBDSS_new.TD_PTDIAGNOSIS (DGDate, CaseNo, RuleNo, need_hiv) 
                                                    VALUES (?, ?, ?, ?)`, 
                                                    [new Date().toISOString().split('T')[0], caseid, RuleNo, need_hiv], 
                                                    (error8, InsertResult) => {
                                                        if (error8) {
                                                            res.status(500).json({ error: "Did Not Add Data" });
                                                            return;
                                                        }
                                                        else{
                                                            res.status(200).json(InsertResult)
                                                        }
                                                    })
                
                                                    }
                                                    catch(e){
                                                        res.status(500).json({e: "query is empty"})
                                                        console.log("Query is empty")
                                                    }

                                        });
                                        
    
                                    });
                                    

                                });

                                

                                // db.query(`SELECT *
                                // FROM PEDTBDSS_new.MD_DIAGNOSISRULES
                                // WHERE c_symp = ${inputObject.c_symp} AND 
                                // plhiv = ${inputObject.plhiv} AND
                                // hiv = ${inputObject.hiv} AND
                                // first_diag = ${inputObject.first_diag} AND
                                // has_TBcontact = ${inputObject.has_TBcontact} AND
                                // ETPB_symp = ${inputObject.ETPB_symp} AND 
                                // xray = ${inputObject.xray} AND
                                // MTB_positive = ${inputObject.MTB_positive} AND 
                                // RIF_resistant = ${inputObject.RIF_resistant} AND
                                // tst = ${inputObject.tst};`, (error7, diagnosisQueryResults) => {

                                //     if (error7) {
                                //         res.status(500).json({ error: "Error fetching diagnosis data" });
                                //         return;
                                //     }

                                //     console.log(inputObject)

                                //     console.log("Diagnosis Query Results:", diagnosisQueryResults);

                                    
                                //     try{
                                //     const {RuleNo} = diagnosisQueryResults[0]
                        
                                //     // All queries have been executed successfully
                                //     // res.status(200).json(diagnosisQueryResults);
                                //     console.log(RuleNo)

                                //     db.query(`INSERT INTO PEDTBDSS_new.TD_PTDIAGNOSIS (DGDate, CaseNo, RuleNo) 
                                //     VALUES (?, ?, ?)`, 
                                //     [new Date().toISOString().split('T')[0], caseid, RuleNo], 
                                //     (error8, InsertResult) => {
                                //         if (error8) {
                                //             res.status(500).json({ error: "Did Not Add Data" });
                                //             return;
                                //         }
                                //         else{
                                //             res.status(200).json(InsertResult)
                                //         }
                                //     })

                                //     }
                                //     catch(e){
                                //         res.status(500).json({e: "query is empty"})
                                //         console.log("Query is empty")
                                //     }

                                // });


                                
                            });
                        });

                    })
                    });

                 })
                });
                
            });
        });
      });

    return router;
};
