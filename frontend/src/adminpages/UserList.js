import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import CreateBHCModal from '../admincomponents/CreateBHCModal';
import { Link, useParams } from 'react-router-dom';


const UserList = () => {

  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/users/1")
      .then(response => {
        setUsersData(response.data);
      })
      .catch(error => {
        console.error('Error fetching BHCs:', error);
      });
  }, []);


  return (
    <div>
    <AdminNavBar/>

    <Row className="mt-5 justify-content-center" >
        <Col lg="11" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
      
         {/* Shows the recommended next course of action */}
    <Row className="mt-5 justify-content-center">
      <Col lg="11">
      <h1 style={{fontSize:"35px"}}> Barangay Health Workers (Users) </h1>
        <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="2">
                <Card.Text><strong>Fullname</strong> </Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text><strong>Username</strong> </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text><strong>Account Status</strong> </Card.Text>
              </Col>
            </Row>
            {bhcData.map((bhc, index) => (
              <>
              <hr/>
                     <Row>
                     <Col sm="2">
                       <Card.Text ><Link to={`/bhc/${bhc.BGYNo}`}><p style={{ color: 'black' }}><u>{bhc.BGYName}</u> </p> </Link> </Card.Text> 
                     </Col>
                     <Col sm="3">
                       <Card.Text>{bhc.address}</Card.Text>
                     </Col>
                     <Col sm="2">
                       <Card.Text>{bhc.BGYOperatingHours}</Card.Text>
                     </Col>
                     <Col sm="2">
                       <Card.Text>{bhc.BGYContactNumber}</Card.Text>
                     </Col>
                     <Col sm="3">
                       <Card.Text>{bhc.BGYEmailAddress} </Card.Text>
                     </Col>
                   </Row>
                   </>
                    ))}
           
          </Card.Body>
        </Card>
        
        <Row className="d-flex justify-content-end mb-4" >
          <Col className="d-flex justify-content-end">
            <CreateBHCModal/>
          </Col>
        </Row>
        
        
      </Col>
     
    </Row>
      
      </Col>
    </Row>



    </div>
  );
};

export default UserList;
