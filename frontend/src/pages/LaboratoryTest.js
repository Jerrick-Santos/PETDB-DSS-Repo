import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import add from '../assets/add.png';
import { Link, useParams } from 'react-router-dom';
import AddCloseContactModal from '../components/AddCloseContactModal';
import axios from 'axios';
import AddXrayModal from '../components/AddXrayModal';
import AddHIVTestModal from '../components/AddHIVTestModal';
import AddMTBRIFModal from '../components/AddMTBRIFModal';
import AssessmentSummaryModal from '../components/AssessmentSummaryModal';
import ShowDiagnosisModal from '../components/ShowDiagnosisModal';


const LaboratoryTest = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();
  var caseNum = id

  return (
    <div>
    <NavBar/>

     {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
     <Row className="justify-content-center">
        <Col lg="10">
     
        <Navbar expand="sm" className="mt-4 pb-0">
          <Nav>
          <Link to={`/closecontacts/${caseNum}`}>
          <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
          </button>
          </Link>
          <Link to={`/assessment/${caseNum}`}>
          <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
          </button>
          </Link>
          <button className="btn ms-1 " style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          <Link to={`/diagnosis/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <Link to={`/treatments/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
          </button>
          </Link>
          
          </Nav>
        
        </Navbar>
       
      </Col>
    </Row>
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
    <Row className="justify-content-center" >
      <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>

      <Row className="mb-5 mt-2 justify-content-center">
      <Col lg="8">
      <p> <strong> Laboratory Tests Needed </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="2">
                <Card.Text>Lab Test</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Result</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="2">
                <Card.Text className="text-muted">HIV Test<AddHIVTestModal/> </Card.Text>
              </Col>
              <Col sm="2">
              <Card.Text className="text-muted"> DLSHSI </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">12/31/2023</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">XR9880-567</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">VALID </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">+1</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="2">
                <Card.Text className="text-muted">Xray <AddXrayModal/> </Card.Text>
              </Col>
              <Col sm="2">
              <Card.Text className="text-muted"> DLSHSI </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">12/31/2023</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">XR9880-567</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">VALID </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">+1</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
            <Col sm="2">
                <Card.Text className="text-muted">MTB/RIF <AddMTBRIFModal/> </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted"> DLSHSI </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">12/31/2023</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">MT9880-567</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">VALID </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">+1</Card.Text>
              </Col>
            </Row>
            <hr />
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-end">
              <ShowDiagnosisModal/>
          </div>
      </Col>
    

    </Row>



    </Col>
  </Row>

  </div>
  
    

       
  );
};

export default LaboratoryTest;
