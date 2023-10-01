import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col, Badge, Accordion  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import noresult from "../assets/noresult.png";
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import add from '../assets/add.png';
import { Link, useParams } from 'react-router-dom';
import AddCloseContactModal from '../components/AddCloseContactModal';
import axios from 'axios';
import CaseHeader from '../components/CaseHeader';
import test from "../assets/test.png";
import diagnose from "../assets/diagnose.png";
import similar from "../assets/similar.png";
import Spinner from "react-bootstrap/Spinner";
import Pagination from 'react-bootstrap/Pagination';

const CloseContacts = () => {

  /*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/
  const { id } = useParams();
  var caseNum = id
  const [isLoading, setIsLoading] = useState(true);
  const [closeContactListData, setCloseContactListData] = useState([]);
  const [latestCase, setLatestCase] = useState([]);
  const [caseData, setCaseData] = useState([])

  // Helper Functions
  function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }
    return date;
  }

  function getAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Load list of close contact
  useEffect(() => {
    async function fetchData() {

      var res = await axios.get(`http://localhost:4000/api/getContacts/${caseNum}`)
      console.log(res);

      setCloseContactListData(res.data.map(contact => ({
        ...contact,
        next_ha: null,
        days_until_ha: null,
        next_xray: null,
        days_until_xray: null,
        status_ha: null,
        status_xray: null
      })));
      
      var update = {}

      await Promise.all(res.data.map(async x => {
        if (x.PatientNo != null) {
          // find the latest case of the patient
          const latest_case = await axios.get(`http://localhost:4000/api/getCaseByPatient/${x.PatientNo}`)

          // find the latest and number of ha
          if (latest_case.data.length > 0) {
            const ha_start_dates = await axios.get(`http://localhost:4000/api/getHealthAssessmentDate/${latest_case.data[0].CaseNo}`)
            const xray_start_dates = await axios.get(`http://localhost:4000/api/getXrayDate/${latest_case.data[0].CaseNo}`)

            // TESTING
            console.log(`[CaseNo: ${latest_case.data[0].CaseNo}] [PatientNo: ${x.PatientNo}]`, ha_start_dates.data)
            console.log(`[CaseNo: ${latest_case.data[0].CaseNo}] [PatientNo: ${x.PatientNo}]`, xray_start_dates.data)

            
            let next_ha, days_until_ha, next_xray, days_until_xray
            // setting HA data
            if (ha_start_dates.data.length > 0) {
              next_ha = addMonths(new Date(ha_start_dates.data[0].ha_start), 6).toLocaleDateString().replaceAll("/", "-")
              console.log("DATE UNTIL NEXT HA:", next_ha)
            }
            else {
              next_ha = addMonths(new Date(latest_case.data[0].start_date), 6).toLocaleDateString().replaceAll("/", "-")
              console.log("[NO HA YET] DATE UNTIL NEXT HA:", next_ha)
            }

            // setting XRAY data
            if (xray_start_dates.data.length > 0){
              next_xray = addMonths(new Date(xray_start_dates.data[0].issue_date), 12).toLocaleDateString().replaceAll("/", "-")
              console.log("DATE UNTIL NEXT XRAY:", next_xray)
            }
            else {
              next_xray = addMonths(new Date(latest_case.data[0].start_date), 12).toLocaleDateString().replaceAll("/", "-")
              console.log("[NO XRAY YET] DATE UNTIL NEXT XRAY:", next_xray)
            }

            days_until_ha = Math.floor((new Date(next_ha) - new Date())/ (1000 * 60 * 60 * 24))
            days_until_xray = Math.floor((new Date(next_xray) - new Date())/ (1000 * 60 * 60 * 24))
            
            console.log("DAYS TILL NEXT HA/XRAY: ", days_until_ha, "/", days_until_xray)

            let status_ha, status_xray

            if (ha_start_dates.data.length === 0 || ha_start_dates.data.length === null) { status_ha = 0 } else { 
              status_ha = ha_start_dates.data.length;
            }

            if (xray_start_dates.data.length === 0 || xray_start_dates.data.length === null) { status_xray = 0 } else {
              status_xray = xray_start_dates.data.length;
            }

            const updatedProps = {
              next_xray: next_xray,
              days_until_xray: days_until_xray,
              next_ha: next_ha,
              days_until_ha: days_until_ha,
              status_ha: status_ha,
              status_xray: status_xray
            };
        
            update = {...x, ...updatedProps}

            console.log("UPDATED INFORMATION: ", update)

            setCloseContactListData(prevData =>
              prevData.map(contact => {
                if (update.PatientNo === contact.PatientNo) {
                  return { ...update };
                } else {
                  return contact;
                }
              })
              
            );
            
          }
        }
      }));
      console.log(res);
      setIsLoading(false);
    }
    fetchData()
    
  }, [caseNum])

  useEffect(() => {
    console.log("Updated closeContactListData:", closeContactListData);
  }, [closeContactListData]);

  // Check backend if case is latest
  useEffect(() => {
    let latest_case
    console.log(caseNum)

    const fetchData = async () => {
      try {

        const result = await axios.get(`http://localhost:4000/api/getLatestCase/${caseNum}`)
  
        if (result.data) { 
          latest_case = result.data[0].latest_case
          console.log('latest_case: ', latest_case)
          console.log('caseNum: ', caseNum)
          if (latest_case === Number(caseNum)) { setLatestCase(true) } else { setLatestCase(false) }
        }
        else { console.log('error retrieving latest case') }
      } catch (error) {
        console.error(error)
      }
    };
  
    fetchData();
  }, [caseNum]);

  useEffect(() => {
    console.log('fetching data: ', latestCase);
  }, [latestCase]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
    .then(res => {
      console.log(res);
      setCaseData(res.data[0]);
    })
    .catch(err => {
      console.error(err);
    })
  }, [caseNum])

  const [activePage1, setActivePage1] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Function to handle page change
  const handlePageChange1 = (pageNumber) => {
    setActivePage1(pageNumber);
  };


  // Calculate the index range for the current page
  const startIndex1 = (activePage1 - 1) * itemsPerPage;
  const endIndex1 = startIndex1 + itemsPerPage;
 

  return (
    <div>
    <NavBar/>

     {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
     <Row className="justify-content-center">
        <Col lg="10">
     
        <Navbar expand="sm" className="mt-4 pb-0">
          <Nav>
          <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
          </button>
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
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
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
      <CaseHeader caseNo={caseNum} case_refno={caseData.case_refno} PatientNo={caseData.PatientNo} patient_name={caseData.patient_name}
                  start_date={caseData.start_date} end_date={caseData.end_date} case_status={caseData.case_status}
                  PRESref={caseData.PRESref} LATENTref={caseData.LATENTref}/>
     
      
      {/* Shows all relevant information of the patient */}
      
      {/* Personal Information of the Patient */}
      {closeContactListData.length > 0 ? (
      <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
    <caption className=' fs-4' style={{ color:'#0077B6'}}>Close Contacts</caption>
    <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Relationship</th>
                        <th scope="col">Contact Details</th>
                        <th scope="col">Diagnostic Result</th>
                        <th scope="col">Treatment Status</th>
                        <th scope="col">Next HA</th>
                        <th scope="col">Next X-Ray</th>  
                    </tr>
                </thead>
                <tbody>
                {closeContactListData.slice(startIndex1, endIndex1).map((contact, index) => (
                    <tr key={index}>
                      {/* Patient Convert Button: Only Applicable to Contacts Under the Age of 15*/}
                      <td>
                        {contact.PatientNo === null ? (
                          contact.age < 15 ? (
                            <Link to={`/addPatient/${contact.ContactNo}`}><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6'}} type="button">Convert</button></Link>
                          ) : (
                            ""
                          )
                        ) : (
                          <Link to={`/patient/${contact.PatientNo}`}><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6'}} type="button">View</button></Link>
                        )}
                      </td>
                      <td>{contact.last_name+", "+contact.first_name+" "+contact.middle_initial}</td>
                      <td>{getAge(contact.birthdate)}</td>
                      <td>{contact.sex === "M" ? "Male": "Female"}</td>
                      <td>{contact.contact_relationship}</td>

                      <td>
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item>
                              <Accordion.Header>Contact Details</Accordion.Header>
                                <Accordion.Body> 
                                  <Row>
                                    <Badge bg='secondary'>Name</Badge> {contact.contact_person}
                                  </Row>
                                  <Row>
                                    <Badge bg='secondary'>Number</Badge> {contact.contact_num}
                                  </Row>
                                  <Row>
                                    <Badge bg='secondary'>Email</Badge> {contact.contact_email}
                                  </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                      </td>

                      <td>{contact.DRDescription ? contact.DRDescription : 'none'}</td>
                      <td>{contact.TSDescription ? contact.TSDescription : 'none'}</td>

                      {contact.PatientNo === null ? (
                          <td> <Badge bg='danger'> NO RECORD </Badge> </td>
                        ) : (
                          <>
                            {contact.status_ha === 2 ? (
                              <td> <Badge bg='success'> COMPLETE </Badge> </td>
                              ) : (
                                <td> <Badge bg='secondary'> { contact.next_ha } </Badge> </td>
                              )
                            }
                          </>
                        )
                      }

                      {contact.PatientNo === null ? (
                          <td><Badge bg='danger'> NO RECORD </Badge></td>
                        ) : (
                          <>
                            {contact.status_xray === 2 ? (
                              <td> <Badge bg='success'> COMPLETE </Badge> </td>
                              ) : (
                                <td> <Badge bg='secondary'> { contact.next_xray } </Badge> </td>
                              )
                            }
                          </>
                        )
                      }

                    </tr>
                  ))
                }
                </tbody>
                
               
            </table>
      ) : (
        <>
                    <hr/>
                    <Row className="mb-3 justify-content-center" style={{ color:'black'}}>
            <Col lg="11">
                      <Row className="mt-2 justify-content-center">
                        <Col className="d-flex justify-content-center">
                          <img
                            src={noresult}
                            alt="No Results"
                            style={{ width: "120px", height: "120px" }}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col className="d-flex justify-content-center">
                        <h1 style={{ fontSize: "20px", color: "#808080" }}>
                          {" "}
                          No Close Contacts{" "}
                        </h1>
                        </Col>
                        </Row>
                        </Col>
                        </Row>
                </>
      )}

            <Row className="mb-4">
                    
                    {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
              
                      <Col className="ms-4">
                      {caseData.case_status === "O" ?
              <AddCloseContactModal id={caseNum} show={latestCase}/> : null}
                      </Col>
              
                  
                  <Col className="d-flex justify-content-end me-5">
                    {closeContactListData.length > 0 ? (
                       <Pagination className="mt-3 justify-content-center">
                       <Pagination.Prev onClick={() => handlePageChange1(activePage1 - 1)} disabled={activePage1 === 1} />
                       {Array.from({ length: Math.ceil(closeContactListData.length / itemsPerPage) }).map((_, index) => (
                         <Pagination.Item key={index} active={index + 1 === activePage1} onClick={() => handlePageChange1(index + 1)}>
                           {index + 1}
                         </Pagination.Item>
                       ))}
                       <Pagination.Next onClick={() => handlePageChange1(activePage1 + 1)} disabled={activePage1 === Math.ceil(closeContactListData.length / itemsPerPage)} />
                     </Pagination>
                    ) : null}
                  </Col>
                </Row>
          

                </>
              )}

    </Col>
  </Row>

  </div>
  
    

       
  );
};

export default CloseContacts;
