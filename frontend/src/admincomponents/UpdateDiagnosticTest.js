import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import edit from "../assets/edit.png";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function UpdateDiagnosticTest(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    DGTestName: props.DGTestName,
    DGValidityMonths:props.DGValidityMonths,
    DGTestNo: props.DGTestNo
});

const [testNameError, setTestNameError] = useState('');
const [validityError, setValidError] = useState('');

const validate = () => {
    let testNameError = '';
    if (!formValues.DGTestName) {
        testNameError = 'Required';
    }
    setTestNameError(testNameError);

    let validityError = '';
    if (!formValues.DGValidityMonths) {
        validityError = 'Required';
    }
    setValidError(validityError);

    if (testNameError || validityError) {
      return false;
    }

    return true;
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if(!isValid) {
        return;
    }

    try {
      await axios.post("http://localhost:4000/api/updatedgtest", formValues);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <>
      
      {props.isActive === 1 ? (
        <img
          src={edit}
          onClick={handleShow}
          className="mb-4 me-1 clickable"
          style={{ height: "20px" }}
        />
      ) : null}
    

      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Modal.Header style={{ color: "white", backgroundColor: "#0077B6" }}>
          <Modal.Title>Edit Diagnostic Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
    
        <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-8">
                    <label for="inputFirstName">Diagnostic Test Name</label>
                    <input type="text" class="form-control" name="DGTestName" value={formValues.DGTestName} onChange={handleChange} placeholder="Test Name"/>
                    {testNameError && (
                        <p style={{color: 'red'}}>{testNameError}</p>  
                    )}
                </div>
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Validity</label>
                    <input type="number" class="form-control" name="DGValidityMonths" value={formValues.DGValidityMonths} onChange={handleChange} placeholder="months"/>
                    {validityError && (
                        <p style={{color: 'red'}}>{validityError}</p>  
                    )}
                </div>
            </Row>

           
          
            
            </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn"
            onClick={handleSubmit}
            style={{ color: "white", backgroundColor: "#0077B6" }}
          >
            Update
          </button>
          <button
            type="submit"
            onClick={handleClose}
            className="btn btn-secondary"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateDiagnosticTest;
