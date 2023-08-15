import '../index.css';
import React from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const PatientInfo = () => {

   
  return (
    <div>
      <NavBar/>

      {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
      <Navbar expand="lg" className="mt-4 justify-content-center align-items-center">
        <Nav>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Patient Profile</button>
        <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderRadius: 0 }} type="button">Close Contacts</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Assessment</button>
        <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderRadius: 0 }} type="button">Treatments</button>
        </Nav>
      </Navbar>

      
      
      
      
      {/* Shows all relevant information of the patient */}
      
      {/* Personal Information of the Patient */}
      <table className="table caption-top bg-white rounded ms-4 me-5" style={{width:"95%"}}>
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
                <tr className="clickable-row" onClick={() => window.location.href = "link-to-details-page-for-row-1"}>
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


    </div>
  );
};

export default PatientInfo;
