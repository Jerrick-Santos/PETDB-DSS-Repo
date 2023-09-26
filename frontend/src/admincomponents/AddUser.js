import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import add from "../assets/add.png";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

function AddUser(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    IDNo: "",
    pw: "",
    BGYNo: 1,
    isActive: 1,
    user_type: "BHW",
    passwordChanged: 0,
  });

  const [IDnoError, setIDError] = useState('');
  const [firstNameError, setFirstError] = useState('');
  const [middleNameError, setMiddleError] = useState('');
  const [lastNameError, setLastError] = useState('');
  const [initialPassError, setPassError] = useState('');

  const validate = () => {
    let IDnoError = '';
    if (!formValues.IDNo) {
      IDnoError = 'Required';
    }
    setIDError(IDnoError);

    let firstNameError = '';
    if (!formValues.first_name) {
      firstNameError = 'Required';
    }
    setFirstError(firstNameError);

    let middleNameError = '';
    if (!formValues.middle_name) {
      middleNameError = 'Required';
    }
    setMiddleError(middleNameError); 

    let lastNameError = '';
    if (!formValues.last_name) {
      lastNameError = 'Required';
    }
    setLastError(lastNameError); 

    let initialPassError = '';
    if (!formValues.pw) {
      initialPassError = 'Required';
    }
    setPassError(initialPassError); 

    if (IDnoError || firstNameError || middleNameError || lastNameError || initialPassError) {
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
      await axios.post("http://localhost:4000/api/newuser", formValues);
      props.onUpdate();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button
        className="btn"
        style={{ color: "white", backgroundColor: "#0077B6" }}
        type="button"
        onClick={handleShow}
      >
        <img src={add} className="me-1 mb-1" style={{ height: "20px" }} /> Add a
        User
      </button>

      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Modal.Header style={{ color: "white", backgroundColor: "#0077B6" }}>
          <Modal.Title>Add a User</Modal.Title>
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
                    {IDnoError && (
                        <p style={{color: 'red'}}>{IDnoError}</p>  
                    )}
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
                    {firstNameError && (
                        <p style={{color: 'red'}}>{firstNameError}</p>  
                    )}
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
                    {middleNameError && (
                        <p style={{color: 'red'}}>{middleNameError}</p>  
                    )}
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
                    {lastNameError && (
                        <p style={{color: 'red'}}>{lastNameError}</p>  
                    )}
              </div>
            </Row>

            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <label for="inputOperatingHours">Initial Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="pw"
                  value={formValues.pw}
                  onChange={handleChange}
                />
                    {initialPassError && (
                        <p style={{color: 'red'}}>{initialPassError}</p>  
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
            Add
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

export default AddUser;
