import '../index.css';
import React from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const PatientInfo = () => {

   
  return (
    <div>
      <NavBar/>

      {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
      <Navbar expand="lg" className="mt-4 justify-content-center align-items-center">
        <Nav>
        <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderRadius: 0 }} type="button">Patient Profile</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Close Contacts</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Assessment</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Treatments</button>
        </Nav>
      </Navbar>

      
      
      
      
      {/* Shows all relevant information of the patient */}
      
      {/* Personal Information of the Patient */}
      <Row className="mt-5 justify-content-center">
      <Col lg="6">
      <p style={{fontSize:"25px"}}> Personal Information </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text>Full Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted ">Miguel Josh C. Perez</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Nickname</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">example@example.com</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">(067) 264-5678</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Sex</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">(068) 765-4621</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Place of Birth</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Occupation</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Civil Status</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Nationality</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Email Address</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Social Media</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Height</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Weight</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Address</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Zip Code</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>

     {/* Patient Record of the Patient */}
    <Row className="mt-5 justify-content-center">
    <Col lg="6">
      <p style={{fontSize:"25px"}}> Patient Record</p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text>Patient ID</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>LatentTB ID</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>PresumptiveTB ID</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    {/* Contact Numbers of the Patient */}
    <Row className="mt-5 justify-content-center">
    <Col lg="6">
      <p style={{fontSize:"25px"}}> Contact Numbers </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text>Primary Contact Number</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Primary Contact Number Owner</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Secondary Contact Number</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Secondary Contact Number Owner</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact - Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact - Contact Number</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact - Relationship </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>



    </div>
  );
};

export default PatientInfo;
