import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import axios from 'axios';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';
import ViewSimilarPatientModal from '../components/ViewSimilarPatientModal'

function AddTreatmentModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id=props.caseID;


    const [formValues, setFormValues] = useState({
        CaseNo: id,
        Medicine:'',
        Dosage:'',
        Frequency:'',
        StartDate: null,
        EndDate: null,
        isCurrent: 0
    });

    const [medError, setMedError] = useState('');
    const [dosageError, setDosageError] = useState('');
    const [freqError, setFreqError] = useState('');
    const [startdateError, setStartDateError] = useState('');
    const [enddateError, setEndDateError] = useState('');

    const validate = () => {
        let medError = '';
        if (!formValues.Medicine) {
            medError = 'Required';
        } else if (formValues.Medicine.length > 45) {
            medError = 'Reference Number should not exceed 45 characters';
        }
        setMedError(medError);

        let dosageError = '';
        if (!formValues.Dosage) {
            dosageError = 'Required';
        } else if (formValues.Dosage.length > 45) {
            dosageError = 'Reference Number should not exceed 45 characters';
        }
        setDosageError(dosageError);

        let freqError = '';
        if (!formValues.Frequency) {
            freqError = 'Required';
        } else if (formValues.Frequency.length > 45) {
            freqError = 'Reference Number should not exceed 45 characters';
        }
        setFreqError(freqError);

        let startdateError = '';
        if (new Date(formValues.StartDate).toLocaleDateString() === null) {
            startdateError = 'Please select a date';
        }
        setStartDateError(startdateError);

        let enddateError = '';
        if (new Date(formValues.EndDate).toLocaleDateString() === null) {
            enddateError = 'Please select a date';
        }
        setEndDateError(enddateError);

        if (medError || dosageError || freqError || startdateError || enddateError) {
            return false;
          }

        return true;
    }

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
        setFormValues(prev=>({...prev, [name]: newValue}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if(!isValid){
          return;
        }
        try{
            await axios.post("http://localhost:4000/api/addtreatment", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
    }
  return (
        <>

            <button className="btn mb-4" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/>     Add a Treatment
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add a Treatment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 justify-content-center">
                {/* For Medicine */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='Medicine'>
                    <Form.Label><strong>Medicine:</strong></Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='Medicine'
                        onChange={handleChange}
                        value={formValues.Medicine}
                        isInvalid={medError}
                    />
                    <Form.Control.Feedback type='invalid'>{medError}</Form.Control.Feedback>
                </Form.Group>
                {/* For Dosage */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='Dosage'>
                    <Form.Label><strong>Dosage:</strong></Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='Dosage'
                        onChange={handleChange}
                        value={formValues.Dosage}
                        isInvalid={dosageError}
                    />
                    <Form.Control.Feedback type='invalid'>{dosageError}</Form.Control.Feedback>
                </Form.Group>
                {/* For Frequency */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='Frequency'>
                    <Form.Label><strong>Frequency:</strong></Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='Frequency'
                        onChange={handleChange}
                        value={formValues.Frequency}
                        isInvalid={freqError}
                    />
                    <Form.Control.Feedback type='invalid'>{freqError}</Form.Control.Feedback>
                </Form.Group>
                {/* For Start Date */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='StartDate'>
                    <Form.Label><strong>Start Date:</strong></Form.Label>
                    <Form.Control
                        required
                        type='date'
                        name='StartDate'
                        onChange={handleChange}
                        isInvalid={startdateError}
                    />
                    <Form.Control.Feedback type='invalid'>{startdateError}</Form.Control.Feedback>
                </Form.Group>
                {/* For End Date */}
                <Form.Group as={Col} md="12" className='mb-3' controlId='EndDate'>
                    <Form.Label><strong>End Date:</strong></Form.Label>
                    <Form.Control
                        required
                        type='date'
                        name='EndDate'
                        onChange={handleChange}
                        isInvalid={enddateError}
                    />
                    <Form.Control.Feedback type='invalid'>{enddateError}</Form.Control.Feedback>
                </Form.Group>
                <Form.Label><strong>Current treatment?&nbsp;&nbsp;&nbsp;</strong><input type="checkbox" name='isCurrent' onChange={handleChange}/></Form.Label>
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






export default AddTreatmentModal;

