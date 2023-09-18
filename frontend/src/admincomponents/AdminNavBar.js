import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <Navbar style={{backgroundColor: '#0077B6'}}>
      <Navbar.Brand className="text-light ms-4">PEDIA-TB DSS</Navbar.Brand>
        <Nav className="ms-4">
       
        <Nav.Link className="text-light" href="/bhc/1">Barangay Health Center</Nav.Link>
        <Nav.Link className="text-light" href="/bhw/1">Barangay Users</Nav.Link>
        <Nav.Link className="text-light" href="/adminhi">Health Institutions</Nav.Link>
          <Nav.Link className="text-light" href="/adminlabtest">Diagnostic Tests</Nav.Link>
          
          
        </Nav>
         <Nav className="ms-auto me-2">
          <Link to={"/"}><Button  className="ms-auto me-2" style={{color:'#0077B6', backgroundColor: "white"}} ><strong>Log Out</strong></Button></Link>
        </Nav>
      
    </Navbar>
  );
};

export default AdminNavBar;
