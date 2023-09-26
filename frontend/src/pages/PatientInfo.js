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
import Spinner from "react-bootstrap/Spinner";

const PatientInfo = () => {

  const { id } = useParams();
  var patientNum = id
  const [isLoading, setIsLoading] = useState(true);
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/patient/${patientNum}`)
      .then((response) => {
        setPatientData(response.data[0])
        setIsLoading(false)
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
            <Link to={`/case/${patientNum}`}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
              <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Cases
            </button>
            </Link>
            
            
            </Nav>
          
          </Navbar>
         
        </Col>
      </Row>
      
      {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
      <Row className="justify-content-center" >
        <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>

        {isLoading ? (
                <div
                  className="text-center"
                  style={{ marginTop: "10vh", marginBottom: "10vh" }}
                >
                  <Spinner
                    animation="border"
                    variant="primary"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginTop: "1rem",
                      color: "#0077B6",
                    }}
                  >
                    Loading...
                  </p>
                </div>
              ) : (
               

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
                <Card.Text className="text-muted">{patientData.initial_height} CM </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Initial Weight</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.initial_bodyweight} KG </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Current Address</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.curr_address}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text>Permanent Address</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{patientData.per_address}</Card.Text>
              </Col>
            </Row>
            
          </Card.Body>
        </Card>

        
      </Col>

     

      <Col lg="6">
      
    




      <Col>
  <p style={{ fontSize: "25px" }}> Contact Details </p>
  <Card className="mb-4">
    <Card.Body>
      {patientData.guardian_name !== "N/A" && (
        <>
          <Row>
            <Col sm="6">
              <Card.Text>Guardian's Name</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.guardian_name}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Guardian's Birthdate</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {new Date(patientData.g_birthdate).toLocaleDateString()}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Guardian's Contact #</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.g_contactno}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Guardian's Email</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.g_email}
              </Card.Text>
            </Col>
          </Row>
          <hr />
        </>
      )}

      {patientData.mother_name !== "N/A" && (
        <>
          <Row>
            <Col sm="6">
              <Card.Text>Mother's Name</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.mother_name}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Mother's Birthdate</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {new Date(patientData.m_birthdate).toLocaleDateString()}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Mother's Contact #</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.m_contactno}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Mother's Email</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.m_email}
              </Card.Text>
            </Col>
          </Row>
          <hr />
        </>
      )}

      {patientData.father_name !== "N/A" && (
        <>
          <Row>
            <Col sm="6">
              <Card.Text>Father's Name</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.father_name}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Father's Birthdate</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {new Date(patientData.f_birthdate).toLocaleDateString()}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Father's Contact #</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.f_contactno}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Father's Email</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.f_email}
              </Card.Text>
            </Col>
          </Row>
          <hr />
        </>
      )}

      {patientData.emergency_name !== "N/A" && (
        <>
          <Row>
            <Col sm="6">
              <Card.Text>Emergency Contact Name</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.emergency_name}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Emergency Contact Birthdate</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {new Date(patientData.e_birthdate).toLocaleDateString()}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Emergency Contact #</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.e_contactno}
              </Card.Text>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="6">
              <Card.Text>Emergency Contact Email</Card.Text>
            </Col>
            <Col sm="6">
              <Card.Text className="text-muted">
                {patientData.e_email}
              </Card.Text>
            </Col>
          </Row>
        </>
      )}
    </Card.Body>
  </Card>
</Col>

      
      </Col>
    </Row>
              )}


      </Col>
    </Row>

    </div>
    
  );
};

export default PatientInfo;
