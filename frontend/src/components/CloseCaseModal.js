import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
const CloseCaseModal = (props) => {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [show, setShow] = useState(false) // Modal for Close Contact Addition
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [formValues, setFormValues] = useState({
    decision:'',
});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues(prev=>({...prev, [name]: value}));
  }

  const handleSubmit = async () => {
    try {
      // Make a POST request with the selected option
      await axios.patch(`http://localhost:4000/api/closecase/${props.caseid}/${formValues.decision}`)

      // Close the modal after successful submission
      window.location.reload()
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (

    <>
    <Badge bg="danger" className="btn btn-danger" type="button" onClick={handleShow}>
    Close Case
  </Badge>

    <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
      <Modal.Header closeButton>
        <Modal.Title>Close Case</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            
          <label> <strong>Reason for Closing</strong></label>
            <select className="form-select" name="decision" value={formValues.decision} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">Died</option>
                <option value="3">Cured</option>
                <option value="4">Lost to Follow Up</option>
                <option value="5">Not Evaluated</option>

            </select>
      
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Exit
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Close Case
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default CloseCaseModal;
