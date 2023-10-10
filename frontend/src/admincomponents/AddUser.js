import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import add from "../assets/add.png";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import Form from 'react-bootstrap/Form';

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
    BGYNo: props.BGYNo,
    isActive: 1,
    user_type: "BHW",
    passwordChanged: 0,
  });



  const [IDnoError, setIDError] = useState('');
  const [firstNameError, setFirstError] = useState('');
  const [middleNameError, setMiddleError] = useState('');
  const [lastNameError, setLastError] = useState('');
  const [initialPassError, setPassError] = useState('');
  const [userExist, setUserExist] = useState(false);

useEffect(() => {

  if (formValues.IDNo) {
    axios.get(`http://localhost:4000/api/checkuserexist/${formValues.IDNo}`)
  .then((response) => {
    if(response.data.length>0){
      console.log(response.data)
      setUserExist(true)
    } else{
      setUserExist(false)
    }
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
  });
  }
  
    

}, [formValues.IDNo]);

  const validate = () => {
    let IDnoError = '';
    if (!formValues.IDNo) {
      IDnoError = 'Required field';
    } else if (userExist){
      IDnoError = 'User ID already exists'
    }
    setIDError(IDnoError);

    let firstNameError = '';
    if (!formValues.first_name) {
      firstNameError = 'Required field';
    }
    setFirstError(firstNameError);

    let middleNameError = '';
    if (!formValues.middle_name) {
      middleNameError = 'Required field';
    }
    setMiddleError(middleNameError); 

    let lastNameError = '';
    if (!formValues.last_name) {
      lastNameError = 'Required field';
    }
    setLastError(lastNameError); 

    let initialPassError = '';
    if (!formValues.pw) {
      initialPassError = 'Required field';
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
          <Form className="mt-3 justify-content-center" noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                    required
                    type='text'
                    name='IDNo'
                    onChange={handleChange}
                    value={formValues.IDNo}
                    placeholder="User ID"
                    isInvalid={IDnoError}
                />
                <Form.Control.Feedback type='invalid'>{IDnoError}</Form.Control.Feedback>
              </div>
            </Row>
            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    required
                    type='text'
                    name='first_name'
                    onChange={handleChange}
                    value={formValues.first_name}
                    placeholder="First Name"
                    isInvalid={firstNameError}
                />
                <Form.Control.Feedback type='invalid'>{firstNameError}</Form.Control.Feedback>
              </div>
            </Row>
            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                    required
                    type='text'
                    name='middle_name'
                    onChange={handleChange}
                    value={formValues.middle_name}
                    placeholder="Middle Name"
                    isInvalid={middleNameError}
                />
                <Form.Control.Feedback type='invalid'>{middleNameError}</Form.Control.Feedback>
              </div>
            </Row>
            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    required
                    type='text'
                    name='last_name'
                    onChange={handleChange}
                    value={formValues.last_name}
                    placeholder="Last Name"
                    isInvalid={lastNameError}
                />
                <Form.Control.Feedback type='invalid'>{lastNameError}</Form.Control.Feedback>
              </div>
            </Row>
            <Row className="mb-3 justify-content-center">
              <div className="form-group col-md-12">
                <Form.Label>Initial Password</Form.Label>
                <Form.Control
                    required
                    type='text'
                    name='pw'
                    onChange={handleChange}
                    value={formValues.pw}
                    placeholder="Password"
                    isInvalid={initialPassError}
                />
                <Form.Control.Feedback type='invalid'>{initialPassError}</Form.Control.Feedback>
              </div>
            </Row>
          </Form>

          {/*<form className="mt-3 justify-content-center">
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
                    </form>*/}
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
