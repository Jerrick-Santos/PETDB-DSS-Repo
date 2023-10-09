import React, { useState, useEffect,PureComponent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import icon from "../assets/icon.png";
import view from "../assets/view.png";
import { Navbar, Nav, Card, Row, Col, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";


const AdminNavBar = () => {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');
  };
  const [show, setShow] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userNum, setUserNum] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [BGYNo, setBGYNo] = useState(null);

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
        setBGYNo(response.data.BGYNo);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const [formValues, setFormValues] = useState({
    pw: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/updatepw/${userNum}`, formValues);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <>
    <Navbar style={{backgroundColor: '#0077B6'}}>
      <Navbar.Brand className="text-light ms-4">PEDIA-TB DSS</Navbar.Brand>
        <Nav className="ms-4">
       
        <Nav.Link className="text-light" href={`/bhc/${BGYNo}`}>Barangay Health Center</Nav.Link>
        <Nav.Link className="text-light" href={`/bhw/${BGYNo}`}>Barangay Users</Nav.Link>
        <Nav.Link className="text-light" href="/adminhi">Health Institutions</Nav.Link>
          <Nav.Link className="text-light" href="/adminlabtest">Diagnostic Tests</Nav.Link>
          
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
              <label for="inputOperatingHours">New Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="form-control"
                name="pw"
                value={formValues.pw}
                onChange={handleChange}
              />
            </div>

            {/* Button to toggle password visibility */}
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={togglePasswordVisibility}
              >
                  <img
            src={view}
            style={{ height: "20px" }}
          />
              </button>
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
};

export default AdminNavBar;
