import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import edit from "../assets/edit.png";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function UpdateUser(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    first_name: props.first_name,
    middle_name: props.middle_name,
    last_name: props.last_name,
    IDNo: props.username,
    UserNo: props.userNo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/updateuser", formValues);
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
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <label for="inputFirstName">User ID</label>
                <input
                  type="text"
                  class="form-control"
                  name="IDNo"
                  value={formValues.IDNo}
                  onChange={handleChange}
                />
              </div>
            </Row>

            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <label for="inputOperatingHours">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="first_name"
                  value={formValues.first_name}
                  onChange={handleChange}
                />
              </div>
            </Row>

            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <label for="inputCurrHouseNo">Middle Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="middle_name"
                  value={formValues.middle_name}
                  onChange={handleChange}
                />
              </div>
            </Row>

            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <label for="inputCurrHouseNo">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="last_name"
                  value={formValues.last_name}
                  onChange={handleChange}
                />
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

export default UpdateUser;
