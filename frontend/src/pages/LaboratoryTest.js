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
import AddHIVTestModal from '../components/AddTSTModal';
import AddMTBRIFModal from '../components/AddMTBRIFModal';
import AssessmentSummaryModal from '../components/AssessmentSummaryModal';
import ShowDiagnosisModal from '../components/ShowDiagnosisModal';
import AddTSTModal from '../components/AddTSTModal';


const LaboratoryTest = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();
  var caseNum = id
  const [patientData, setPatientData] = useState([]);
  const [xrayData, setXrayData] = useState([]);
  const [tstData, setTstData] = useState([]);
  const [mtbData, setMtbData] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
    .then(res => {
      console.log(res);
      setPatientData(res.data[0]);
    })
    .catch(err => {
      console.error(err);
    })


    axios.get(`http://localhost:4000/api/testresults/${caseNum}/1`)
    .then((response) => {
      setXrayData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });

    axios.get(`http://localhost:4000/api/testresults/${caseNum}/2`)
    .then((response) => {
      setMtbData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });

    axios.get(`http://localhost:4000/api/testresults/${caseNum}/3`)
    .then((response) => {
      setTstData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });
  }, [])

  
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
      <AddTSTModal
        caseNum={caseNum}
      />
      <AddMTBRIFModal
      caseNum={caseNum}
      />
      <AddXrayModal
      caseNum={caseNum}
      />      <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
        <Col className="ms-5" lg="12">
          <Row>
            <Col><strong>Case No: {patientData.case_refno}</strong></Col>
          </Row>
          <Row>
            <Col> <strong> Patient Name: {patientData.patient_name}</strong> </Col>
          </Row>
          <Row>
            <Col> <strong> Birthdate: {new Date(patientData.patient_birthdate).toLocaleDateString()} {}</strong> </Col>
          </Row>
        </Col>
      </Row>

      <hr/>
      <Row className="mb-5 mt-2 justify-content-center">
      <Col lg="8">
      <p> <strong> XRay Tests </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="3">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>Result</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
            </Row>
        
            
            {xrayData.map((xray, index) => (
              <>
               <hr />
               <Row>
              <Col sm="3">
              <Card.Text className="text-muted"> {xray.HIName} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{xray.issue_date} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{new Date(xray.issue_date).toLocaleDateString()} </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text className="text-muted">{xray.TestValue}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{xray.validity === 1 ? "VALID" : "OUTDATED"}   </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          


          
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <hr/>
      <Row className="mb-5 mt-2 justify-content-center">
      <Col lg="8">
      <p> <strong> MTB/RIF Tests </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
            <Col sm="3">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>Result</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
            </Row>
            {mtbData.map((mtb, index) => (
              <>
               <hr />
               <Row>
              <Col sm="3">
              <Card.Text className="text-muted"> {mtb.HIName} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{mtb.issue_date} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{new Date(mtb.issue_date).toLocaleDateString()} </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text className="text-muted">{mtb.TestValue}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{mtb.validity === 1 ? "VALID" : "OUTDATED"}   </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          </Card.Body>
        </Card>
       
      </Col>
    

    </Row>

    <hr/>
      <Row className="mb-5 mt-2 justify-content-center">
      <Col lg="8">
      <p> <strong> TST Tests </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
            <Col sm="3">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>Result</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
            </Row>
            {tstData.map((tst, index) => (
              <>
               <hr />
               <Row>
              <Col sm="3">
              <Card.Text className="text-muted"> {tst.HIName} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{tst.issue_date} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{new Date(tst.issue_date).toLocaleDateString()} </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text className="text-muted">{tst.TestValue}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{tst.validity === 1 ? "VALID" : "OUTDATED"}   </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          </Card.Body>
        </Card>
       
      </Col>
    

    </Row>





    </Col>
  </Row>

  </div>
  
    

       
  );
};

export default LaboratoryTest;
