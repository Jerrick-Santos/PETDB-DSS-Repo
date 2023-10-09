import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import add from '../assets/add.png';
import Form from 'react-bootstrap/Form';
function AddMTBRIFModal(props) {
   
    const[show,setShow] = useState(false)
    const [mtbValidity, setMTBValidity] = useState([]);
    const[hiData, setHIData] = useState([])

    

    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/2`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
        axios.get(`http://localhost:4000/api/validity/2`)
          .then((response) => {
          setMTBValidity(response.data)

          })
          .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetchingdata:', error);
        });
    
    }, []);

    const [mtbValues, setMTBValues] = useState({
            CaseNo: props.caseNum,
            HINo: '',
            issue_date: new Date().toISOString().split('T')[0],
            test_refno:'',
            TestValue: '',
            validity: 1,
    })

    useEffect(() => {

        const computeValidity = () => {
            const today = new Date();
            const issueDate = new Date(mtbValues.issue_date);
            
    
            if (mtbValidity.length > 0) {
            const validityMonths = mtbValidity[0].DGValidityMonths;
            const validityExpirationDate = new Date(issueDate);
    
            validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);
    
            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1 );
    
            if (today <= validityExpirationDate) {
                setMTBValues((prev) => ({ ...prev, validity: 1 }));
              } else {
                setMTBValues((prev) => ({ ...prev, validity: 0 }));
              }
            }
        };

        computeValidity()
    }, [mtbValidity, mtbValues.issue_date]);

    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [valueError, setValueError] = useState('');

    const validate = () => {
        let HINoError = '';
        if (!mtbValues.HINo) {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let dateError = '';
        if (new Date(mtbValues.issue_date).toLocaleDateString() === new Date().toLocaleDateString()) {
            dateError = 'Please select a date';
        }
        setDateError(dateError);

        let testError = '';
        if (!mtbValues.test_refno) {
            testError = 'Required';
        } else if (mtbValues.test_refno.length > 45) {
            testError = 'Reference Number should not exceed 45 characters';
        }
        setTestError(testError);

        let valueError = '';
        if (!mtbValues.TestValue) {
            valueError = 'Please select an option';
        }
        setValueError(valueError);

        if (HINoError || dateError || testError || valueError) {
            return false;
          }

        return true;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMTBValues((prev)=>({...prev, [name]: value}));
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const isValid = validate();
        if(!isValid){
          return;
        }

        try{
            await axios.post("http://localhost:4000/api/newMTBresults", mtbValues)
            props.onTestAdded();
            setMTBValues((prevMTBValues) => ({
                ...prevMTBValues,
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
        <img src={add} className="me-1 mb-1" style={{height:"20px"}}/>  Add MTB/RIF</button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add MTB/RIF Results</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 justify-content-center">
                {/* For HI Number */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='HINo'>
                    <Form.Label><strong>Issued by:</strong></Form.Label>
                    <Form.Select
                        aria-label="HINo"
                        name='HINo'
                        value={mtbValues.HINo}
                        onChange={handleChange}
                        isInvalid={HINoError}>
                            <option value="">Select</option>
              
                                {hiData.map((hi, index) => (
                                <>
                                <option value={hi.HINo}>{hi.HIName}</option>
                                
                                    </>
                                ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{HINoError}</Form.Control.Feedback>
                </Form.Group>
                {/* For Issue Date */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='issue_date'>
                    <Form.Label><strong>Issued on:</strong></Form.Label>
                    <Form.Control
                        required
                        type='date'
                        name='issue_date'
                        onChange={handleChange}
                        value={new Date(mtbValues.issue_date).toISOString().split('T')[0]}
                        isInvalid={dateError}
                    />
                    <Form.Control.Feedback type='invalid'>{dateError}</Form.Control.Feedback>
                </Form.Group>
                {/* For Reference Number */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='test_refno'>
                    <Form.Label><strong>Reference Number:</strong></Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='test_refno'
                        onChange={handleChange}
                        value={mtbValues.test_refno}
                        isInvalid={testError}
                    />
                    <Form.Control.Feedback type='invalid'>{testError}</Form.Control.Feedback>
                </Form.Group>
                {/* For Test Value */}
                <Form.Group as={Col} md="12" controlId='TestValue'>
                    <Form.Label><strong>Xray Results:</strong></Form.Label>
                    <Form.Select
                        aria-label="TestValue"
                        name='TestValue'
                        value={mtbValues.TestValue}
                        onChange={handleChange}
                        isInvalid={valueError}>
                            <option value="">Select</option>
                            <option value="With Signs of TB">With Signs of TB</option>
                            <option value="No signs">No signs</option>
                            <option value="Undetermined">Undetermined</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{valueError}</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
        {/*<div>
            <label><strong> Upload MTB/RIF File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={mtbValues.HINo} onChange={handleChange}>
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
            <input type="date" className="form-control" name='issue_date' value={mtbValues.issue_date} onChange={handleChange}/>
            {dateError && (
                <p style={{color: 'red'}}>{dateError}</p>  
            )}
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={mtbValues.test_refno} onChange={handleChange}/>
            {testError && (
                <p style={{color: 'red'}}>{testError}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>MTB/RIF Results: </strong></label>
            <select className="form-select" name='TestValue' value={mtbValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="0-NA">MTB not Detected</option>
                <option value="MTB-S">MTB Detected/RIF not detected</option>
                <option value="MTB-R">MTB Detected/RIF detected</option>
                <option value="MTB-NA">MTB Detected Trace/RIF resistance indeterminate 1st collection</option>
                <option value="MTB-NA">MTB Detected Trace/RIF resistance indeterminate 2nd collection</option>
                <option value="0-NA">Indeterminate/Error 1st collection</option>
                <option value="0-NA">Indeterminate/Error 2nd collection</option>
            </select>
            {valueError && (
                <p style={{color: 'red'}}>{valueError}</p>  
            )}
            </div>*/}
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AddMTBRIFModal;

