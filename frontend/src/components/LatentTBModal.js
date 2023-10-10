import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const LatentTBModal = ({ show, onClose, caseid }) => {
  const [textInput, setTextInput] = useState('');
  const [valueError, setValueError] = useState('');

  const validate = () => {

    let valueError = '';
    if (textInput === "") {
        valueError = 'Please Enter a Valid Reference Number';
    }
    setValueError(valueError);

    if (valueError) {
        return false;
      }

    return true;
}

  const handleSubmit = async () => {

    const isValid = validate();
    if(!isValid){
      return;
    }
    
    try {
      // Make a POST request with the input data
      await axios.post(`http://localhost:4000/api/addlatent/${caseid}/${textInput}`, {
        inputData: textInput,
      });
      window.location.reload()
      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Latent TB Reference Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="textInput">
            <Form.Label>Please Enter Latent TB Reference Number</Form.Label>
            <Form.Control
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              isInvalid={valueError}
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

export default LatentTBModal;
