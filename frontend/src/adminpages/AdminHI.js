import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import AddBHCModal from '../admincomponents/CreateBHCModal';
import CreateHIModal from '../admincomponents/CreateHIModal';
import { Link, useParams } from 'react-router-dom';



const AdminHI = () => {
  const [hiData, setHiData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/allhi")
      .then(response => {
        setHiData(response.data);
      })
      .catch(error => {
        console.error('Error fetching HIs:', error);
      });
  }, []);

  console.log(hiData)
  

  return (
    <div>
    <AdminNavBar/>
    <Row className="mt-5 justify-content-center" >
        <Col lg="11" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
      
         {/* Shows the recommended next course of action */}
    <Row className="mt-5 justify-content-center">
      <Col lg="11">
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
            {hiData.map((hi, index) => (
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
