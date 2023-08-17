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

const Assessment = () => {

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
   
  return (
    <div>
      <NavBar/>

       {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
       <Row className="justify-content-center">
          <Col lg="10">
       
          <Navbar expand="sm" className="mt-4 pb-0">
            <Nav>
              <Link to={`/patient/${patientNum}`}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white' }} type="button">
              <img src={user} className="mb-2" style={{height:"23px"}} alt="" /> Patient Profile 
            </button>
            </Link>
            <Link to={`/closecontacts/${patientNum}`}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white'}} type="button">
              <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
            </button>
            </Link>
            <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
              <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
            </button>
            <Link to={`/treatments/${patientNum}`}>
            <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white'}} type="button">
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
      <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
        <Col  lg="11">
          <Row>
            <Col> <strong> Patient Name: </strong> {patientData.fullname}</Col>
          </Row>
          <Row>
            <Col> <strong> Birthdate:  </strong> {new Date(patientData.birthdate).toLocaleDateString()}</Col>
          </Row>
        </Col>
      </Row>
      
      
      
      {/* Shows all medical information in relation to the patient's ongoing case*/}
      
      {/* Symptoms of the Patient */}
      <Row className="mt-5 justify-content-center">
  <Col lg="5">
    <p> <strong> Cardinal Symptoms</strong> </p>
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
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Fever</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Night Sweats</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Weight Loss</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>


  <Col lg="6">
    <p> <strong> TB Contact</strong> </p>
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
            <Card.Text className="text-muted">Fatigue</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Reduced Playfulness</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Decreased Activities</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Not Eating Well</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
</Row>

<Row className="mt-2 justify-content-center">
<Col lg="8">
    <p> <strong> Presumptive EPTB</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing Gibbus Deformity?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB1" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB1" value="no"/>
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing non-painful enlargment of lymph nodes?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB2" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB2" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing stiff neck?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB3" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB3" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing drowsiness?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB4" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB4" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing pleural effusion?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB5" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB5" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing pericardial effusion?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB6" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB6" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing a distended abdomen?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB7" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB7" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing a non-painful enlarged joint?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB8" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB8" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you showing signs of tuberculin hypersensitivity?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB9" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB9" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  </Col>
</Row>

<Row className="mt-2 justify-content-center">
<Col lg="8">
    <p> <strong> Other Assessments</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="8">
            <Card.Text>Are you unable to stand?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA1" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA1" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text> Do you have Diabetes?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA2" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA2" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you living with a person with HIV?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA3" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA3" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have HIV?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA4" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA4" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Does your mother have HIV?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA5" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA5" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of smoking?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA6" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA6" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of drinking?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA7" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA7" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of sexual activity?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA8" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA8" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of renal disease?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA9" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA9" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of malnutrition?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA10" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA10" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Is there a possibility of drug to drug interaction?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA11" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA11" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Body Weight</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='in kilograms' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Height</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='in feet' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Other Health Issues</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='Health Issues' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Other Medications</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='Medications' />
              </Card.Text>
          </Col>
        </Row>
        <hr />


        <Row>
          <Col sm="8">
            <Card.Text>Other Comborbidities</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='Comorbidities' />
              </Card.Text>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  </Col>
</Row>



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

    

      <hr/>
      {/* Shows the recommended next course of action */}
      <Row className="mt-5 justify-content-center">
      <Col lg="10">
      <p style={{fontSize:"25px"}}> Evaluations </p>
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
