import '../index.css';
import React from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link } from 'react-router-dom';


const PatientInfo = () => {

   
  return (

    <div>
      <NavBar/>

       {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
       <Row className="justify-content-center">
          <Col lg="10">
       
          <Navbar expand="sm" className="mt-4 pb-0">
            <Nav>
            <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"  }} type="button">
              <img src={user} className="mb-2" style={{height:"23px"}} alt="" /> Patient Profile 
            </button>
            <Link to={"/closecontacts"}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
              <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
            </button>
            </Link>
            <Link to={"/assessment"}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
              <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
            </button>
            </Link>
            <Link to={"/treatments"}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
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

        <Row className="mt-5 justify-content-center">
      <Col lg="5">
      <p style={{fontSize:"25px"}}> Personal Information </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text>Full Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted ">Jose Matthew Chan</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">12/31/2023</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Sex</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Male</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Nationality</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Filipino</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Height</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">3.4 ft. </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Weight</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">35 kg</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Address 1</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">21 Sta. Monica Street</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Address 2</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">District 4, Brgy. 423A</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>City</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Polilo City</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <p style={{fontSize:"25px"}}> Patient Record</p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text>Patient ID</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">B345-6789</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>LatentTB ID</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">-</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>PresumptiveTB ID</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">-</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

     

      <Col lg="6">
      
    




      <Col>
      <p style={{fontSize:"25px"}}> Contact Details </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text>Mother's Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Mother's Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Mother's Contact #</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Mother's Email </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Contact #</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Email </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr /><Row>
              <Col sm="6">
                <Card.Text>Emergency Contact Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact #</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact Email </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
              </Col>
            </Row>
            <hr />
          </Card.Body>
        </Card>
      </Col>
      
      </Col>
    </Row>



      </Col>
    </Row>

    </div>
    
  );
};

export default PatientInfo;
