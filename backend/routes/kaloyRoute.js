const express = require('express');
const router = express.Router();

// Enter routes here


// Export the router with the attached 'db' connection
module.exports = (db) => {
    // Attach the 'db' connection to all route handlers before returning the router
    router.post('/newpatient', (req, res) => {
        let targetPatientID = null
        const q = "INSERT INTO TD_PTINFORMATION (`last_name`, `first_name`, `middle_initial`, `age`, `sex`, `birthdate`, `initial_bodyweight`, `initial_height`, `nationality`, `per_houseno`, `per_street`, `per_region`, `per_province`, `per_city`, `per_barangay`, `per_zipcode`, `curr_houseno`, `curr_street`, `curr_region`, `curr_province`, `curr_city`, `curr_barangay`, `curr_zipcode`, `admission_date`, `guardian_name`, `g_birthdate`, `g_contactno`, `g_email`, `mother_name`, `m_birthdate`, `m_contactno`, `m_email`, `father_name`, `f_birthdate`, `f_contactno`, `f_email`, `emergency_name`, `e_birthdate`, `e_contactno`, `e_email`) VALUES (?)"
        const values = [
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
            req.body.e_birthdate,
            req.body.e_contactno,
            req.body.e_email,
        ]

        const refno = req.body.case_refno

        db.query(q, [values], (err, data) => {
            if(err) {
                return res.json(err)
            } 
            console.log("Successfully added Patient!")

            
        }); 
        
        const secq = "SELECT PatientNo FROM TD_PTINFORMATION WHERE last_name = ? AND first_name = ? AND middle_initial = ? AND age = ? AND sex = ? AND birthdate = ? AND initial_bodyweight = ? AND initial_height = ? AND nationality = ? AND per_houseno = ? AND per_street = ? AND per_region = ? AND per_province = ? AND per_city = ? AND per_barangay = ? AND per_zipcode = ? AND curr_houseno = ? AND curr_street = ? AND curr_region = ? AND curr_province = ? AND curr_city = ? AND curr_barangay = ? AND curr_zipcode = ? AND admission_date = ? AND guardian_name = ? AND g_birthdate = ? AND g_contactno = ? AND g_email = ? AND mother_name = ? AND m_birthdate = ? AND m_contactno = ? AND m_email = ? AND father_name = ? AND f_birthdate = ? AND f_contactno = ? AND f_email = ? AND emergency_name = ? AND e_birthdate = ? AND e_contactno = ? AND e_email = ?"


            db.query(secq, values, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Query executed successfully:", results)
                    targetPatientID = results[0].PatientNo;
                    console.log("Successfully queried PatientNo:", targetPatientID)

                    const thirdq = "INSERT INTO TD_PTCASE (`PatientNo`, `case_refno`, `SRNo`, `start_date`, `case_status`) VALUES (?, ?, ?, ?, ?)"
                    const secvalues = [targetPatientID, refno, 2, req.body.admission_date, "O"]
                    console.log("Values for case:", secvalues)
                    db.query(thirdq, secvalues, (err, data) => {
                        if(err) {
                            console.log("Error inserting into TD_PTCASE:", err);
                            return res.json(err)
                        }
                        console.log("Successfully inserted into TD_PTCASE:", data);
                        return res.json(data)
                    }); 

                }
            });

           
        
    });


    
    return router;
};
