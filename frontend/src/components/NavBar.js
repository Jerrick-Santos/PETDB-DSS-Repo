import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar style={{backgroundColor: '#0077B6'}}>
      <Navbar.Brand className="text-light ms-4">PEDIA-TB DSS</Navbar.Brand>
        <Nav className="ms-4">
          <Nav.Link className="text-light" href="#home">Home</Nav.Link>
          <Nav.Link className="text-light" href="#add-patient">Add Patient</Nav.Link>
        </Nav>
         <Nav className="ms-auto me-2">
          <Button  className="ms-auto me-2" style={{color:'#0077B6', backgroundColor: "white"}} ><strong>Log Out</strong></Button>
        </Nav>
      
    </Navbar>
  );
};

export default NavBar;
