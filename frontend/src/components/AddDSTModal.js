import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import xray from '../assets/xray.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import add from '../assets/add.png';
import Form from 'react-bootstrap/Form';
function AddDSTModal(props) {
   
    const[show,setShow] = useState(false)
    const [dstValidity, setDstValidity] = useState([]);
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
        setDstValidity(response.data)

        })
        .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetchingdata:', error);
        });
        
  

    }, []);

    const [dstValues, setDstValues] = useState({
        CaseNo: props.caseNum,
        HINo: '',
        issue_date: new Date().toISOString().split('T')[0],
        test_refno:'',
        drug1: '',
        drug2: '',
        drug3: '',
        validity: 1,
    })

    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [drug1Error, setDrug1Error] = useState('');
    const [drug2Error, setDrug2Error] = useState('');
    const [drug3Error, setDrug3Error] = useState('');

    const validate = () => {
        let HINoError = '';
        if (!dstValues.HINo) {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let dateError = '';
        if (new Date(dstValues.issue_date).toLocaleDateString() === new Date().toLocaleDateString()) {
            dateError = 'Please select a date';
        }
        setDateError(dateError);

        let testError = '';
        if (!dstValues.test_refno) {
            testError = 'Required';
        } else if (dstValues.test_refno.length > 45) {
            testError = 'Reference Number should not exceed 45 characters';
        }
        setTestError(testError);

        let drug1Error = '';
        if (dstValues.drug1 === "") {
            drug1Error = 'Please select an option';
        }
        setDrug1Error(drug1Error);

        let drug2Error = '';
        if (dstValues.drug2 === "") {
            drug2Error = 'Please select an option';
        }
        setDrug2Error(drug2Error);

        let drug3Error = '';
        if (dstValues.drug3 === "") {
            drug3Error = 'Please select an option';
        }
        setDrug3Error(drug3Error);

        if (HINoError || dateError || testError || drug1Error || drug2Error || drug3Error) {
            return false;
          }

        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDstValues((prev) => ({ ...prev, [name]: value }));
      }

      useEffect(() => {

        const computeValidity = () => {
            const today = new Date();
            const issueDate = new Date(dstValues.issue_date);
            
    
            if (dstValidity.length > 0) {
            const validityMonths = dstValidity[0].DGValidityMonths;
            const validityExpirationDate = new Date(issueDate);
    
            validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);
    
            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1 );
    
            if (today <= validityExpirationDate) {
                setDstValues((prev) => ({ ...prev, validity: 1 }));
              } else {
                setDstValues((prev) => ({ ...prev, validity: 0 }));
              }
            }
        };

        computeValidity()
    }, [dstValidity, dstValues.issue_date]);

      const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if(!isValid){
          return;
        }
        
        try{
            await axios.post("http://localhost:4000/api/newDSTresults", dstValues)
            props.onTestAdded();
            setDstValues((prevDstValues) => ({
                ...prevDstValues,
                HINo: '',
                issue_date: new Date().toISOString().split('T')[0],
                test_refno: '',
                drug1: '',
                drug2: '',
                drug3: '',
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
        <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add DST </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } >
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>  Add DST Results  </Modal.Title>
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
                        value={dstValues.HINo}
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
                        value={new Date(dstValues.issue_date).toISOString().split('T')[0]}
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
                        value={dstValues.test_refno}
                        isInvalid={testError}
                    />
                    <Form.Control.Feedback type='invalid'>{testError}</Form.Control.Feedback>
                </Form.Group>
                {/* For Drug 1 */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='drug1'>
                    <Form.Label><strong>Drug 1:</strong></Form.Label>
                    <Form.Select
                        aria-label="drug1"
                        name='drug1'
                        value={dstValues.TestValue}
                        onChange={handleChange}
                        isInvalid={drug1Error}>
                            <option value="">Select</option>
                            <option value="R">Resistant</option>
                            <option value="S">Susceptible</option>
                            <option value="NA">Indeterminate</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{drug1Error}</Form.Control.Feedback>
                </Form.Group>
                {/* For Drug 2 */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='drug2'>
                    <Form.Label><strong>Drug 2:</strong></Form.Label>
                    <Form.Select
                        aria-label="drug2"
                        name='drug2'
                        value={dstValues.drug2}
                        onChange={handleChange}
                        isInvalid={drug2Error}>
                            <option value="">Select</option>
                            <option value="R">Resistant</option>
                            <option value="S">Susceptible</option>
                            <option value="NA">Indeterminate</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{drug2Error}</Form.Control.Feedback>
                </Form.Group>
                {/* For Drug 3 */}
                <Form.Group as={Col} md="12" controlId='drug3'>
                    <Form.Label><strong>Drug 3:</strong></Form.Label>
                    <Form.Select
                        aria-label="drug3"
                        name='drug3'
                        value={dstValues.drug3}
                        onChange={handleChange}
                        isInvalid={drug3Error}>
                            <option value="">Select</option>
                            <option value="R">Resistant</option>
                            <option value="S">Susceptible</option>
                            <option value="NA">Indeterminate</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{drug3Error}</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
        {/*<div>
            <label><strong> Upload DST File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={dstValues.HINo} onChange={handleChange}>
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
            <input type="date" className="form-control" name='issue_date' value={dstValues.issue_date} onChange={handleChange}/>
            {dateError && (
                <p style={{color: 'red'}}>{dateError}</p>  
            )}
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={dstValues.test_refno} onChange={handleChange}/>
            {testError && (
                <p style={{color: 'red'}}>{testError}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 1: </strong></label>
            <select className="form-select" name='drug1' value={dstValues.drug1} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {valueError && (
                <p style={{color: 'red'}}>{valueError}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 2: </strong></label>
            <select className="form-select" name='drug2' value={dstValues.drug2} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {drug2Error && (
                <p style={{color: 'red'}}>{drug2Error}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 3: </strong></label>
            <select className="form-select" name='drug3' value={dstValues.drug3} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {drug3Error && (
                <p style={{color: 'red'}}>{drug3Error}</p>  
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




export default AddDSTModal;
