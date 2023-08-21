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
import AssessmentNoPersistence from '../components/AssessmentNoPersistence';
import AssessmentPersistence from '../components/AssessmentPersistence';

const Assessment = () => {

  const { id } = useParams();
  var caseNum = id
  
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
     {assessData.length > 0 ? (
      <AssessmentPersistence/>
     ) : (
      <AssessmentNoPersistence/>
     )}

      <hr/>

      <table className="table caption-top bg-white rounded mt-2 ms-1">
    <caption className=' fs-4'>Assessment Records</caption>
    <thead>
                    <tr>
                        <th scope="col">Assessment Date</th>
                        <th scope="col">Cough</th>    
                        <th scope="col">Fever</th>
                        <th scope="col">Weight Loss</th>
                        <th scope="col">Night Sweats</th>
                    </tr>
                </thead>
                <tbody>
                    {assessData.map((assessment, index) => (
                    <tr key={index}>
                        <td>
                        <Link to={`/patient/${assessment.CaseNo}`}>
                            <p style={{ color: 'black' }}>
                            <u>{new Date(assessment.assessment_date).toLocaleDateString()}</u>
                            </p>
                        </Link>
                        </td>
                        <td>{assessment.cough}</td>
                        <td>{assessment.fever}</td>
                        <td>{assessment.weight_loss}</td>
                        <td>{assessment.night_sweats}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

      {/* Shows the recommended next course of action */}
      
      </Col>
    </Row>

    </div>
  );
};

export default Assessment;
