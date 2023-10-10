import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col, ButtonGroup } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CaseHeader from '../components/CaseHeader'
import Spinner from "react-bootstrap/Spinner";
import noresult from "../assets/noresult.png";
import test from "../assets/test.png";
import diagnose from "../assets/diagnose.png";
import similar from "../assets/similar.png";

const SimilarCases = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();

  var caseNum = id

  const [casesData, setCasesData] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/patientassessment/${caseNum}`)
    .then((response) => {
      
      if(response.data.length>0){

      axios.get(`http://localhost:4000/api/getsimcases2/${caseNum}`)
      .then(response => {
        setCasesData(response.data);
        setIsLoading(false)
        setHasAssessment(true)
        
      })
      .catch(error => {
        console.error('Error fetching Sim Cases:', error);
      });
       } else {
        setIsLoading(false)
       }

      
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetching data:', error);
    });

    axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
      .then(res => {
        console.log(res);
        setCaseData(res.data[0]);
      })
      .catch(err => {
        console.error(err);
      })

    
  }, []);
  
 
  
  console.log(casesData)
  
  // Make sure to check if casesData is available before using it
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
          <Link to={`/labtest/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={test} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          </Link>
          <Link to={`/diagnosis/${caseNum}`}> 
          <button className="btn ms-1 " style={{color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={diagnose} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <Link to={`/treatments/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatment History
          </button>
          </Link>
          <button className="btn ms-1 " style={{  color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={similar} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
      
          
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
                <>
     <CaseHeader caseNo={caseNum} case_refno={caseData.case_refno} PatientNo={caseData.PatientNo} patient_name={caseData.patient_name}
                  start_date={caseData.start_date} end_date={caseData.end_date} case_status={caseData.case_status}
                  PRESref={caseData.PRESref} LATENTref={caseData.LATENTref}/>
     
    <hr/>
      
    <Row className="mb-3">
      <Col className="text-center">
      <h2> Diagnosis Likelihood (Similar Cases) </h2>
      </Col>
    </Row>
    

 
     <Row className="mt-5 justify-content-center">
     

     <Col lg="11">

     {hasAssessment ? (
   <Card className="mb-4">
   <Card.Body>
   <Row>
       <Col sm="7">
         <Card.Text> <strong>Diagnosis </strong></Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>Percentage Likelihood </strong></Card.Text>
       </Col>
     </Row>
     <hr/>
    
     <Row>
     <Col sm="7">
         <Card.Text className="text-muted "> Bacteriologically Confirmed - Multi Drug Resistant</Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>{parseFloat(casesData.bd_multires).toFixed(2)}% </strong></Card.Text>
       </Col>
     </Row>
     <hr/> 
     <Row>
       <Col sm="7">
         <Card.Text className="text-muted "> Bacteriologically Confirmed - Drug Resistant</Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>{parseFloat(casesData.bd_res).toFixed(2)}% </strong></Card.Text>
       </Col>
     </Row>
     <hr/> 
     <Row>
       <Col sm="7">
         <Card.Text className="text-muted "> Bacteriologically Confirmed - Drug Sensitive</Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>{parseFloat(casesData.bd_nonres).toFixed(2)}%  </strong></Card.Text>
       </Col>
     </Row>
     <hr/> 
     <Row>
       <Col sm="7">
         <Card.Text className="text-muted "> Clinically Diagnosed</Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>{parseFloat(casesData.clinical_diag).toFixed(2)}%  </strong></Card.Text>
       </Col>
     </Row>
    <hr/> 
     <Row>
       <Col sm="7">
         <Card.Text className="text-muted "> No Tuberculosis</Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>{parseFloat(casesData.no_tb).toFixed(2)}%  </strong></Card.Text>
       </Col>
     </Row>
   
     
   </Card.Body>

   <Card.Body>
   <Row>
       <Col sm="7">
         <Card.Text> <strong>PTB/EPTB </strong></Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>Percentage Likelihood </strong></Card.Text>
       </Col>
     </Row>
     <hr/>
    
     <Row>
     <Col sm="7">
         <Card.Text className="text-muted "> Pulmonary Tuberculosis (PTB)</Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>{parseFloat(casesData.ptb).toFixed(2)}% </strong></Card.Text>
       </Col>
     </Row>
     <hr/> 
     <Row>
       <Col sm="7">
         <Card.Text className="text-muted "> Extrapulmonary Tuberculosis (PTB)</Card.Text>
       </Col>
       <Col sm="5">
         <Card.Text> <strong>{parseFloat(casesData.eptb).toFixed(2)}% </strong></Card.Text>
       </Col>
     </Row>
     <hr/> 
     
   </Card.Body>
   
 </Card>
 ) : (
                    <Card className="mb-4 text-center">
                      <Row className="mt-4 justify-content-center">
                        <Col>
                          <img
                            src={noresult}
                            alt="No Results"
                            style={{ width: "120px", height: "120px" }}
                          />
                        </Col>
                      </Row>

                      <Card.Body>
                        <h1 style={{ fontSize: "20px", color: "#808080" }}>
                          {" "}
                          Insufficient Data for Diagnosis Likelihood{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}



     </Col>
    
     
   </Row>

   
   </>
              )}



    </Col>
  </Row>

   
  </div>
  
    

       
  );
};

export default SimilarCases;
