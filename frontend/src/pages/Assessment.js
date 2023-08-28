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
import AddHIVTestModal from '../components/AddTSTModal';
import AddMTBRIFModal from '../components/AddMTBRIFModal';
import AssessmentSummaryModal from '../components/AssessmentSummaryModal';
import ShowDiagnosisModal from '../components/ShowDiagnosisModal';
import XrayRecomModal from '../components/XrayRecomModal';
import AssessmentFormNew from '../components/AssessmentPersistence';
import AssessmentNoPersistence from '../components/AssessmentNoPersistence';
import AssessmentPersistence from '../components/AssessmentPersistence';
import AddAssessPersist from '../components/AddAssessPersist';
import AddAssessNoPersist from '../components/AddAssessNoPersist';
import CaseHeader from '../components/CaseHeader';

const Assessment = () => {

  const { id } = useParams();
  var caseNum = id
  
  const [patientData, setPatientData] = useState([]);
  const [assessData, setAssessData] = useState([]);
  useEffect(() => {

    axios.get(`http://localhost:4000/api/patientassessment/${caseNum}`)
      .then((response) => {
        setAssessData(response.data)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    }, []);
    console.log(typeof assessData)

    useEffect(() => {
      axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
      .then(res => {
        console.log(res);
        setPatientData(res.data[0]);
      })
      .catch(err => {
        console.error(err);
      })
    }, [caseNum])
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
          <Link to={`/similarcases/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
          </Link>
            
            </Nav>
          
          </Navbar>
         
        </Col>
      </Row>
      
      
      <Row className="justify-content-center" >
        <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      {/*Shows general patient information details */}
      <CaseHeader caseNum={caseNum} />
     {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
     {assessData.length > 0 ? (
      <Row className="d-flex justify-content-center mt-4 mb-4" >
      <Col className="d-flex justify-content-center">
      <AddAssessPersist
          caseNo={caseNum}
      />
      </Col>
    </Row>
     ) : (
      <Row className="d-flex justify-content-center mt-4 mb-4" >
          <Col className="d-flex justify-content-center">
          <AddAssessNoPersist
              caseNo={caseNum}
          />
          </Col>
        </Row>
     )}
     

      

      <hr/>
      <Row className="mb-5 mt-2 justify-content-center">
      <Col lg="8">
      <p> <strong> Assessment Record </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text>Date of Assessment</Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text>Assessed by</Card.Text>
              </Col>

            </Row>
        
            
            {assessData.map((assessment, index) => (
              <>
               <hr />
               <Row>
               <Col sm="6">
                <Card.Text><AssessmentSummaryModal caseNo={caseNum} date={assessment.assessment_date} /></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text></Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          


          
          </Card.Body>
        </Card>
      </Col>
    </Row>

      {/* Shows the recommended next course of action */}
      
      </Col>
    </Row>

    </div>
  );
};

export default Assessment;
