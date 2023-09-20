import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col,ListGroup } from 'react-bootstrap';
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
import Button from 'react-bootstrap/Button';
import PresumptiveTBModal from '../components/PresumptiveTBModal';
import ViewMapRecomModal from '../components/ViewMapRecomModal';
import LatentTBModal from '../components/LatentTBModal';
import CaseHeader from '../components/CaseHeader'
import Badge from 'react-bootstrap/Badge';
import Pagination from 'react-bootstrap/Pagination';
import MapHIVRecom from '../components/MapHIVRecom';
import MapXrayRecom from '../components/MapXrayRecom';
import MapMTBRecom from '../components/MapMTBRecom';
import MapTSTRecom from '../components/MapTSTRecom';
import MapIGRARecom from '../components/MapIGRARecom';


const Diagnosis = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();

  const [diagnosisData, setdiagnosisData] = useState([]);
  const [presumptiveData, setPresumptiveData] = useState();
  const [showPresumptiveModal, setShowPresumptiveModal] = useState(false);
  const [showLatentModal, setShowLatentModal] = useState(false);
  const [latentData, setLatentData] = useState();
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const [patientData, setPatientData] = useState([]);
  const [reload, setReload] = useState(false);

      // Add these state variables
const [activePage, setActivePage] = useState(1); // Active page number
const itemsPerPage = 1; // Number of items per page

// Function to handle page change
const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
};

// Calculate the index range for the current page
const startIndex = (activePage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

  const handleButtonClick = async () => {
    setIsLoading(true);
  
    try {
      // SET DIAGNOSIS

      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage.');
        return;
      }

      // Define headers with the JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      console.log(headers)

      const diagnoseResponse = await axios.post(`http://localhost:4000/api/diagnose/${id}`, {}, { headers });
      console.log(diagnoseResponse.data);
  
      // GET LATEST DIAGNOSIS
      const diagnosisResponse = await axios.get(`http://localhost:4000/api/getlatestdiagnostic/${id}`);
      console.log(diagnosisResponse.data);
  
      const { latent_tb, presumptive_tb } = diagnosisResponse.data;
      setLatentData(latent_tb);
      setPresumptiveData(presumptive_tb);
  
      // DIAGNOSE = PRESUMPTIVE
      if (presumptive_tb === 1 && latent_tb === -1) {
        const presumptiveIncaseResponse = await axios.get(`http://localhost:4000/api/getpresumptiveincase/${id}`);
        console.log(presumptiveIncaseResponse.data);
  
        if (presumptiveIncaseResponse.data.length === 0) {
          console.log("Please Insert Presumptive ID");
          setShowPresumptiveModal(true);
        } else {
          console.log("Presumptive ID detected");
          setShowPresumptiveModal(false);
        }
      }
      // DIAGNOSE = LATENT
      else if (presumptive_tb === -1 && latent_tb === 1) {
        const latentIncaseResponse = await axios.get(`http://localhost:4000/api/getlatentincase/${id}`);
        console.log(latentIncaseResponse.data);
  
        if (latentIncaseResponse.data.length === 0) {
          console.log("Please Insert Latent ID");
          setShowLatentModal(true);
        } else {
          console.log("Latent ID detected");
          setShowLatentModal(false);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setReload(!reload);
      setActivePage(1);
    }
  };
  
  useEffect(() => {
    axios.get(`http://localhost:4000/api/getalldiagnosis/${id}`)
      .then(response => {
        setdiagnosisData(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, [reload]);

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

  var caseNum = id

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
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          </Link>
          <button className="btn ms-1 " style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
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
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
    <Row className="justify-content-center" >
      <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      <CaseHeader caseNum={caseNum} />
          <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
            <Col lg="11">
              
            </Col>

            <Col lg="11" className="d-flex justify-content-center">
              <button
                className="btn mt-4"
                style={{ color: "white", backgroundColor: '#0077B6', minWidth: '300px' }}
                type="button"
                onClick={handleButtonClick}
                disabled={isLoading || patientData.case_status === 'C'}
              >
                Diagnose TB Status
              </button>
              
            </Col>

           
            
            <Col className="mb-4" lg="11">

            {diagnosisData.slice(startIndex, endIndex).map((diagnosis, index) => (
              <>
              <hr/>
                <Row>
                <Col lg="2"> 
                  <Badge bg="secondary"> Date Diagnosed: </Badge> 
                </Col>
                <Col lg="2"> 
                   <strong> {new Date(diagnosis.DGDate).toLocaleDateString()}</strong>
                </Col>
              </Row>

              <Row>
                <Col lg="2"> 
                  <Badge bg="secondary"> TB Status: </Badge> 
                </Col>
                <Col lg="8"> 
                
                        {diagnosis.confirmed_tb === 1 ? "Confirmed" :
                        diagnosis.presumptive_tb === 1 ? "Presumptive" :
                        diagnosis.latent_tb === 1 ? "Latent" :
                        diagnosis.no_tb === 1 ? "NO TB":
                        "None"} 
                </Col>
              </Row>

              <Row>
                <Col lg="2"> 
                  <Badge bg="secondary"> Diagnosis: </Badge> 
                </Col>
                <Col lg="8"> 
                  <strong>
                    
                  {(diagnosis.diagnosis.includes("Resistant") && diagnosis.EPTBpositive === 1 ) ? "ExtraPulmonary Bacteriologically Confirmed - Drug Resistant TB" :
                (diagnosis.diagnosis.includes("Resistant") && diagnosis.EPTBpositive === -1 ) ? "Pulmonary Bacteriologically Confirmed - Drug Resistant TB" :
                (diagnosis.diagnosis.includes("Sensitive") && diagnosis.EPTBpositive === 1 ) ? "ExtraPulmonary Bacteriologically Confirmed - Drug Sensitive TB" :
                (diagnosis.diagnosis.includes("Sensitive") && diagnosis.EPTBpositive === -1 ) ? "Pulmonary Bacteriologically Confirmed - Drug Sensitive TB" :
                (diagnosis.diagnosis.includes("Clinical") && diagnosis.EPTBpositive === 1 ) ? "ExtraPulmonary Clinically Diagnosed TB" :
                (diagnosis.diagnosis.includes("Clinical") && diagnosis.EPTBpositive === -1 ) ? "Pulmonary Clinically Diagnosed TB" :  
                diagnosis.diagnosis.includes("Presumptive") ? "Presumptive Tuberculosis" : 
                diagnosis.diagnosis.includes("Latent") ? "Latent Tuberculosis" : 
                        "NONE"} </strong>
                </Col>
              </Row>

        <Row className="mt-4">

       
            <Col style={{fontSize:"18px"}}> {(diagnosis.need_eval === 1) ? "The following tests are needed for further evaluation:" :
                        "No further evaluation is needed"} </Col>
        </Row>

        <Row className="mt-1">
            <Col style={{fontSize:"20px"}}>
            {(diagnosis.need_hiv === 1) ? (
                <MapHIVRecom/>
                ) : null}
             
            
             </Col>
        </Row>

        <Row className="mt-1">
            <Col style={{fontSize:"20px"}}>
            {(diagnosis.need_xray === 1) ? (
                <MapXrayRecom/>
                ) : null}
             
           
             </Col>
        </Row>

        <Row className="mt-1">
            <Col style={{fontSize:"20px"}}>
            
              {(diagnosis.need_mtb === 1) ? (
                <MapMTBRecom/>
                ) : null}
              
            
            
             </Col>
        </Row>

        <Row className="mt-1">
            <Col style={{fontSize:"20px"}}>
            
              {(diagnosis.need_tst === 1) ? (
                <MapTSTRecom/>
                ) : null}
            
             </Col>
        </Row>

        <Row className="mt-1">
            <Col style={{fontSize:"20px"}}>
              {(diagnosis.need_igra === 1) ? (
                <MapIGRARecom/>
                ) : null}
          
             </Col>
        </Row>

        <Row className="mt-1">
            <Col style={{fontSize:"18px"}}> Please advice patient and parent to avoid close contact to contain the spread of TB.</Col>
        </Row>

        

                   </>
                    ))}
             
       
        
            
             {diagnosisData.length > 0 && (
  <Pagination className="mt-3 justify-content-center">
    <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
    {Array.from({ length: Math.ceil(diagnosisData.length / itemsPerPage) }).map((_, index) => (
      <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
        {index + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === Math.ceil(diagnosisData.length / itemsPerPage)} />
  </Pagination>
)}



            </Col>
          </Row>

    </Col>
  </Row>

    {showPresumptiveModal && (
        <PresumptiveTBModal
          show={showPresumptiveModal}
          onClose={() => setShowPresumptiveModal(false)}
          caseid={id}
        />
      )}


    {showLatentModal && (
          <LatentTBModal
            show={showLatentModal}
            onClose={() => setShowLatentModal(false)}
            caseid={id}
          />
        )}

  </div>
  
    

       
  );
};

export default Diagnosis;
