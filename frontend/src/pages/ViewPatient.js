import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdvancedSearch from '../components/AdvancedSearch';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';



const ViewPatient = () => {

    const [patientsData, setPatientsData] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:4000/api/allpatients")
        .then(response => {
          setPatientsData(response.data);
        })
        .catch(error => {
          console.error('Error fetching patients:', error);
        });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = async (e) => {
     
        e.preventDefault()
        
        axios.get(`http://localhost:4000/api/searchpatient/${searchTerm}`).then(response => {
                setPatientsData(response.data);
                console.log("added")
              })
              .catch(error => {
                console.error('Error searching patient:', error);
              });
        
        console.log("submitted")
        console.log(searchTerm)
        console.log(patientsData)
    }
    console.log(patientsData)


  return (
    <div>
    <NavBar/>
    <Row className="mt-5 justify-content-center" >
        <Col lg="11" className="justify-content-center" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
    
     {/* Showing 4 summary cards which will have a clickable function that affects the overall patient table
        once backend has been implemented*/}
    
    {/* Simple search based on a keyword and a button for advanced Search*/}
    <Row className="justify-content-center"  >
        <Col className="justify-content-center"  lg="10"> 
    <div className="d-flex  mb-2 mt-5">
    <form>
        <div className="input-group">
            {/* Adjust the max-width to control the width of the input field */}
            <input type="search"  className="form-control" name="searchTerm" value={searchTerm} onChange={handleChange} placeholder="Keyword" />
            <button className="btn me-auto" style={{ color: "white", backgroundColor: '#0077B6' }} onClick={handleSubmit} type="submit">  <img src={search} style={{height:"20px"}}alt="" /></button>
        </div>
    </form>
    <div className="ms-4">
        {/* Adjust the width of the Advanced Search button */}
        <AdvancedSearch/>
    </div>
    </div>
    </Col>
    </Row>
    <Row className="justify-content-center"  >
        <Col className="justify-content-center"  lg="10"> 
        <h1 className="mt-4" style={{fontSize:"35px"}}> Patient Record </h1>
        </Col>
    </Row>
    <Row className="justify-content-center">
        <Col  className="justify-content-center" sm="10">
    <Card className="mt-3 mb-4">
        <Card.Body>
    
    {/* Showing overall patient records in a table formatting. Hard-coded for frontend. Revise once backend
        is implemented */}
    
    <table className="table caption-top bg-white rounded mt-2">
    <thead>
                    <tr>
                        <th scope="col">Full Name</th>    
                        <th scope="col">Most Recent Case No.</th>
                        <th scope="col">Case Status</th>
                        <th scope="col">Date Added</th>

                    </tr>
                </thead>
                <tbody>
                    {patientsData.map((patient, index) => (
                    <tr key={index}>
                        <td>
                        <Link to={`/patient/${patient.PatientNo}`}>
                            <p style={{ color: 'black' }}>
                            <u>{patient.fullname}</u>
                            </p>
                        </Link>
                        </td>
                        <td>
                        <Link to={`/closecontacts/${patient.CaseNo}`}>
                            <p style={{ color: 'black' }}>
                            <u>{patient.case_refno}</u>
                            </p>
                        </Link>
                        </td>
                        <td>{patient.case_status === "O" ? "Ongoing": "Closed"}</td>
                        <td>{new Date(patient.admission_date).toLocaleDateString()}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
           
            
            </Card.Body>
            </Card>
            </Col>
            </Row>
        
        </Col>
    </Row>
    </div>
  );
};

export default ViewPatient;
