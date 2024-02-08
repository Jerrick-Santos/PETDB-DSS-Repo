import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function CreateDiagnosticTest() {
   
    const[show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formValues, setFormValues] = useState({
        DGTestName:'',
        DGValidityMonths:'',
        isRequired:'0',
        isActive:'1'
    });

    const [testNameError, setTestNameError] = useState('');
    const [validityError, setValidError] = useState('');

    const validate = () => {
        let testNameError = '';
        if (!formValues.DGTestName) {
            testNameError = 'Required field';
        }
        setTestNameError(testNameError);

        let validityError = '';
        if (!formValues.DGValidityMonths) {
            validityError = 'Required field';
        } else if (isNaN(formValues.DGValidityMonths)) {
            validityError = 'Must be a valid number';
        } else if (!/^\d+$/.test(formValues.DGValidityMonths)) {
            validityError = 'Should not have letters';
        }
        setValidError(validityError);
    
        if (testNameError || validityError) {
          return false;
        }
        return true;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isValid = validate();
        if(!isValid) {
            return;
        }

        try{
            await axios.post("http://localhost:4000/api/createdt", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
    }
  return (
        <>
            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/>     Create a Test
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Create a Diagnostic Test</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form className="mt-3 justify-content-center" noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-8">
                    <Form.Label for="inputDiagnosticName">Diagnostic Test Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='DGTestName'
                        onChange={handleChange}
                        value={formValues.DGTestName}
                        placeholder="Test Name"
                        isInvalid={testNameError}
                    />
                    <Form.Control.Feedback type='invalid'>{testNameError}</Form.Control.Feedback>
                </div>
                <div className="form-group col-md-4">
                    <Form.Label for="inputValidity">Validity</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        name='DGValidityMonths'
                        onChange={handleChange}
                        value={formValues.DGValidityMonths}
                        placeholder="Months"
                        isInvalid={validityError}
                    />
                    <Form.Control.Feedback type='invalid'>{validityError}</Form.Control.Feedback>
                </div>
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

export default CreateDiagnosticTest;