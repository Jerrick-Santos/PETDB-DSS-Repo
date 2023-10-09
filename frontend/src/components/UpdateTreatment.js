import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'
import Form from 'react-bootstrap/Form';

function UpdateTreatment(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({
        TreatmentID: props.TreatmentID,
        Medicine: props.Medicine,
        Dosage: props.Dosage,
        Frequency: props.Frequency,
        StartDate: props.StartDate,
        EndDate: props.EndDate
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
        if (new Date(formValues.StartDate).toLocaleDateString() === new Date().toLocaleDateString()) {
            startdateError = 'Please select a date';
        }
        setStartDateError(startdateError);

        let enddateError = '';
        if (new Date(formValues.EndDate).toLocaleDateString() === new Date().toLocaleDateString()) {
            enddateError = 'Please select a date';
        }
        setEndDateError(enddateError);

        if (medError || dosageError || freqError || startdateError || enddateError) {
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
        if(!isValid){
          return;
        }
        try{
            await axios.post("http://localhost:4000/api/updatetreatments", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
    }
  return (
        <>

            <img
                src={edit}
                onClick={handleShow}
                className="mb-4 me-1 clickable"
                style={{ height: "20px" }}
                 />

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Update Treatment</Modal.Title>
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
                        value={new Date(formValues.StartDate).toISOString().split('T')[0]}
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
                        value={new Date(formValues.EndDate).toISOString().split('T')[0]}
                        isInvalid={enddateError}
                    />
                    <Form.Control.Feedback type='invalid'>{enddateError}</Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
        {/*<form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-7">
                    <label for="inputFirstName">Medicine Name</label>
                    <input type="text" class="form-control" name="Medicine" value={formValues.Medicine} onChange={handleChange} placeholder="medicine name"/>
                </div>
                <div className="form-group col-md-5">
                    <label for="inputFirstName">Dosage</label>
                    <input type="text" class="form-control" name="Dosage" value={formValues.Dosage} onChange={handleChange} placeholder="dosage of medicine"/>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">Frequency</label>
                    <input type="text" class="form-control" name="Frequency" value={formValues.Frequency} onChange={handleChange} placeholder="frequency of intake"/>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">Date Started</label>
                    <input type="date" class="form-control" name="StartDate" value={formValues.StartDate} onChange={handleChange} />
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">Date Ended</label>
                    <input type="date" class="form-control" name="EndDate" value={formValues.EndDate} onChange={handleChange} />
                </div>
            </Row>
  </form>*/}
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Add</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default UpdateTreatment;

