import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';

// Define your access denied component
const AccessDenied = () => (
  <div>
    <p>You are NOT authorized to access this page.</p>
    {/* Optionally, you can provide a link back to the login page */}
    <Link to="/">Go back to login</Link>
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
      return <NavBar/>;
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
