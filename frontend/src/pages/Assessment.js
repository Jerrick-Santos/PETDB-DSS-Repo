import '../index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';

const Assessment = () => {

   
  return (
    <div>
      <NavBar/>

      {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
      <Navbar expand="lg" className="mt-4 justify-content-center align-items-center">
        <Nav>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Patient Profile</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Close Contacts</button>
        <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderRadius: 0 }} type="button">Assessment</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Treatments</button>
        
        </Nav>
      </Navbar>

      
      
      
      
      {/* Shows all medical information in relation to the patient's ongoing case*/}
      
      {/* Symptoms of the Patient */}
      <Row className="mt-5 justify-content-center">
      <Col lg="3">
      <p style={{fontSize:"25px"}}> Patient Symptoms </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="4">
                <Card.Text>Symptom</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text>Symptomatic</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text>Persistence</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <Card.Text className="text-muted">Cough</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <Card.Text className="text-muted">Fever</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <Card.Text className="text-muted">Night Sweats</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="4">
                <Card.Text className="text-muted">Weight Loss</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text className="text-muted">YES</Card.Text>
              </Col>
            </Row>  
          </Card.Body>
        </Card>
      </Col>


    {/* Laboratory Tests of the Patient*/}
      <Col lg="7">
      <p style={{fontSize:"25px"}}> Laboratory Tests </p>
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
                <Card.Text className="text-muted">Xray <a href="#"> <img src={edit} style={{height:"17px"}} alt="" /> </a> </Card.Text>
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
                <Card.Text className="text-muted">MTB/RIF <a href="#"> <img src={edit} style={{height:"17px"}} alt="" /> </a> </Card.Text>
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
            <Row>
            <Col sm="2">
                <Card.Text className="text-muted">TST<a href="#"> <img src={edit} style={{height:"17px"}} alt="" /> </a> </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text><a href="#"> <u> Recommended </u> </a></Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">-</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">-</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">- </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">NO TST YET</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
            <Col sm="2">
                <Card.Text className="text-muted">IGRA <a href="#"> <img src={edit} style={{height:"17px"}} alt="" /> </a> </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text><a href="#"> <u> Recommended </u> </a></Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">-</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">-</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">-</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">NO IGRA YET</Card.Text>
              </Col>
            </Row>  
          </Card.Body>
        </Card>
      </Col>
    </Row>

      
      {/* Shows the recommended next course of action */}
      <Row className="mt-1 justify-content-center">
      <Col lg="10">
      <p style={{fontSize:"25px"}}> Evaluations </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="10">
                <Card.Text className="text-muted">1. Michael Andrews most likely has Bacteriologically Diagnosed TB.</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="10">
                <Card.Text className="text-muted">2. Treatment Regimen A is recommended.</Card.Text>
              </Col>
            </Row>
            <hr />
           
          </Card.Body>
        </Card>
      </Col>

    </Row>

   
    </div>
  );
};

export default Assessment;
