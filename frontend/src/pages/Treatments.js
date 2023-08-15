import '../index.css';
import React from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';

const Treatments = () => {

   
  return (
    <div>
      <NavBar/>

      {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
      <Navbar expand="lg" className="mt-4 justify-content-center align-items-center">
        <Nav>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Patient Profile</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Close Contacts</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Assessment</button>
        <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderRadius: 0 }} type="button">Treatments</button>
        
        </Nav>
      </Navbar>

      
      
      
      
      {/* Treatments*/}
      
      {/* Symptoms of the Patient */}
      <Row className="mt-5 justify-content-center">
     

    {/* Laboratory Tests of the Patient*/}
      <Col lg="7">
      <p style={{fontSize:"25px"}}> Treatments </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="2">
                <Card.Text>Medicine</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Dosage</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Frequency</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Length</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text>Availability in the Health Center</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
            <Col sm="2">
                <Card.Text className="text-muted">Neozep</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">500 mg</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">3x a day</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">6 months</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">Available</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
            <Col sm="2">
                <Card.Text className="text-muted">Biogesic</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">250 mg</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">6x a day</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">6 months</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">Available</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
            <Col sm="2">
                <Card.Text>Remarks</Card.Text>
              </Col>
              <Col sm="8">
                <Card.Text>Take Neozep after every meal and Biogesic during the full moon.</Card.Text>
              </Col>
            </Row>
          </Card.Body>
          
        </Card>
        <button className="btn ms-1" style={{color: "white", backgroundColor: '#0077B6'}} type="button"> Treatment Accomplished </button>
      </Col>
    </Row>

      

   
    </div>
  );
};

export default Treatments;
