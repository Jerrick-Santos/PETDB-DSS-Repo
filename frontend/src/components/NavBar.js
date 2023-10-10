import React, { useState, useEffect,PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import icon from "../assets/icon.png";
import view from "../assets/view.png";
import { Navbar, Nav, Card, Row, Col, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";

const NavBar = () => {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');
  };
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [userNum, setUserNum] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in local storage.');
          return;
        }
  
        // Define headers with the JWT token
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        // Make an Axios GET request to the /test route with the token in headers
        const response = await axios.get('http://localhost:4000/api/tokencontent', { headers });
  
        // Handle the response data
        console.log('Response:', response.data);
        setUserNum(response.data.userNo);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        console.log("TEST1" + response.data.userNo)
        axios.get(`http://localhost:4000/api/user/${response.data.userNo}`)
            .then((response) => {
              if(response.data[0].passwordChanged===0){
                handleShow1()
              }
            })
            .catch((error) => {
              console.error("Error fetching BHCs:", error);
            });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData(); // Call the fetchData function when the component mounts

    
      
    
    
  }, []);

 

  const [formValues, setFormValues] = useState({
    pw: ''
  });

  const [pwValues, setPwValues] = useState({
    oldPw: '',
    confirmPw: ''
  });

  const [correctOld, setCorrectOld] = useState(false);

  useEffect(() => {

    if (pwValues.oldPw) {
      axios.get(`http://localhost:4000/api/checkoldpw/${userNum}/${pwValues.oldPw}`)
    .then((response) => {
      console.log(response.data)
      if(response.data.length>0){
        console.log(response.data)
        setCorrectOld(true)
      } else{
        setCorrectOld(false)
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetching data:', error);
    });
    }
  }, [pwValues.oldPw]);

  const [oldPwError, setOldError] = useState('');
  const [pwError, setPwError] = useState('');
  const [confirmPwError, setConfirmError] = useState('');

  const validate = () => {
    let oldPwError = '';
    if (!correctOld){
      oldPwError = 'Incorrect password'
    }
    setOldError(oldPwError);

    let pwError = '';
    if (!formValues.pw) {
      pwError = 'Required';
    }
    setPwError(pwError);

    let confirmError = '';
    if (pwValues.confirmPw !== formValues.pw) {
      confirmError = 'Password does not match';
    }
    setConfirmError(confirmError);  

    if (oldPwError || pwError || confirmError) {
      return false;
    }

    return true;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPwValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if(!isValid) {
        return;
    }
    
    try {
      await axios.post(`http://localhost:4000/api/updatepw/${userNum}`, formValues);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <>
    <Navbar style={{ backgroundColor: '#0077B6' }}>
      <Navbar.Brand className="text-light ms-4">PEDIA-TB DSS</Navbar.Brand>
      <Nav className="ms-4">
        <Nav.Link className="text-light" href="/home">
          Home
        </Nav.Link>
        <Nav.Link className="text-light" href="/addpatient">
          Add Patient
        </Nav.Link>
        <Nav.Link className="text-light" href="/allpatient">
          View Patients
        </Nav.Link>
      </Nav>
      <Nav className="ms-auto me-4">
      <Dropdown drop="down" alignLeft>
          <Dropdown.Toggle
            variant="outline-light"
            id="dropdown-basic"
            style={{minWidth:"200px"}}
          >
            <img
            src={icon}
            className="me-2"
            style={{ height: "22px" }}
          />
            {lastName}, {firstName}{/* Display the userName */}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleShow}><strong>Update Password </strong></Dropdown.Item>
            <Dropdown.Item href="/" onClick={handleLogout}><strong> Log Out </strong></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>

      <Modal show={show} onHide={handleClose} backdrop={"static"}>
      <Modal.Header style={{ color: "white", backgroundColor: "#0077B6" }}>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="mt-3 justify-content-center">
          
          

          <Row className="mb-3 justify-content-center">
            <div className="form-group col-md-12">
              <label for="inputOperatingHours">Old Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="form-control"
                name="oldPw"
                value={pwValues.oldPw}
                onChange={handlePasswordChange}
              />
                {oldPwError && (
                        <p style={{color: 'red'}}>{oldPwError}</p>  
                    )}
            </div>
          </Row>

          <Row className="mb-3 justify-content-center">
            <div className="form-group col-md-12">
              <label for="inputOperatingHours">New Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="form-control"
                name="pw"
                value={formValues.pw}
                onChange={handleChange}
              />
                             {pwError && (
                        <p style={{color: 'red'}}>{pwError}</p>  
                    )}
            </div>

           
          </Row>

            <Row className="mb-3 justify-content-center">
            <div className="form-group col-md-12">
              <label for="inputOperatingHours">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="form-control"
                name="confirmPw"
                value={pwValues.confirmPw}
                onChange={handlePasswordChange}
              />
                {confirmPwError && (
                        <p style={{color: 'red'}}>{confirmPwError}</p>  
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
          Change
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

    <Modal show={show1} onHide={handleClose1} backdrop={"static"}>
      <Modal.Header style={{ color: "white", backgroundColor: "#0077B6" }}>
        <Modal.Title> New Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Welcome to the PEDTB-DSS System. Make sure to initialize your account by changing your password.

        <form className="mt-3 justify-content-center">
          
          <Row className="mb-3 justify-content-center">
            <div className="form-group col-md-12">
              <label for="inputOperatingHours">New Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="form-control"
                name="pw"
                value={formValues.pw}
                onChange={handleChange}
              />
            </div>

          
          </Row>
          <Row className="mb-3 justify-content-center">
            <div className="form-group col-md-12">
              <label for="inputOperatingHours">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
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
          Change
        </button>

      </Modal.Footer>
    </Modal>
    </>
  );
};

export default NavBar;
