import '../index.css';
import React from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';

const Treatments = () => {

   
  return (
    <div>
    <NavBar/>

     {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
     <Row className="justify-content-center">
        <Col lg="10">
     
        <Navbar expand="sm" className="mt-4 pb-0">
          <Nav>
          <button className="btn ms-1" style={{color: "#03045E", backgroundColor: 'white' , borderBottomLeftRadius: "0", borderBottomRightRadius: "0"  }} type="button">
            <img src={user} className="mb-2" style={{height:"23px"}} alt="" /> Patient Profile 
          </button>
          <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
          </button>
          <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
          </button>
          <button className="btn ms-1 " style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
          </button>
          
          </Nav>
        
        </Navbar>
       
      </Col>
    </Row>
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
    <Row className="justify-content-center" >
      <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>

      {/*Shows general patient information details */}
      
      <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
        <Col className="ms-5" lg="12">
          <Row>
            <Col> <strong> Patient Name: </strong> Miguel Josh C. Perez</Col>
          </Row>
          <Row>
            <Col> <strong> Birthdate:  </strong>12/31/2023</Col>
          </Row>
          <Row>
            <Col> <strong>Patient ID:</strong> 0305667</Col>
          </Row>
        </Col>
      </Row>
      
      
      
      {/* Treatments*/}
      
      {/* Symptoms of the Patient */}
      <Row className="mt-5 justify-content-center">
     

    {/* Laboratory Tests of the Patient*/}
      <Col lg="11">
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
        <button className="btn ms-1 mb-5" style={{color: "white", backgroundColor: '#0077B6'}} type="button"> Treatment Accomplished </button>
      </Col>
    </Row>


    </Col>
  </Row>

  </div>
    
  );
};

export default Treatments;
