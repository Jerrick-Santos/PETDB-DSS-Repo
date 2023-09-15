import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');
  };

  return (
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
      <Nav className="ms-auto me-2">
        <Link to={"/"}>
          <Button
            className="ms-auto me-2"
            style={{ color: '#0077B6', backgroundColor: 'white' }}
            onClick={handleLogout} // Add onClick to call handleLogout when the button is clicked
          >
            <strong>Log Out</strong>
          </Button>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
