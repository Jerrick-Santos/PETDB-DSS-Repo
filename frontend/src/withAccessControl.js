import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import lock from './assets/lock.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";
// Define your access denied component
const AccessDenied = () => (

  <div className="justify-content-center">
     <Card className="mt-4 mb-4 text-center">
                      <Row className="mt-4 justify-content-center">
                        <Col>
                          <img
                            src={lock}
                            alt="No Results"
                            style={{ width: "120px", height: "120px" }}
                          />
                        </Col>
                      </Row>

                      <Card.Body>
                        <h1 style={{ fontSize: "20px", color: "#808080" }}>
                          {" "}
                          You are NOT authorized to access this page.{" "}
                        </h1>
                        <Link to="/">Go back to login</Link>
                      </Card.Body>
                    </Card>
   
  </div>
);

// Define your access control HOC
const withAccessControl = (WrappedComponent, allowedUserTypes) => {
  return function WithAccessControl(props) {
    const navigate = useNavigate(); // Use useNavigate for navigation
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage.');
        setIsLoading(false);
        return;
      }

      // Define headers with the JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch user information from the '/tokencontent' endpoint using Axios
      axios
        .get('http://localhost:4000/api/tokencontent', { headers })
        .then((response) => {
          const userType = response.data.user_type;
          setUser(userType);
          setIsLoading(false);

          if (!allowedUserTypes.includes(userType)) {
            // Navigate to a forbidden page or another appropriate route
            return <AccessDenied />;
          }
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
          setIsLoading(false);
        });
    }, [navigate, allowedUserTypes]);

    if (isLoading) {
      // You can add a loading indicator here if needed
      return <><Navbar style={{ backgroundColor: '#0077B6' }}>
      <Navbar.Brand className="text-light ms-4">PEDIA-TB DSS</Navbar.Brand>
      
      
    </Navbar>
    
    <div
                  className="text-center"
                  style={{ marginTop: "10vh", marginBottom: "10vh" }}
                >
                  <Spinner
                    animation="border"
                    variant="primary"
                    style={{ width: "5rem", height: "5rem" }}
                  />
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginTop: "1rem",
                      color: "#0077B6",
                    }}
                  >
                    Loading...
                  </p>
                </div></>;
    }

    // Render the WrappedComponent if the user has the correct user type
    if (allowedUserTypes.includes(user)) {
      return <WrappedComponent {...props} />;
    } else {
      // Render the access denied component
      return <AccessDenied />;
    }
  };
};

export default withAccessControl;
