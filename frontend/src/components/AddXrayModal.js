import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import { Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import add from '../assets/add.png';
import Form from 'react-bootstrap/Form';
function AddXrayModal(props) {
   
    const[show,setShow] = useState(false)
    const [xrayValidity, setXrayValidity] = useState([]);
    const[hiData, setHIData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/1`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
        axios.get(`http://localhost:4000/api/validity/1`)
        .then((response) => {
        setXrayValidity(response.data)
        
        })
        .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetchingdata:', error);
        });
    }, []);

    const [xrayValues, setXrayValues] = useState({
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
            const issueDate = new Date(xrayValues.issue_date);
            
    
            if (xrayValidity.length > 0) {
            const validityMonths = xrayValidity[0].DGValidityMonths;
            const validityExpirationDate = new Date(issueDate);
    
            validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);
    
            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1 );
    
            if (today <= validityExpirationDate) {
                setXrayValues((prev) => ({ ...prev, validity: 1 }));
              } else {
                setXrayValues((prev) => ({ ...prev, validity: 0 }));
              }
            }
        };

        computeValidity()
    }, [xrayValidity, xrayValues.issue_date]);

   
    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [valueError, setValueError] = useState('');

    const validate = () => {
        let HINoError = '';
        if (xrayValues.HINo==='') {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let testError = '';
        if (!xrayValues.test_refno) {
            testError = 'Required';
        } else if (xrayValues.test_refno.length > 45) {
            testError = 'Reference Number should not exceed 45 characters';
        }
        setTestError(testError);

        let valueError = '';
        if (xrayValues.TestValue === "") {
            valueError = 'Please select an option';
        }
        setValueError(valueError);

        if (HINoError || testError || valueError) {
            return false;
          }

        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setXrayValues((prev) => ({ ...prev, [name]: value }));
      }

     

      const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if(!isValid){
          return;
        }
        
        try{
            await axios.post("http://localhost:4000/api/newXrayresults", xrayValues)
            props.onTestAdded();
            setXrayValues((prevXrayValues) => ({
                ...prevXrayValues,
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
        <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add XRay </button>

    <Modal show={show} onHide={handleClose} backdrop={ 'static' } >
        <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
            <Modal.Title>  Add Xray Results  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3 justify-content-center">
                    <Form.Group as={Col} md="12" className='mb-3' controlId='HINo'>
                        <Form.Label><strong>Issued by:</strong></Form.Label>
                            <Form.Select
                                aria-label="HINo"
                                name="HINo"
                                value={xrayValues.HINo}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    const newHINo = selectedValue === "0" ? null : selectedValue;
                                    handleChange({ target: { name: "HINo", value: newHINo } });
                                }}
                                isInvalid={HINoError}
                                >
                                <option value="">Select</option>
                                {hiData.map((hi, index) => (
                                    <option key={hi.HINo} value={hi.HINo}>
                                    {hi.HIName}
                                    </option>
                                ))}
                                <option value="0">Others</option>
                            </Form.Select>

                        <Form.Control.Feedback type='invalid'>{HINoError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" className='mb-3' controlId='issue_date'>
                        <Form.Label><strong>Issued on:</strong></Form.Label>
                        <Form.Control
                            required
                            type='date'
                            name='issue_date'
                            onChange={handleChange}
                            value={xrayValues.issue_date}
                            isInvalid={dateError}
                        />
                        <Form.Control.Feedback type='invalid'>{dateError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" className='mb-3' controlId='test_refno'>
                        <Form.Label><strong>Reference Number:</strong></Form.Label>
                        <Form.Control
                            required
                            type='text'
                            name='test_refno'
                            onChange={handleChange}
                            value={xrayValues.test_refno}
                            isInvalid={testError}
                        />
                        <Form.Control.Feedback type='invalid'>{testError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId='TestValue'>
                        <Form.Label><strong>Results:</strong></Form.Label>
                        <Form.Select
                            aria-label="TestValue"
                            name='TestValue'
                            value={xrayValues.TestValue}
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
        </Modal.Body>
        <Modal.Footer >
            <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
            <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
        </Modal.Footer>
    </Modal>
    </>
  );
}

export default AddXrayModal;