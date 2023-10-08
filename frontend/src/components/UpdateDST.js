import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'


function UpdateDST(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isReferenced, setIsReferenced] = useState(false);
    const [reference, setReference] = useState(null);

    const [dstValidity, setDSTValidity] = useState([]);

    const[hiData, setHIData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/9`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
        axios.get(`http://localhost:4000/api/validity/9`)
          .then((response) => {
          setDSTValidity(response.data)
          console.log('Validity Months: ', dstValidity);
          // Call computeValidity after fetching xrayValidity and when issue_date changes
          computeValidity();
          })
          .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetchingdata:', error);
        });

    }, []);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/checktestsref/${props.DGResultsNo}`)
            .then((response) => {
                setReference(response.data[0]);

                try {
                    if (response.data[0].total_references > 0) {
                        setIsReferenced(true);
                    } else {
                        setIsReferenced(false);
                    }
                } catch (error) {
                    // Handle any errors that occur during processing
                    console.error('Error processing data:', error);
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });
    }, [props.DGResultsNo]); // Adding props.DGResultsNo as dependency

    const [drugs, setDrugs] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/api/getDrugResistance/${props.DGResultsNo}`)
          .then((response) => {
            setDrugs(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
    }, [props.DGResultsNo])
    

    const [formValues, setFormValues] = useState({
        DGResultsNo: props.DGResultsNo,
        HINo: props.HINo,
        issue_date: props.issue_date,
        test_refno: props.test_refno,
        drug1: '',
        drug2: '',
        drug3: '',
        validity: props.validity,
    });

    useEffect(() => {
        // Check if there are drugs in the array
        if (drugs.length > 0) {
            const firstDrugData = drugs[0]; // Get the first item in the array
    
            // Update formValues with drug values
            setFormValues((prev) => ({
                ...prev,
                drug1: firstDrugData.drug1,
                drug2: firstDrugData.drug2,
                drug3: firstDrugData.drug3,
            }));
        }
    }, [drugs]);

    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [d1Error, setD1Error] = useState('');
    const [d2Error, setD2Error] = useState('');
    const [d3Error, setD3Error] = useState('');

    const validate = () => {
        let HINoError = '';
        if (!formValues.HINo) {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let dateError = '';
        if (!formValues.issue_date) {
            dateError = 'Required';
        }
        setDateError(dateError);

        let testError = '';
        if (!formValues.test_refno) {
            testError = 'Required';
        }
        setTestError(testError);

        let d1Error = '';
        if (!formValues.drug1) {
            d1Error = 'Required';
        }
        setD1Error(d1Error);

        let d2Error = '';
        if (!formValues.drug2) {
            d2Error = 'Required';
        }
        setD2Error(d2Error);

        let d3Error = '';
        if (!formValues.drug3) {
            d3Error = 'Required';
        }
        setD3Error(d3Error);

        if (HINoError || dateError || testError || d1Error || d2Error || d3Error ) {
            return false;
          }

        return true;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prev)=>({...prev, [name]: value}));
        if (name === 'issue_date') {
            computeValidity();
        }
    }

    const computeValidity = () => {
        const today = new Date();
        const issueDate = new Date(formValues.issue_date);

            const validityMonths = dstValidity[0].DGValidityMonths;
            issueDate.setMonth(issueDate.getMonth() + validityMonths);

            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > issueDate ? 0 : 1);

            
        
              const calculatedValidity = today <= issueDate ? 1 : 0;

              // Log calculated validity
              console.log("Calculated validity:", calculatedValidity);
            
              setFormValues(prev => ({
                ...prev,
                validity: calculatedValidity
              }));     
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formattedIssueDate = new Date(formValues.issue_date).toISOString().slice(0, 19).replace('T', ' ');
        const isValid = validate();
        if(!isValid){
          return;
        }

        try{
            await axios.post("http://localhost:4000/api/updateDST", {
                ...formValues,
                issue_date: formattedIssueDate, // Use the formatted date
              });
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
  return (
        <>

            <img
                src={edit}
                onClick={handleShow}
                className="mb-4 me-1 clickable"
                style={{ height: "20px" }}
                 />

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Update DST</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {isReferenced ? (
        <>
        This test is currently being referenced in other records.   <br/>  <br/>
        </>             
    ) : (
        <>
    <form className="mt-4 justify-content-center">
    <div>
            <label><strong> Upload DST File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={formValues.HINo} onChange={handleChange}>
                <option value="">Select</option>
              
              {hiData.map((hi, index) => (
              <>
               <option value={hi.HINo}>{hi.HIName}</option>
              
                   </>
                    ))}
 

            </select>
            {HINoError && (
                <p style={{color: 'red'}}>{HINoError}</p>  
            )}
        </div>
        <div className="mt-3">
            <label><strong>Issued on:</strong></label>
            <input type="date" className="form-control" name='issue_date' value={formValues.issue_date} onChange={handleChange}/>
            {dateError && (
                <p style={{color: 'red'}}>{dateError}</p>  
            )}
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={formValues.test_refno} onChange={handleChange}/>
            {testError && (
                <p style={{color: 'red'}}>{testError}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 1: </strong></label>
            <select className="form-select" name='drug1' value={formValues.drug1} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {d1Error && (
                <p style={{color: 'red'}}>{d1Error}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 2: </strong></label>
            <select className="form-select" name='drug2' value={formValues.drug2} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {d2Error && (
                <p style={{color: 'red'}}>{d2Error}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 3: </strong></label>
            <select className="form-select" name='drug3' value={formValues.drug3} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {d3Error && (
                <p style={{color: 'red'}}>{d3Error}</p>  
            )}
        </div>
    </form>
    </>
    )}
    </Modal.Body>
    <Modal.Footer >
    {isReferenced ? (
        <>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
        </>             
    ) : (
        <>
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Update</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
        </>
    )}
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default UpdateDST;

