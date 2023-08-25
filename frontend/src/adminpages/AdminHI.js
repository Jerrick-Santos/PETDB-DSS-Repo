import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col, Container, Dropdown } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import AddBHCModal from '../admincomponents/CreateBHCModal';
import CreateHIModal from '../admincomponents/CreateHIModal';
import { Link, useParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';



const AdminHI = () => {
  const [hiData, setHiData] = useState([]);

const pageSize = 16; // Number of items per page

useEffect(() => {
  axios.get("http://localhost:4000/api/allhi")
    .then(response => {
      setHiData(response.data);
    })
    .catch(error => {
      console.error('Error fetching HIs:', error);
    });
}, []);



// Add these state variables
const [activePage, setActivePage] = useState(1); // Active page number
const itemsPerPage = 16; // Number of items per page

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
        axios.get(`http://localhost:4000/api/searchhi/${searchTerm}`).then(response => {
                setHiData(response.data);
                console.log("added")
              })
              .catch(error => {
                console.error('Error searching patient:', error);
              });
    }

    const handleProvinceFilter = async (e) =>{
      e.preventDefault()

    }
  

  return (
    <div>
    <AdminNavBar/>
    <Row className="mt-5 justify-content-center" >
        <Col lg="11" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
       

      
         {/* Shows the recommended next course of action */}
    <Row className="mt-5 justify-content-center">
      <Col lg="11">
      <form>
        <div className="mb-4 input-group" style={{ maxWidth: '290px' }}>
            {/* Adjust the max-width to control the width of the input field */}
            <input type="search"  className="form-control" name="searchTerm" value={searchTerm} onChange={handleChange} placeholder="Keyword" />
            <button className="btn me-auto" style={{ color: "white", backgroundColor: '#0077B6' }} onClick={handleSubmit} type="submit">  <img src={search} style={{height:"20px"}}alt="" /></button>
        </div>
    </form>
      <h1 style={{fontSize:"35px"}}> Health Institutions (HI) </h1>
        <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="2">
                <Card.Text><strong>HI Name</strong> </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text><strong>Address</strong> </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text><strong>Operating Hours</strong> </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text><strong>Contact Number</strong> </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text><strong>Email Address</strong> </Card.Text>
              </Col>
            </Row>
            
            {hiData.slice(startIndex, endIndex).map((hi, index) => (
              <>
              <hr/>
                     <Row>
                     <Col sm="2">
                       <Card.Text ><Link to={`/hi/${hi.HINo}`}><p style={{ color: 'black' }}><u>{hi.HIName}</u> </p> </Link> </Card.Text> 
                     </Col>
                     <Col sm="3">
                       <Card.Text>{hi.address}</Card.Text>
                     </Col>
                     <Col sm="2">
                       <Card.Text>{hi.HIOperatingHours}</Card.Text>
                     </Col>
                     <Col sm="2">
                       <Card.Text>{hi.HIContactNumber}</Card.Text>
                     </Col>
                     <Col sm="3">
                       <Card.Text>{hi.HIEmailAddress} </Card.Text>
                     </Col>
                   </Row>
                   </>
                    ))}
           
          </Card.Body>
        </Card>
        
        
        <Row className="d-flex justify-content-end mb-4" >
           {/* Pagination component */}
          <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
            {Array.from({ length: Math.ceil(hiData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === Math.ceil(hiData.length / itemsPerPage)} />
          </Pagination>


          <Col className="d-flex justify-content-end">
            <CreateHIModal/>
          </Col>
        </Row>
        
        
      </Col>
     
    </Row>
      
      </Col>
    </Row>
    </div>
  );
};

export default AdminHI;
