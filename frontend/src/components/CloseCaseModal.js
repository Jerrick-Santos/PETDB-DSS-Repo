import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const CloseCaseModal = ({ show, onClose, caseid }) => {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request with the selected option
      await axios.post(`http://localhost:4000/api/addlatent/${caseid}`, {
        selectedOption,
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (

    <>
    <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
    <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a Close Contact
  </button>

    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Latent TB Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select an option:</Form.Label>
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedOption}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Option 1">Option 1</Dropdown.Item>
                <Dropdown.Item eventKey="Option 2">Option 2</Dropdown.Item>
                <Dropdown.Item eventKey="Option 3">Option 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default CloseCaseModal;
