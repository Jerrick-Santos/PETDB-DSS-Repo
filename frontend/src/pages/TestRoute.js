import React from 'react';
import axios from 'axios';

const TestRoute = () => {
  const handleButtonClick = async () => {
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage.');
        return;
      }

      // Define headers with the JWT token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make an Axios GET request to the /test route with the token in headers
      const response = await axios.get('http://localhost:4000/api/tokencontent', { headers });

      // Handle the response data
      console.log('Response:', response.data);
      console.log('userid:', response.data.userNo);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Trigger /test Route</button>
    </div>
  );
};

export default TestRoute;
