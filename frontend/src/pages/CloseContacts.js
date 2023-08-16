import '../index.css';
import React from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';

const PatientInfo = () => {

   
  return (
    <div>
      <NavBar/>

      {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
      <Navbar expand="lg" className="mt-4 justify-content-center align-items-center">
        <Nav>
        <button className="btn ms-1 me-3" style={{ color: "#03045E", backgroundColor: 'white'}} type="button">
          <img src={user} className="mb-2" style={{height:"23px"}} alt="" /> Patient Profile 
        </button>
        <button className="btn ms-1 me-3" style={{ color: "white", backgroundColor: '#0077B6'}} type="button">
          <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
        </button>
        <button className="btn ms-1 me-3" style={{ color: "#03045E", backgroundColor: 'white'}} type="button">
           <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
        </button>
        <button className="btn ms-1 me-3" style={{ color: "#03045E", backgroundColor: 'white'}} type="button">
        <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
        </button>
        
        </Nav>
       
      </Navbar>
      <hr />

       {/*Shows general patient information details */}
       <Row className="mt-5 justify-content-center">
        <Col className="ms-5" lg="12">
          <Row>
            <Col> <strong> Patient Name: </strong> Miguel Josh C. Perez</Col>
          </Row>
          <Row>
            <Col> <strong> Birthdate:  </strong>12/31/2023</Col>
          </Row>
          <Row>
            <Col> <strong>Patient ID:</strong> 0305667</Col>
          </Row>
        </Col>
      </Row>
      
      
      
      {/* Shows all relevant information of the patient */}
      
      {/* Personal Information of the Patient */}
      <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
    <caption className=' fs-4'>Close Contacts</caption>
    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Contact Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Contact Email</th>
                        <th scope="col">Contact Relationship</th>
                        <th scope="col">Last Contacted</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <th scope="row">1</th>
                        <td>Emma Johnson</td>
                        <td>12/31/2023</td>
                        <td>Female</td>
                        <td>Edith Johnson</td>
                        <td>09165189888</td>
                        <td>josefina_johsnons@dlsu.edu.ph</td>
                        <td> Mother </td>
                        <td>12/21/2023</td>
                        <td><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6', borderRadius: 0 }} type="button">Update</button></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Noah</td>
                        <td>Smith</td>
                        <td>N</td>
                        <td>Noah</td>
                        <td>2014-06-20</td>
                        <td>Male</td>
                        <td>8</td>
                        <td>Ongoing Treatment</td>
                        <td><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6', borderRadius: 0 }} type="button">Update</button></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Ava</td>
                        <td>Williams</td>
                        <td>A</td>
                        <td>Avie</td>
                        <td>2016-11-30</td>
                        <td>Female</td>
                        <td>5</td>
                        <td>Ongoing Treatment</td>
                        <td><button className="btn ms-1" style={{ fontSize:"12px", color: "white", backgroundColor: '#0077B6', borderRadius: 0 }} type="button">Update</button></td>
                    </tr>
 
                </tbody>
                
               
            </table>
            <div className="d-flex justify-content-end me-5" style={{width:"95%"}}>
              <button className="btn" style={{ fontSize: "12px", color: "white", backgroundColor: '#0077B6'}} type="button">Add a Close Contact</button>
          </div>

    </div>
  );
};

export default PatientInfo;
