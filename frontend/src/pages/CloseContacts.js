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
import CaseHeader from '../components/CaseHeader';


const CloseContacts = () => {

  /*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/
  const { id } = useParams();
  var caseNum = id

  const [closeContactListData, setCloseContactListData] = useState([]);
  //const [latestCase, setLatestCase] = useState([]); TODO: Re-implement feature

  // Helper Functions


  // Load list of close contact
  useEffect(() => {
    async function fetchData() {

      var update = {}
      console.log("UPDATING INFORMATION (0/3): ", update)

      var res = await axios.get(`http://localhost:4000/api/getContacts/${caseNum}`)
      console.log(res);

      setCloseContactListData(res.data.map(contact => ({
        ...contact,
        num_ha: null,
        latest_ha: null,
        days_ha: null,
        num_xray: null,
        latest_xray: null,
        days_xray: null
      })));
      
      

      await Promise.all(res.data.map(async x => {
        if (x.PatientNo != null) {
          // find the latest case of the patient
          const latest_case = await axios.get(`http://localhost:4000/api/getLatestCase/${x.PatientNo}`)

          // find the latest and number of ha
          if (latest_case.data.length > 0) {
            const ha_start_dates = await axios.get(`http://localhost:4000/api/getHealthAssessmentDate/${latest_case.data[0].CaseNo}`)
            const xray_start_dates = await axios.get(`http://localhost:4000/api/getXrayDate/${latest_case.data[0].CaseNo}`)

            // TESTING
            console.log(`[CaseNo: ${latest_case.data[0].CaseNo}] [PatientNo: ${x.PatientNo}]`, ha_start_dates.data)
            console.log(`[CaseNo: ${latest_case.data[0].CaseNo}] [PatientNo: ${x.PatientNo}]`, xray_start_dates.data)

            

            // setting HA data
            if (ha_start_dates.data.length > 0) {
              const time_diff_ha = new Date() - new Date(ha_start_dates.data[0].ha_start)
              const days_diff_ha = Math.floor(time_diff_ha / (1000 * 60 * 60  * 24))

              const updatedPropsHA = {
                num_ha: ha_start_dates.data.length,
                latest_ha: new Date(ha_start_dates.data[0].ha_start).toLocaleDateString(),
                days_ha: days_diff_ha
              };
            
              //update.push(updateContactData(x, updatedPropsHA));
              update = {...x, ...updatedPropsHA}

              console.log(`[CaseNo: ${latest_case.data[0].CaseNo}] [PatientNo: ${latest_case.data[0].CaseNo}] REPORTING HA UPDATE: number of HA: ${updatedPropsHA.num_ha}, latest_ha: ${updatedPropsHA.latest_ha}, number of days since last ha: ${updatedPropsHA.days_ha}`)
              console.log("UPDATING INFORMATION (1/2): ", update)
            }

            

            // setting XRAY data
            if (xray_start_dates.data.length > 0){
              const time_diff_xray = new Date() - new Date(xray_start_dates.data[0].issue_date)
              const days_diff_xray = Math.floor(time_diff_xray / (1000 * 60 * 60  * 24))

              const updatedPropsXray = {
                num_xray: xray_start_dates.data.length,
                latest_xray: new Date(xray_start_dates.data[0].issue_date).toLocaleDateString(),
                days_xray: days_diff_xray
              };
            
              //update.push(updateContactData(x, updatedPropsXray));
              update = {...update, ...updatedPropsXray}

              console.log(`[CaseNo: ${latest_case.data[0].CaseNo}] [PatientNo: ${latest_case.data[0].CaseNo}] REPORTING XRAY UPDATE: number of XRAY: ${updatedPropsXray.num_xray}, latest_xray: ${updatedPropsXray.latest_xray}, number of days since last xray: ${updatedPropsXray.days_xray}`)
              console.log("UPDATING INFORMATION (2/3): ", update)
            }

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
        
        // find the latest and number of xray
      }));
      console.log(res);
    }

    fetchData()
    
  }, [caseNum])

  useEffect(() => {
    console.log("Updated closeContactListData:", closeContactListData);
  }, [closeContactListData]);

  // // Check backend if case is latest
  // useEffect(() => {
  //   console.log(caseNum)
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/api/getPatientNo/${caseNum}`);
  //       const PatientNo = response.data[0].PatientNo;
  //       console.log("PATIENTNUM FROM BACKEND: ", PatientNo);
  
  //       const result = await axios.get(`http://localhost:4000/api/getLatestCase/${PatientNo}`);
  //       const CaseNo = result.data[0].CaseNo;
  //       console.log("LATESTCASE FROM NESTED QUERY: ", CaseNo);
  
  //       caseNum === CaseNo ? setLatestCase(true) : setLatestCase(false);
  //       console.log("IS LATEST CASE?: ", latestCase);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   fetchData();
  // }, [caseNum, latestCase]);

  // useEffect(async () => {
  //   const response = await axios.get(`http://localhost:4000/api/getCaseStatus/${caseNum}`)
  //   const cs = response.data[0].case_status
  //   cs === "O" ? setLatestCase(true) : setLatestCase(false)
  //   console.log("is this the latest case?", cs)
  // }, [caseNum])
  

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
      
      {/** NEW CASE HEADER CODE */}
      <CaseHeader caseNum={caseNum} />
      
      {/* Shows all relevant information of the patient */}
      
      {/* Personal Information of the Patient */}
      <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
    <caption className=' fs-4' style={{ color:'#0077B6'}}>Close Contacts</caption>
    <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Relationship</th>
                        <th scope="col">Contact Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Next HA</th>
                        <th scope="col">Next X-Ray</th>  
                    </tr>
                </thead>
                <tbody>
                {closeContactListData.map((contact, index) => (
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
                      <td>{new Date(contact.birthdate).toLocaleDateString()}</td>
                      <td>{contact.sex === "M" ? "Male": "Female"}</td>
                      <td>{contact.contact_relationship}</td>
                      <td>{contact.contact_person === null ? <em>self</em> : contact.contact_person}</td>
                      <td>{contact.contact_num}</td>
                      <td>{contact.contact_email}</td>
                      
                      
                      {/*Display HA information*/}
                      <td>
                        {contact.num_ha === null ? "NO RECORD" :
                          `${contact.latest_ha} (${contact.days_ha})`
                        }
                      </td>

                      <td>
                        {contact.num_xray === null ? "NO RECORD" :
                          `${contact.latest_xray} (${contact.days_xray})`
                        }
                      </td>
                      

                      
                    </tr>
                  ))
                }
                </tbody>
                
               
            </table>
            <div className="d-flex justify-content-end me-5 mb-5" >
              <AddCloseContactModal id={caseNum} />
          </div>



    </Col>
  </Row>

  </div>
  
    

       
  );
};

export default CloseContacts;
