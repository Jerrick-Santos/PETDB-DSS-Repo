import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import { Row, Col  } from 'react-bootstrap';
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
        izo: '',
        eto: '',
        fq: '',
        amk: '',
        validity: 1,
    })

    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [drug1Error, setDrug1Error] = useState('');
    const [drug2Error, setDrug2Error] = useState('');
    const [drug3Error, setDrug3Error] = useState('');
    const [drug4Error, setDrug4Error] = useState('');

    const validate = () => {
        let HINoError = '';
        if (dstValues.HINo==='') {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let testError = '';
        if (!dstValues.test_refno) {
            testError = 'Required';
        } else if (dstValues.test_refno.length > 45) {
            testError = 'Reference Number should not exceed 45 characters';
        }
        setTestError(testError);

        let drug1Error = '';
        if (dstValues.izo === "") {
            drug1Error = 'Please select an option';
        }
        setDrug1Error(drug1Error);

        let drug2Error = '';
        if (dstValues.eto === "") {
            drug2Error = 'Please select an option';
        }
        setDrug2Error(drug2Error);

        let drug3Error = '';
        if (dstValues.fq === "") {
            drug3Error = 'Please select an option';
        }
        setDrug3Error(drug3Error);

        let drug4Error = '';
        if (dstValues.amk === "") {
            drug4Error = 'Please select an option';
        }
        setDrug4Error(drug4Error);

        if (HINoError || testError || drug1Error || drug2Error || drug3Error || drug4Error) {
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
                izo: '',
                eto: '',
                fq: '',
                amk: '',
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
                        name="HINo"
                        value={dstValues.HINo}
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
                        value={dstValues.issue_date}
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
                <Form.Group as={Col} md="12" className='mb-3' controlId='izo'>
                    <Form.Label><strong>Isoniazid:</strong></Form.Label>
                    <Form.Select
                        aria-label="izo"
                        name='izo'
                        value={dstValues.izo}
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
                <Form.Group as={Col} md="12" className='mb-3' controlId='eto'>
                    <Form.Label><strong>Ethionamide:</strong></Form.Label>
                    <Form.Select
                        aria-label="eto"
                        name='eto'
                        value={dstValues.eto}
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
                <Form.Group as={Col} md="12" controlId='fq'>
                    <Form.Label><strong>Fluoroquinolones:</strong></Form.Label>
                    <Form.Select
                        aria-label="fq"
                        name='fq'
                        value={dstValues.fq}
                        onChange={handleChange}
                        isInvalid={drug3Error}>
                            <option value="">Select</option>
                            <option value="R">Resistant</option>
                            <option value="S">Susceptible</option>
                            <option value="NA">Indeterminate</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{drug3Error}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId='amk'>
                    <Form.Label><strong>Amikacin:</strong></Form.Label>
                    <Form.Select
                        aria-label="amk"
                        name='amk'
                        value={dstValues.amk}
                        onChange={handleChange}
                        isInvalid={drug4Error}>
                            <option value="">Select</option>
                            <option value="R">Resistant</option>
                            <option value="S">Susceptible</option>
                            <option value="NA">Indeterminate</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{drug4Error}</Form.Control.Feedback>
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

export default AddDSTModal;