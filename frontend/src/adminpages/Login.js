import '../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import banner from '../assets/banner.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/login', { username, password });

      // Assuming the server responds with a JWT token upon successful login
      const { accessToken, user_type, BGYNo } = response.data;
      console.log(response.data)
      // Store the token securely (e.g., in a secure HTTP cookie or local storage)
      // Here, we are storing it in local   for demonstration purposes
      localStorage.setItem('token', accessToken);
  
            // Set the token in the Axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log(user_type)
          // Perform redirection based on the 'user_type' received from the server
      if (user_type === 'BHW') {
        // Redirect to /home for users with 'BHW' user type
        window.location.href = '/home';
      } else if (user_type === 'admin'){
        // Redirect to another page for users with different user types
        // Replace '/other-page' with the appropriate URL
        window.location.href = `/bhc/${BGYNo}`;
      }

    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Incorrect username or password');
    }
  };


  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:4000/api/login', { username, password });

  //     // Assuming the server responds with a JWT token upon successful login
  //     const { accessToken, user_type, BGYNo } = response.data;
  //     console.log(response.data)

  //     // Store the token securely (e.g., in a secure HTTP cookie or local storage)
  //     // Here, we are storing it in local storage for demonstration purposes
  //     localStorage.setItem('token', accessToken);

  //     // Set the token in the Axios default headers
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  //     console.log(user_type)
      
  //     // Perform redirection based on the 'user_type' received from the server
  //     if (user_type === 'BHW') {
  //       // Redirect to /home for users with 'BHW' user type
  //       window.location.href = '/home';
  //     } else if (user_type === 'admin'){
  //       // Redirect to another page for users with different user types
  //       // Replace '/other-page' with the appropriate URL
  //       window.location.href = `/bhc/${BGYNo}`;
  //     }

  //   } catch (error) {
  //     console.error('Login failed:', error.message);
  //     alert('Incorrect username or password');
  //   }
  // };

  return (
    <div style={{ backgroundColor: '#0077B6', minHeight: '100vh' }}>
      <Row className="pt-5">
        <img src={banner} style={{ opacity: '1' }} alt="Banner" />
      </Row>
      <form onSubmit={handleLogin}>
        <Row className="justify-content-center">
          <Col
            lg="4"
            className="mt-5"
            style={{
              backgroundColor: 'white',
              color: '#0077B6',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Log In</h2>

            <div className="mt-3">
              <label>
                <strong>Username:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="mt-3">
              <label>
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <Row> 
              <Col>
              <Link to={"/newbhc"}> <u className="d-flex clickable mt-4 me-4">Sign Up</u></Link>
              </Col>
           <Col>
            <div className="d-flex justify-content-end">
              
              
              
              <Button
                type="submit"
                className="mt-4"
                style={{ color: 'white', backgroundColor: '#0077B6' }}
              >
                <strong>Log In</strong>
              </Button>
            </div>
            </Col>
            </Row>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default Login;
