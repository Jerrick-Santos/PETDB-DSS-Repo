import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import AddBHCModal from '../admincomponents/CreateBHCModal';
import CreateHIModal from '../admincomponents/CreateHIModal';
import CreateDiagnosticTest from '../admincomponents/CreateDiagnosticTest';
import { Link, useParams } from 'react-router-dom';




const AdminLabTest = () => {

  

  return (
    <div>
    <AdminNavBar/>
    <Row className="mt-5 justify-content-center" >
        <Col lg="11" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
      
         {/* Shows the recommended next course of action */}
    <Row className="mt-5 justify-content-center">
      <Col lg="11">
      <h1 style={{fontSize:"35px"}}> Diagnostic Tests </h1>
        <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="2">
                <Card.Text><strong>Test</strong> </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text><strong>Validity</strong> </Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text><strong>Test Description</strong> </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="2">
                <Card.Text>Mark Andrew Health Institutions</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>41 B K1st Street Kamuning Quezon City</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Everyday 7:00 AM to 8:00 PM</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>63-916-518-9958 </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>markandrew@healthcenter.edu.ph </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
           
        <Row className="d-flex justify-content-end mb-4" >
          <Col className="d-flex justify-content-end">
            <CreateDiagnosticTest/>
          </Col>
        </Row>
        
        
      </Col>
     
    </Row>
      
      </Col>
    </Row>
    </div>
  );
};

export default AdminLabTest;
