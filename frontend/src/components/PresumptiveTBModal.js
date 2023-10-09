import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const PresumptiveTBModal = ({ show, onClose, caseid }) => {
  const [textInput, setTextInput] = useState('');

  const handleSubmit = async () => {
    try {
      // Make a POST request with the input data
      await axios.post(`http://localhost:4000/api/addpresumptive/${caseid}/${textInput}`, {
        inputData: textInput,
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop={ 'static' }>
      <Modal.Header>
        <Modal.Title>Presumptive TB Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="textInput">
            <Form.Label>Enter Text Input</Form.Label>
            <Form.Control
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PresumptiveTBModal;
