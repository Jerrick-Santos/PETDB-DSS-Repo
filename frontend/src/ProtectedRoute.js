import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component, allowedUserTypes, ...rest }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage.');
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
        console.log(allowedUserTypes);
        console.log(userType); // Log userType after setting it
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    // You can add a loading indicator here if needed
    return <div>Loading...</div>;
  }

  console.log("USER:" + user)

  // Check if the user's user type is allowed for this route
  if (user && allowedUserTypes.includes(user)) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    // Display an error message when the user is not authorized
    return (
      <div>
        <h2>You are NOT authorized to access this page.</h2>
        {/* Optionally, you can provide a link back to the login page */}
        {/* <Link to="/">Go back to login</Link> */}
      </div>
    );
  }
};

export default ProtectedRoute;
