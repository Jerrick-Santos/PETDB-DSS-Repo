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
    });

    return router;
};
