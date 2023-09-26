import '../index.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import axios from 'axios';
import add from '../assets/add.png';
import noresult from "../assets/noresult.png";
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import AssessmentSummaryModal from '../components/AssessmentSummaryModal';
import AddAssessPersist from '../components/AddAssessPersist';
import AddAssessNoPersist from '../components/AddAssessNoPersist';
import CaseHeader from '../components/CaseHeader';
import Pagination from 'react-bootstrap/Pagination';
import UpdateAssessment from '../components/UpdateAssessment';
import UpdateAssessmentNoPersist from '../components/UpdateAssessmentNoPersist';
import DeleteAssessment from '../components/DeleteAssessment';
import Spinner from "react-bootstrap/Spinner";
import test from "../assets/test.png";
import diagnose from "../assets/diagnose.png";
import similar from "../assets/similar.png";

const Assessment = () => {

  const { id } = useParams();
  var caseNum = id
  const [isLoading, setIsLoading] = useState(true);
  const [caseData, setCaseData] = useState([]);
  const [assessData, setAssessData] = useState([]);
  const [caseClosed, setCaseClosed] = useState(false);

  const [userNum, setUserNum] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  useEffect(() => {

    axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
      .then(res => {
        console.log(res);
        setCaseData(res.data[0]);
        
        if (res.data[0].case_status === 'C') {
          // Set a state variable to indicate that the case is closed
          setCaseClosed(true);
        } else {
          setCaseClosed(false);
        }
      })
      .catch(err => {
        console.error(err);
      })

    axios.get(`http://localhost:4000/api/patientassessment/${caseNum}`)
      .then((response) => {
        setAssessData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });

      const fetchData = async () => {
        try {
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
    
          // Make an Axios GET request to the /test route with the token in headers
          const response = await axios.get('http://localhost:4000/api/tokencontent', { headers });
    
          // Handle the response data
          console.log('Response:', response.data);
          setUserNum(response.data.userNo);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchData(); // Call the fetchData function when the component mounts
    }, []);


 ///PAGINATION LOGIC
  // Add these state variables
  const [activePage, setActivePage] = useState(1); // Active page number
  const itemsPerPage = 10; // Number of items per page

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxPageLinks = 10;

  const totalPages = Math.ceil(assessData.length / itemsPerPage);

  // Define the number of page links to show before and after the active page
  const pageLinksToShow = maxPageLinks - 2; // Subtract 2 for Prev and Next buttons

  // Calculate the start and end page numbers to display
  let startPage = Math.max(
    1,
    Math.min(
      activePage - Math.floor(pageLinksToShow / 2),
      totalPages - pageLinksToShow + 1,
    ),
  );
  let endPage = Math.min(totalPages, startPage + pageLinksToShow - 1);

  // Adjust the start and end page numbers if they exceed the bounds
  if (endPage - startPage + 1 < pageLinksToShow) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, pageLinksToShow);
    } else {
      startPage = Math.max(1, totalPages - pageLinksToShow + 1);
    }
  }
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

const minAssessNo = Math.min(...assessData.map(a => a.AssessNo));
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
          <img src={test} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          </Link>
          <Link to={`/diagnosis/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={diagnose} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <Link to={`/treatments/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatment History
          </button>
          </Link>
          <Link to={`/similarcases/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={similar} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
          </Link>
            
            </Nav>
          
          </Navbar>
         
        </Col>
      </Row>
      
      
      <Row className="justify-content-center" >
        <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      {/*Shows general patient information details */}

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
      <CaseHeader case_refno={caseData.case_refno} PatientNo={caseData.PatientNo} patient_name={caseData.patient_name}
                  start_date={caseData.start_date} end_date={caseData.end_date} case_status={caseData.case_status}
                  PRESref={caseData.PRESref} LATENTref={caseData.LATENTref}/>
     
     

      

      <hr/>
      <Row className="mb-5 mt-2 justify-content-center">
      <Col lg="8">
      <p> <strong> Assessment Record </strong> </p>
      {assessData.length > 0 ? (
        <Card className="mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Date of Assessment</th>
                              <th scope="col">Assessed by</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
            
        
            
            {assessData.slice(startIndex, endIndex).map((ass, index) => (
              <>
               <tr key={index}>
                                  <td>
                                  <AssessmentSummaryModal 
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
                                  </td>
                                  <td>{ass.user_fullname}</td>
                               
                                  <td>
                                  {minAssessNo === ass.AssessNo ? (
                  <UpdateAssessmentNoPersist AssessNo={ass.AssessNo}
                  cough={ass.cough}
                  c_weeks={ass.c_weeks}
                  fever={ass.fever}
                  fe_weeks={ass.fe_weeks}
                  weight_loss={ass.weight_loss}
                  wl_weeks={ass.wl_weeks}
                  night_sweats={ass.night_sweats}
                  ns_weeks={ass.ns_weeks}
                  fatigue={ass.fatigue}
                  fat_weeks={ass.fat_weeks}
                  red_playfulness={ass.red_playfulness}
                  rp_weeks={ass.rp_weeks}
                  dec_acts={ass.dec_acts}
                  da_weeks={ass.da_weeks}
                  not_eating_well={ass.not_eating_well}
                  new_weeks={ass.new_weeks}
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
                
                ) : (
                  <UpdateAssessment AssessNo={ass.AssessNo}
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
                  prevPTB_diagnosed={ass.prevPTB_diagnosed}/>
                )}
               <DeleteAssessment AssessNo={ass.AssessNo}/>
                                  </td>
                                </tr>
             
                   </>
                    ))}
             </tbody>
                        </table>


          
          </Card.Body>
        </Card>
        ) : (
                    <Card className="mt-4 mb-4 text-center">
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
                          No Assessments Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}
      
 
      <Row className="mb-4">
                    
                      {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
    {caseData.case_status === "O" ?
    <>
     {assessData.length > 0 ? (
      <Col>
      <AddAssessPersist
          caseNo={caseNum}
          firstName={firstName}
          lastName={lastName}
          userNo={userNum}
      />
      </Col>
     ) : (
          <Col>
          <AddAssessNoPersist
              caseNo={caseNum}
              firstName={firstName}
          lastName={lastName}
          userNo={userNum}
          />
          </Col>
     )}
      </> : null    }          
                    <Col className="d-flex justify-content-end">
                      {assessData.length > 0 ? (
                        <Pagination className="mb-0">
                          <Pagination.Prev
                            onClick={() => handlePageChange(activePage - 1)}
                            disabled={activePage === 1}
                          />

                          {startPage > 1 && (
                            <>
                              <Pagination.Item
                                onClick={() => handlePageChange(1)}
                              >
                                1
                              </Pagination.Item>
                              {startPage > 2 && <Pagination.Ellipsis />}
                            </>
                          )}

                          {pageNumbers.map((pageNumber) => (
                            <Pagination.Item
                              key={pageNumber}
                              active={pageNumber === activePage}
                              onClick={() => handlePageChange(pageNumber)}
                            >
                              {pageNumber}
                            </Pagination.Item>
                          ))}

                          {endPage < totalPages && (
                            <>
                              {endPage < totalPages - 1 && (
                                <Pagination.Ellipsis />
                              )}
                              <Pagination.Item
                                onClick={() => handlePageChange(totalPages)}
                              >
                                {totalPages}
                              </Pagination.Item>
                            </>
                          )}

                          <Pagination.Next
                            onClick={() => handlePageChange(activePage + 1)}
                            disabled={activePage === totalPages}
                          />
                        </Pagination>
                      ) : null}
                    </Col>
                  </Row>

  

      {/* Shows the recommended next course of action */}
      
      </Col>
      </Row>
      </>
              )}
    </Col>
    </Row>

    </div>
  );
};

export default Assessment;
