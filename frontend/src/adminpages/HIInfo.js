import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import CreateBHCModal from '../admincomponents/CreateBHCModal';
import { Link, useParams } from 'react-router-dom';
import AssignBHCModal from '../admincomponents/AssignBHCModal';
import AssignHIModal from '../admincomponents/AssignHIModal';
import Pagination from 'react-bootstrap/Pagination';

const HIInfo = () => {

  const { id } = useParams();
  var hiNum = id

  const [hiData, setHiData] = useState([]);
  const [dtData, setDtData] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/hi/${hiNum}`)
      .then((response) => {
        setHiData(response.data[0])
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    

}, []);

useEffect(() => {

  axios.get(`http://localhost:4000/api/hitests/${hiNum}`)
    .then((response) => {
      setDtData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });
  

}, []);



  return (
    <div>
    <AdminNavBar/>

    <Row className="mt-5 justify-content-center" >
        <Col lg="9" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
      
         {/* Shows the recommended next course of action */}
    <Row className="mt-5 justify-content-center">
      <Col lg="9">
      <h1 style={{fontSize:"35px"}}> Health Institution Profile </h1>
      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text><strong>Health Institution:</strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted "> {hiData.HIName}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong> Address </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted"> {hiData.address} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Operating Hours </strong> </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted"> {hiData.HIOperatingHours} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Contact Number </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{hiData.HIContactNumber}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Email Address </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{hiData.HIEmailAddress}</Card.Text>
              </Col>
            </Row>
        
            
          </Card.Body>
        </Card>

        <h1 style={{fontSize:"25px"}}> Diagnostic Tests Offered </h1>
      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="5">
                <Card.Text><strong>Diagnostic Tests</strong></Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text><strong>Price</strong></Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text><strong>Accepting Voucher</strong></Card.Text>
              </Col>
              
            </Row>
            
            {dtData.map((dt, index) => (
              <>
               <hr />
            <Row>
              <Col sm="5">
                <Card.Text>{dt.DGTestName}</Card.Text>
              </Col>
              <Col sm="4">
                <Card.Text>PHP {dt.Price}</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>{dt.AcceptingVoucher} </Card.Text>
              </Col>

            </Row>
                   </>
                    ))}
           
           
        
            
          </Card.Body>
        </Card>
        
        <Row className="d-flex justify-content-end mb-4" >
          <Col className="d-flex justify-content-end">
            <AssignHIModal id={hiNum} name={hiData.HIName} address={hiData.address}/>
          </Col>
        </Row>
        
        
      </Col>
     
    </Row>
      
      </Col>
    </Row>



    </div>
  );
};

export default HIInfo;
