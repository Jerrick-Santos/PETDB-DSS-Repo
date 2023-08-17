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


const PatientInfo = () => {
  
  const { id } = useParams();
  var patientNum = id
  
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/patient/${patientNum}`)
      .then((response) => {
        setPatientData(response.data[0])
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    

}, []);
console.log(patientData)

  return (
    <div>
    <NavBar/>

     {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
     <Row className="justify-content-center">
        <Col lg="10">
     
        <Navbar expand="sm" className="mt-4 pb-0">
          <Nav>
          <Link to={`/patient/${patientNum}`}>
          <button className="btn ms-1" style={{color: "#03045E", backgroundColor: 'white' , borderBottomLeftRadius: "0", borderBottomRightRadius: "0"  }} type="button">
            <img src={user} className="mb-2" style={{height:"23px"}} alt="" /> Patient Profile 
          </button>
          </Link>
          <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
          </button>
          <Link to={`/assessment/${patientNum}`}>
          <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
          </button>
          </Link>
          <Link to={`/treatments/${patientNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
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
            <Col> <strong> Patient Name: </strong> {patientData.fullname}</Col>
          </Row>
          <Row>
            <Col> <strong> Birthdate:  </strong> {new Date(patientData.birthdate).toLocaleDateString()}</Col>
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
                        <th scope="col">Contact Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Contact Relationship</th>
                        <th scope="col">Patient</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <td>Emma Johnson</td>
                        <td>12/31/2023</td>
                        <td>Female</td>
                        <td>Edith Johnson</td>
                        <td>09165189888</td>
                        <td>josefina_johsnons@dlsu.edu.ph</td>
                        <td> Mother </td>
                        <td><Link to="/addpatient"><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6'}} type="button">
                          Convert</button>
                          </Link>
                          </td>
                    </tr>
                    <tr>
                        <td>Noah</td>
                        <td>12/31/2023</td>
                        <td>Female</td>
                        <td>Edith Johnson</td>
                        <td>09165189888</td>
                        <td>josefina_johsnons@dlsu.edu.ph</td>
                        <td> Mother </td>
                        <td><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6'}} type="button">Convert</button></td>
                    </tr>
                    <tr>
                        <td>Ava</td>
                        <td>12/31/2023</td>
                        <td>Female</td>
                        <td>Edith Johnson</td>
                        <td>09165189888</td>
                        <td>josefina_johsnons@dlsu.edu.ph</td>
                        <td> Mother </td>
                        <td><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6'}} type="button">Convert</button></td>
                    </tr>
 
                </tbody>
                
               
            </table>
            <div className="d-flex justify-content-end me-5 mb-5" >
              <AddCloseContactModal/>
          </div>



    </Col>
  </Row>

  </div>
  
    

       
  );
};

export default PatientInfo;
