import '../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import NavBar from '../components/NavBar';
import banner from '../assets/banner.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';

const Login = () => {

    const [selectedRole, setSelectedRole] = useState('');

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
      };
    



  return (

<div style={{ backgroundColor:'#0077B6' , minHeight:" 100vh"}}>
    <Row className="pt-5">
        <img src={banner} style={{opacity:"1"}}/>
    </Row>
      <form>
        <Row className="justify-content-center">
          <Col lg="4" className='mt-5' style={{ backgroundColor: 'white', color: '#0077B6', borderRadius: '20px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>Log In</h2>

            <div className="mt-3">
            <label><strong>Role: </strong></label>
            <select className="form-select" value={selectedRole} onChange={handleRoleChange}>
                <option value="">Select</option>
                <option value="/adminbhc">Administrator</option>
                <option value="/home">Healthcare Worker</option>
            </select>
            </div>

            <div className="d-flex justify-content-end">
            <Link to={selectedRole}>
            <Button type="submit" className="mt-4" style={{ color: 'white', backgroundColor: "#0077B6" }}><strong>Log In</strong></Button>
            </Link>
            </div>
        
          </Col>
        </Row>
      </form>
    </div>

  );
};

export default Login;
