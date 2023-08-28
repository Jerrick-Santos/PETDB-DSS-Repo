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


const CloseContacts = () => {

  /*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/
  const { id } = useParams();
  var caseNum = id

  const [closeContactListData, setCloseContactListData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [latestCase, setLatestCase] = useState([]);

  // Helper Functions
  function calcDaysContact(a, b){
    const date_init = new Date(a);
    const date_lastcontact = new Date(b);
    const datediff = date_lastcontact.getTime() - date_init.getTime();
    const days = datediff / (1000 * 3600 * 24)
    console.log(date_init, b, days)
    return (days);
  }
  
  // Load list of close contact
  useEffect(() => {
    axios.get(`http://localhost:4000/api/getContacts/${caseNum}`)
    .then(res => {
      console.log(res);
      setCloseContactListData(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  }, [caseNum])

  // Load patient data for header
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

  // Check backend if case is latest
  useEffect(() => {
    console.log(caseNum)
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/getPatientNo/${caseNum}`);
        const PatientNo = response.data[0].PatientNo;
        console.log("PATIENTNUM FROM BACKEND: ", PatientNo);
  
        const result = await axios.get(`http://localhost:4000/api/getLatestCase/${PatientNo}`);
        const CaseNo = result.data[0].CaseNo;
        console.log("LATESTCASE FROM NESTED QUERY: ", CaseNo);
  
        caseNum === CaseNo ? setLatestCase(true) : setLatestCase(false);
        console.log("IS LATEST CASE?: ", latestCase);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [caseNum, latestCase]);
  

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
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
    <Row className="justify-content-center" >
      <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>

      {/*Shows general patient information details */}
      
      
      <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
        <Col className="ms-5" lg="12">
          <Row>
            <Col><strong>Case No: {patientData.case_refno}</strong></Col>
          </Row>
          <Row>
            <Col> <strong> Patient Name: {patientData.patient_name}</strong> </Col>
          </Row>
          <Row>
            <Col> <strong> Birthdate: {patientData.formattedBirthdate}</strong> </Col>
          </Row>
        </Col>
      </Row>
      
      
      
      {/* Shows all relevant information of the patient */}
      
      {/* Personal Information of the Patient */}
      <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
    <caption className=' fs-4' style={{ color:'#0077B6'}}>Close Contacts</caption>
    <thead>
                    <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Relationship to Patient</th>
                        <th scope="col">Contact Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Days since last contact</th>
                        <th scope="col">Patient</th>
                    </tr>
                </thead>
                <tbody>
                {closeContactListData.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.last_name+", "+contact.first_name+" "+contact.middle_initial}</td>
                      <td>{new Date(contact.birthdate).toLocaleDateString()}</td>
                      <td>{contact.sex === "M" ? "Male": "Female"}</td>
                      <td>{contact.contact_relationship}</td>
                      <td>{contact.contact_person}</td>
                      <td>{contact.contact_num}</td>
                      <td>{contact.contact_email}</td>
                      
                      {/*TODO: Add Confirm Page for Successful Patient Contact*/}
                      <td>
                        {contact.date_contacted === null ? (
                          "Has not been contacted yet"
                        ) : (
                          `${calcDaysContact(contact.date_added, contact.date_contacted)} Days`
                        )
                        }
                      </td>

                      {/* Patient Convert Button: Only Applicable to Contacts Under the Age of 15*/}
                      <td>
                        {contact.PatientNo === null ? (
                          contact.age < 15 ? (
                            <Link to={`/addPatient/${contact.ContactNo}`}><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6'}} type="button">Convert</button></Link>
                          ) : (
                            "Contact cannot be patient, must be younger than 15"
                          )
                        ) : (
                          <Link to={`/patient/${contact.PatientNo}`}>View Patient</Link>
                        )}
                      </td>
                    </tr>
                  ))
                }
                </tbody>
                
               
            </table>
            <div className="d-flex justify-content-end me-5 mb-5" >
              <AddCloseContactModal id={caseNum} isLatest={latestCase}/>
          </div>



    </Col>
  </Row>

  </div>
  
    

       
  );
};

export default CloseContacts;
