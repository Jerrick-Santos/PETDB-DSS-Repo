import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'


function UpdateTST(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isReferenced, setIsReferenced] = useState(false);
    const [reference, setReference] = useState(null);

    const [tstValidity, setTSTValidity] = useState([]);

    const[hiData, setHIData] = useState([])
    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/3`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });

        axios.get(`http://localhost:4000/api/validity/3`)
          .then((response) => {
          setTSTValidity(response.data)
          console.log('Validity Months: ', tstValidity);
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

    const [formValues, setFormValues] = useState({
        DGResultsNo: props.DGResultsNo,
        HINo: props.HINo,
        issue_date: props.issue_date,
        test_refno: props.test_refno,
        TestValue: props.TestValue,
        validity: props.validity,
    });

    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [valueError, setValueError] = useState('');

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

        let valueError = '';
        if (!formValues.TestValue) {
            valueError = 'Required';
        }
        setValueError(valueError);

        if (HINoError || dateError || testError || valueError) {
            return false;
          }

        return true;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
        if (name === 'issue_date') {
            computeValidity();
        }
    }

    const computeValidity = () => {
        const today = new Date();
        const issueDate = new Date(formValues.issue_date);

            const validityMonths = tstValidity[0].DGValidityMonths;
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

        const isValid = validate();
        if(!isValid){
          return;
        }

        try{
            await axios.post("http://localhost:4000/api/updatetests", formValues)
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
        <Modal.Title>Update Health Institution</Modal.Title>
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
            <label><strong> Upload TST Test File Attachment:</strong></label>
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
            <label> <strong>TST Test Results: </strong></label>
            <select className="form-select" name='TestValue' value={formValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="&gt;10 MM">&gt;10 MM</option>
                <option value="&lt;10 MM">&lt;10 MM</option>
                <option value="10">10</option>
            </select>
            {valueError && (
                <p style={{color: 'red'}}>{valueError}</p>  
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




export default UpdateTST;

