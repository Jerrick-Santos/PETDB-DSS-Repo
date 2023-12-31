import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import edit from "../assets/edit.png";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

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

  const [IDnoError, setIDError] = useState('');
  const [firstNameError, setFirstError] = useState('');
  const [middleNameError, setMiddleError] = useState('');
  const [lastNameError, setLastError] = useState('');
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    if (formValues.IDNo !== '') {
      axios.post(`http://localhost:4000/api/checkuserexist`, formValues)
        .then((response) => {
          if (response.status === 200) {
            if ((response.data.length > 0) && (response.data[0].userNo !== props.userNo)) {
              setUserExist(true);
            } else {
              setUserExist(false);
            }
          } else {
            // Handle non-200 status codes here if needed
            console.error('Non-200 status code:', response.status);
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

    if (IDnoError || firstNameError || middleNameError || lastNameError) {
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
      await axios.post("http://localhost:4000/api/adminupdateuser", formValues);
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
                    </form>*/}
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
