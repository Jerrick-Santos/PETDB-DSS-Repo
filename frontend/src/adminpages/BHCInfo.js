import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import CreateBHCModal from '../admincomponents/CreateBHCModal';
import { Link, useParams } from 'react-router-dom';
import AssignBHCModal from '../admincomponents/AssignBHCModal';
import Pagination from 'react-bootstrap/Pagination';

const BHCInfo = () => {

  const { id } = useParams();
  var bhcNum = id

  const [bhcData, setBhcData] = useState([]);
  const [bhchiData, setBhchiData] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/bhc/${bhcNum}`)
      .then((response) => {
        setBhcData(response.data[0])
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    

}, []);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/bhchi/${bhcNum}`)
      .then((response) => {
        setBhchiData(response.data)
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
      <h1 style={{fontSize:"35px"}}> Barangay Health Center Profile </h1>
      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text><strong>BHC Name</strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted "> {bhcData.BGYName} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong> Address </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted"> {bhcData.address} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Operating Hours </strong> </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted"> {bhcData.BGYOperatingHours} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Contact Number </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{bhcData.BGYContactNumber} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Email Address </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{bhcData.BGYEmailAddress} </Card.Text>
              </Col>
            </Row>
        
            
          </Card.Body>
        </Card>

        <h1 style={{fontSize:"25px"}}> Nearby Health Institutions </h1>
      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text><strong>Health Institutions</strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text><strong>Address</strong></Card.Text>
              </Col>
              
            </Row>
            {bhchiData.map((bhchi, index) => (
              <>
               <hr />
            <Row>
              <Col sm="6">
                <Card.Text>{index+1}. {bhchi.HIName} </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text>{bhchi.address} </Card.Text>
              </Col>

            </Row>
                   </>
                    ))}
           
           
           
        
            
          </Card.Body>
        </Card>
        
        <Row className="d-flex justify-content-end mb-4" >
          <Col className="d-flex justify-content-end">
            <AssignBHCModal id={bhcNum} name={bhcData.BGYName} address={bhcData.address}/>
          </Col>
        </Row>
        
        
      </Col>
     
    </Row>
      
      </Col>
    </Row>



    </div>
  );
};

export default BHCInfo;
