import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import add from '../assets/add.png';
function AddIGRAModal(props) {
   
    const[show,setShow] = useState(false)
    const [igraValidity, setIGRAValidity] = useState([]);
    const[hiData, setHIData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/7`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });

        axios.get(`http://localhost:4000/api/validity/7`)
          .then((response) => {
          setIGRAValidity(response.data)
          })
          .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetchingdata:', error);
        });
    
    }, []);

    const [igraValues, setIGRAValues] = useState({
        CaseNo: props.caseNum,
        HINo: '',
        issue_date: new Date().toISOString().split('T')[0],
        test_refno:'',
        TestValue: '',
        validity: 1,
    })

    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [valueError, setValueError] = useState('');

    const validate = () => {
        let HINoError = '';
        if (!igraValues.HINo) {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let dateError = '';
        if (!igraValues.issue_date) {
            dateError = 'Required';
        }
        setDateError(dateError);

        let testError = '';
        if (!igraValues.test_refno) {
            testError = 'Required';
        }
        setTestError(testError);

        let valueError = '';
        if (!igraValues.TestValue) {
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
        setIGRAValues(prev=>({...prev, [name]: value}));
    }

    useEffect(() => {

        const computeValidity = () => {
            const today = new Date();
            const issueDate = new Date(igraValues.issue_date);
            
    
            if (igraValidity.length > 0) {
            const validityMonths = igraValidity[0].DGValidityMonths;
            const validityExpirationDate = new Date(issueDate);
    
            validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);
    
            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1 );
    
            if (today <= validityExpirationDate) {
                setIGRAValues((prev) => ({ ...prev, validity: 1 }));
              } else {
                setIGRAValues((prev) => ({ ...prev, validity: 0 }));
              }
            }
        };

        computeValidity()
    }, [igraValidity, igraValues.issue_date]);

      const handleSubmit = async (e) => {
        e.preventDefault()

        const isValid = validate();
        if(!isValid){
          return;
        }

        try{
            await axios.post("http://localhost:4000/api/newIGRAresults", igraValues)
            props.onTestAdded();
            setIGRAValues((prevIGRAValues) => ({
                ...prevIGRAValues,
                HINo: '',
                issue_date: new Date().toISOString().split('T')[0],
                test_refno: '',
                TestValue: '',
                validity: 1,
              }));
            handleClose()
        }catch(err){
            console.log(err)
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} onClick={handleShow}> 
        <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add IGRA </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add IGRA Test Results</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-4 justify-content-center">
        <div>
            <label><strong> Upload IGRA Test File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={igraValues.HINo} onChange={handleChange}>
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
            <input type="date" className="form-control" name='issue_date' value={igraValues.issue_date} onChange={handleChange}/>
            {dateError && (
                <p style={{color: 'red'}}>{dateError}</p>  
            )}
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={igraValues.test_refno} onChange={handleChange}/>
            {testError && (
                <p style={{color: 'red'}}>{testError}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>IGRA Test Results: </strong></label>
            <select className="form-select" name='TestValue' value={igraValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
            </select>
            {valueError && (
                <p style={{color: 'red'}}>{valueError}</p>  
            )}
        </div>
    </form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}

export default AddIGRAModal;

