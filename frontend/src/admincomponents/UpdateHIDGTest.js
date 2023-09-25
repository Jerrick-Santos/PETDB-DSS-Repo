import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import edit from "../assets/edit.png";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function UpdateHIDGTest(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    HINo:props.HINo,
    DGTestNo:props.DGTestNo,
    AcceptingVoucher:props.AcceptingVoucher,
    Price:props.Price
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/updatehidgtest", formValues);
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
          <Modal.Title>Edit Offered Diagnostic Test Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p><strong> Test:</strong> {props.DGTestName}</p>
    
    <form className="mt-4 justify-content-center">
    <Row className="justify-content-center"> 
     
    </Row>

    <Row className="mt-2 justify-content-center"> 
      <Col lg="7"> 
            <label><strong>Price</strong></label>
            <input type="number" className="form-control" name="Price" value={formValues.Price} onChange={handleChange}/>
      </Col>

      <Col lg="5"> 
      <label> <strong>Accepting Voucher </strong></label>
            <select className="form-select" name="AcceptingVoucher" value={formValues.AcceptingVoucher} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="2">No</option>

            </select>
      </Col>
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

export default UpdateHIDGTest;
