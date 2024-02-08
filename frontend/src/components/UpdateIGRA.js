import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import { Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'
import Form from 'react-bootstrap/Form';

function UpdateIGRA(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isReferenced, setIsReferenced] = useState(false);
    const [reference, setReference] = useState(null);

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
        issue_date: new Date(props.issue_date).toISOString().split('T')[0],
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
        if (formValues.HINo==='') {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let dateError = '';
        if (new Date(formValues.issue_date).toLocaleDateString() === new Date().toLocaleDateString()) {
            dateError = 'Please select a date';
        }
        setDateError(dateError);

        let testError = '';
        if (!formValues.test_refno) {
            testError = 'Required';
        } else if (formValues.test_refno.length > 45) {
            testError = 'Reference Number should not exceed 45 characters';
        }
        setTestError(testError);

        let valueError = '';
        if (formValues.TestValue === "") {
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
        setFormValues((prev)=>({...prev, [name]: value}));
    }

    useEffect(() => {

        const computeValidity = () => {
            const today = new Date();
            const issueDate = new Date(formValues.issue_date);
            
    
            if (igraValidity.length > 0) {
            const validityMonths = igraValidity[0].DGValidityMonths;
            const validityExpirationDate = new Date(issueDate);
    
            validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);
    
            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1 );
    
            if (today <= validityExpirationDate) {
                setFormValues((prev) => ({ ...prev, validity: 1 }));
              } else {
                setFormValues((prev) => ({ ...prev, validity: 0 }));
              }
            }
        };

        computeValidity()
    }, [igraValidity, formValues.issue_date]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formattedIssueDate = new Date(formValues.issue_date).toISOString().slice(0, 19).replace('T', ' ');
        const isValid = validate();
        if(!isValid){
          return;
        }

        try{
            await axios.post("http://localhost:4000/api/updatetests", {
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
        <Modal.Title>Update IGRA Test</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {isReferenced ? (
        <>
        This test is currently being referenced in other records.   <br/>  <br/>
        </>             
    ) : (
        <>
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 justify-content-center">
                {/* For HI Number */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='HINo'>
                    <Form.Label><strong>Issued by:</strong></Form.Label>
                    <Form.Select
                        aria-label="HINo"
                        name="HINo"
                        value={formValues.HINo}
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
                {/* For Issue Date */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='issue_date'>
                    <Form.Label><strong>Issued on:</strong></Form.Label>
                    <Form.Control
                        required
                        type='date'
                        name='issue_date'
                        onChange={handleChange}
                        value={formValues.issue_date}
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
                        value={formValues.test_refno}
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
                        value={formValues.TestValue}
                        onChange={handleChange}
                        isInvalid={valueError}>
                            <option value="">Select</option>
                            <option value="Positive">Positive</option>
                            <option value="Negative">Negative</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{valueError}</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
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




export default UpdateIGRA;

