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

  const handleLogin = (event) => {
    event.preventDefault();

    // Hardcoded credentials for demonstration purposes
    if (username === '1' && password === 'abc') {
      // Redirect to /home for username 1
      window.location.href = '/home';
    } else if (username === '2' && password === 'abc') {
      // Redirect to /adminbhc for username 2
      window.location.href = '/adminbhc';
    } else {
      // Handle incorrect login
      alert('Incorrect username or password');
    }
  };

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
      </form>
    </div>
  );
};

export default Login;
