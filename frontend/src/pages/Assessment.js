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
import ViewMapRecomModal from '../components/ViewMapRecomModal';
import AssessmentFormNew from '../components/AssessmentPersistence';
import AssessmentNoPersistence from '../components/AssessmentNoPersistence';
import AssessmentPersistence from '../components/AssessmentPersistence';
import AddAssessPersist from '../components/AddAssessPersist';
import AddAssessNoPersist from '../components/AddAssessNoPersist';
import CaseHeader from '../components/CaseHeader';
import Pagination from 'react-bootstrap/Pagination';
import bin from '../assets/bin.png'
import edit from '../assets/edit.png'
import UpdateAssessment from '../components/UpdateAssessment';
import DeleteAssessment from '../components/DeleteAssessment';

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

    // Add these state variables
const [activePage, setActivePage] = useState(1); // Active page number
const itemsPerPage = 5; // Number of items per page

// Function to handle page change
const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
};

// Calculate the index range for the current page
const startIndex = (activePage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
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
        
            
            {assessData.slice(startIndex, endIndex).map((ass, index) => (
              <>
               <hr />
               <Row>
               <Col sm="6">
                <Card.Text><AssessmentSummaryModal 
                      caseNo={caseNum} 
                      date={new Date(ass.assessment_date).toLocaleDateString()} 
                      AssessNo={ass.AssessNo}
                      CaseNo={ass.CaseNo}
                      cough={ass.cough}
                      c_weeks={ass.c_weeks}
                      c_persist={ass.c_persist}
                      fever={ass.fever}
                      fe_weeks={ass.fe_weeks}
                      fe_persist={ass.fe_persist}
                      weight_loss={ass.weight_loss}
                      wl_weeks={ass.wl_weeks}
                      wl_persist={ass.wl_persist}
                      night_sweats={ass.night_sweats}
                      ns_weeks={ass.ns_weeks}
                      ns_persist={ass.ns_persist}
                      fatigue={ass.fatigue}
                      fat_weeks={ass.fat_weeks}
                      fat_persist={ass.fat_persist}
                      red_playfulness={ass.red_playfulness}
                      rp_weeks={ass.rp_weeks}
                      rp_persist={ass.rp_persist}
                      dec_acts={ass.dec_acts}
                      da_weeks={ass.da_weeks}
                      da_persist={ass.da_persist}
                      not_eating_well={ass.not_eating_well}
                      new_weeks={ass.new_weeks}
                      new_persist={ass.new_persist}
                      non_painful_ecl={ass.non_painful_ecl}
                      drowsy={ass.drowsy}
                      can_stand={ass.can_stand}
                      ass_body_weight={ass.ass_body_weight}
                      ass_height={ass.ass_height}
                      ass_bmi={ass.ass_bmi}
                      ass_temp={ass.ass_temp}
                      ass_bp={ass.ass_bp}
                      plhiv={ass.plhiv}
                      hiv={ass.hiv}
                      mother_hiv={ass.mother_hiv}
                      smoking={ass.smoking}
                      drinking={ass.drinking}
                      sex_active={ass.sex_active}
                      renal_disease={ass.renal_disease}
                      malnutrition={ass.malnutrition}
                      other_health_issues={ass.other_health_issues}
                      other_meds={ass.other_meds}
                      other_dd_interacts={ass.other_dd_interacts}
                      other_comorbid={ass.other_comorbid}
                      assessment_date={ass.assessment_date}
                      userNo={ass.userNo}
                      prevPTB_diagnosed={ass.prevPTB_diagnosed} 
                      user_fullname={ass.user_fullname}/>
                      
                      </Card.Text>
              </Col>
              <Col sm="5">
                <Card.Text>{ass.user_fullname}</Card.Text>
              </Col>
              <Col sm="1">
                <Card.Text>
              
                <UpdateAssessment AssessNo={ass.AssessNo} cough={ass.cough}
                                  c_weeks={ass.c_weeks}
                                  c_persist={ass.c_persist}
                                  fever={ass.fever}
                                  fe_weeks={ass.fe_weeks}
                                  fe_persist={ass.fe_persist}
                                  weight_loss={ass.weight_loss}
                                  wl_weeks={ass.wl_weeks}
                                  wl_persist={ass.wl_persist}
                                  night_sweats={ass.night_sweats}
                                  ns_weeks={ass.ns_weeks}
                                  ns_persist={ass.ns_persist}
                                  fatigue={ass.fatigue}
                                  fat_weeks={ass.fat_weeks}
                                  fat_persist={ass.fat_persist}
                                  red_playfulness={ass.red_playfulness}
                                  rp_weeks={ass.rp_weeks}
                                  rp_persist={ass.rp_persist}
                                  dec_acts={ass.dec_acts}
                                  da_weeks={ass.da_weeks}
                                  da_persist={ass.da_persist}
                                  not_eating_well={ass.not_eating_well}
                                  new_weeks={ass.new_weeks}
                                  new_persist={ass.new_persist}
                                  non_painful_ecl={ass.non_painful_ecl}
                                  drowsy={ass.drowsy}
                                  can_stand={ass.can_stand}
                                  ass_body_weight={ass.ass_body_weight}
                                  ass_height={ass.ass_height}
                                  ass_bmi={ass.ass_bmi}
                                  ass_temp={ass.ass_temp}
                                  ass_bp={ass.ass_bp}
                                  plhiv={ass.plhiv}
                                  hiv={ass.hiv}
                                  mother_hiv={ass.mother_hiv}
                                  smoking={ass.smoking}
                                  drinking={ass.drinking}
                                  sex_active={ass.sex_active}
                                  renal_disease={ass.renal_disease}
                                  malnutrition={ass.malnutrition}
                                  other_health_issues={ass.other_health_issues}
                                  other_meds={ass.other_meds}
                                  other_dd_interacts={ass.other_dd_interacts}
                                  other_comorbid={ass.other_comorbid}
                                  assessment_date={ass.assessment_date}
                                  userNo={ass.userNo}
                                  prevPTB_diagnosed={ass.prevPTB_diagnosed}/>
               <DeleteAssessment AssessNo={ass.AssessNo}/>
                 
            </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          


          
          </Card.Body>
        </Card>
      </Col>
      <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
            {Array.from({ length: Math.ceil(assessData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === Math.ceil(assessData.length / itemsPerPage)} />
          </Pagination>

    </Row>

      {/* Shows the recommended next course of action */}
      
      </Col>
    </Row>

    </div>
  );
};

export default Assessment;
