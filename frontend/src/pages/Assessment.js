import '../index.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import axios from 'axios';
import user from '../assets/user.png';

import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import AddXrayModal from '../components/AddXrayModal';
import AddHIVTestModal from '../components/AddHIVTestModal';
import AddMTBRIFModal from '../components/AddMTBRIFModal';
import AssessmentSummaryModal from '../components/AssessmentSummaryModal';
import ShowDiagnosisModal from '../components/ShowDiagnosisModal';
import XrayRecomModal from '../components/XrayRecomModal';
import AssessmentFormNew from '../components/AssessmentPersistence';
import AssessmentFormOld from '../components/AssessmentNoPersistence';

const Assessment = () => {

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
          <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
          </button>
          <Link to={`/labtest/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          </Link>
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
      
      
      <Row className="justify-content-center" >
        <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      {/*Shows general patient information details */}

      
      
      
     {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
      <AssessmentFormNew/>
      <AssessmentFormOld/>


    

    

      <hr/>
      {/* Shows the recommended next course of action */}
      <Row className="mt-5 justify-content-center">
      <Col lg="10">
      <p style={{fontSize:"25px"}}> Diagnosis </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="2">
                <Card.Text>  Diagnosis Date</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text> Health Assessment </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text> Diagnostic Test </Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text> Diagnosis </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
            <Col sm="2">
                <Card.Text>  12/31/2023</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text > Cardinal Symptoms - POSITIVE <br/> Xray - With Signs of Pedia TB </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text> Xray - With Signs of Pedia TB <br/> </Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text>
                <Row className="mt-2">
                    <Col><strong> Diagnosis: </strong>  Presumptive TB</Col>
                </Row>

                <Row className="mt-4">
                    <Col>The following tests are needed for further evaluation:</Col>
                </Row>

                <Row className="mt-4">
                    <Col><XrayRecomModal/> </Col>
                </Row>

                <Row className="mt-4">
                    <Col> Please advice patient and parent to avoid close contact to contain the spread of TB.</Col>
                </Row>

                </Card.Text>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm="2" >
               
              
              <AssessmentSummaryModal/>
         
              </Col>
            </Row>
           
          </Card.Body>
        </Card>
        
      </Col>

    </Row>
      </Col>
    </Row>

    </div>
  );
};

export default Assessment;
