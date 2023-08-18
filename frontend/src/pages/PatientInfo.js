import '../index.css';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PatientInfo = () => {

  const { id } = useParams();
  var patientNum = id

  const [patientData, setPatientData] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/patient/${patientNum}`)
      .then((response) => {
        setPatientData(response.data[0])
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    

}, []);

console.log(patientData)



   
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
            <Link to={`/closecontacts/${patientNum}`}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
              <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
            </button>
            </Link>
            <Link to={`/assessment/${patientNum}`}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
              <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
            </button>
            </Link>
            <Link to={`/treatments/${patientNum}`}>
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
                <Card.Text className="text-muted ">{patientData.fullname}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{new Date(patientData.birthdate).toLocaleDateString()}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Sex</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.sex === 'M' ? 'Male' : 'Female'}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Nationality</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.nationality}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Initial Height</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.initial_height} meters </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Initial Weight</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.initial_bodyweight} kg</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Address 1</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.address_1}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Address 2</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.address_2}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>City</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.city}</Card.Text>
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
                <Card.Text className="text-muted">-</Card.Text>
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
                <Card.Text className="text-muted">{patientData.mother_name}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Mother's Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{new Date(patientData.m_birthdate).toLocaleDateString()}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Mother's Contact #</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.m_contactno}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Mother's Email </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.m_email}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.father_name}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{new Date(patientData.f_birthdate).toLocaleDateString()}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Contact #</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.f_contactno}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Father's Email </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.f_email}</Card.Text>
              </Col>
            </Row>
            <hr /><Row>
              <Col sm="6">
                <Card.Text>Emergency Contact Name</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.emergency_name}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact Birthdate</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{new Date(patientData.f_birthdate).toLocaleDateString()}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact #</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.e_contactno}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Emergency Contact Email </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.e_email}</Card.Text>
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
