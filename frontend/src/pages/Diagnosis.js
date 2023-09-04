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
import Button from 'react-bootstrap/Button';
import PresumptiveTBModal from '../components/PresumptiveTBModal';
import XrayRecomModal from '../components/XrayRecomModal';
import LatentTBModal from '../components/LatentTBModal';
import CaseHeader from '../components/CaseHeader'


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

  const handleButtonClick = async () => {
    setIsLoading(true);
  
    try {
      // SET DIAGNOSIS
      const diagnoseResponse = await axios.post(`http://localhost:4000/api/diagnose/${id}`);
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
  }, []);

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
                disabled={isLoading}
              >
                Diagnose TB Status
              </button>
              
            </Col>

            <Col lg="11" className="d-flex justify-content-center">
              <XrayRecomModal/>
              
            </Col>
            
            <Col lg="11">
            <hr/>
            <table className="table caption-top bg-white rounded mt-3">
        <caption className=' fs-4'>Diagnosis Records</caption>
        <thead>
                    <tr>
                        <th scope="col">Date Diagnosed</th>    
                        <th scope="col">TB Status</th>
                        <th scope="col">Diagnosis</th>
                        <th scope="col">EPTB?</th>
                        <th scope="col">Further Evaluation Required</th>
                        <th scope="col">Request HIV Test</th>
                        <th scope="col">Request XRAY</th>
                        <th scope="col">Request MTB/RIF</th>
                        <th scope="col">Request TST</th>
                        <th scope="col">Request IGRA</th>
                    </tr>
                </thead>
                <tbody>
                    {diagnosisData.map((diagnosis, index) => (
                    <tr key={index}>
                        {/* DATE DIAGNOSED */}
                        <td>{new Date(diagnosis.DGDate).toLocaleDateString()}</td>
                        {/* TB STATUS */}
                        <td>
                        {diagnosis.confirmed_tb === 1 ? "CONFIRMED" :
                        diagnosis.presumptive_tb === 1 ? "PRESUMPTIVE" :
                        diagnosis.latent_tb === 1 ? "LATENT" :
                        diagnosis.no_tb === 1 ? "NO TB":
                        "NONE"}
                        </td>
                        {/* DIAGNOSIS */}
                        <td>{diagnosis.diagnosis}</td>
                        {/* EPTB */}
                        <td>
                          {
                            diagnosis.EPTBpositive === 1 ? "YES": "NO"
                          }
                        </td>

                        {/* Further Evaluation Required */}
                        <td>
                        {diagnosis.need_eval === 1 ? "YES" :"NO"}
                        </td>
                        {/* Request HIV Test */}
                        <td>{diagnosis.need_hiv === 1 ? "YES" : "NO"}</td>
                        <td>{diagnosis.need_xray === 1 ? "YES" : "NO"}</td>
                        <td>{diagnosis.need_mtb === 1 ? "YES" : "NO"}</td>
                        <td>{diagnosis.need_tst === 1 ? "YES" : "NO"}</td>
                        <td>{diagnosis.need_igra === 1 ? "YES" : "NO"}</td>
                    </tr>
                    ))}
                </tbody>
            </table>


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
