import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdvancedSearch from '../components/AdvancedSearch';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';



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

    // Add these state variables
        const [activePage, setActivePage] = useState(1); // Active page number
        const itemsPerPage = 12; // Number of items per page

        // Function to handle page change
        const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
        };

        // Calculate the index range for the current page
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

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
                <Row className="justify-content-center"  >
                <Col className="justify-content-center"  lg="12"> 
                <h1 className="mt-4" style={{fontSize:"35px"}}> Patient Record </h1>
                </Col>
            </Row>
    <div className="d-flex  mb-2 mt-3">
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
                    {patientsData.slice(startIndex, endIndex).map((patient, index) => (
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
            <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
            {Array.from({ length: Math.ceil(patientsData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === Math.ceil(patientsData.length / itemsPerPage)} />
          </Pagination>
            </Row>
        
        </Col>
    </Row>
    </div>
  );
};

export default ViewPatient;
