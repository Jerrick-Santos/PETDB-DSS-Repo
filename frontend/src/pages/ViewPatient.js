import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';



const ViewPatient = () => {

    const [patientsData, setPatientsData] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:4000/api/allpatients")
        .then(response => {
          setPatientsData(response.data);
        })
        .catch(error => {
          console.error('Error fetching patients:', error);
        });
    }, []);

    console.log(patientsData)
   

  return (
    <div>
    <NavBar/>
    <div className='px-3'>
    
     {/* Showing 4 summary cards which will have a clickable function that affects the overall patient table
        once backend has been implemented*/}
    
    {/* Simple search based on a keyword and a button for advanced Search*/}
    <div className="d-flex ms-2 mb-2 mt-5">
    <div className="input-group" style={{ maxWidth: '290px' }}>
        {/* Adjust the max-width to control the width of the input field */}
        <input type="search"  className="form-control" id="searchInput" placeholder="Keyword" />
        <button className="btn me-auto" style={{ color: "white", backgroundColor: '#0077B6' }} type="button">  <img src={search} style={{height:"20px"}}alt="" /></button>
    </div>
    <div className="ms-4">
        {/* Adjust the width of the Advanced Search button */}
        <button className="btn" style={{ color: "white", backgroundColor: '#0077B6' }} type="button">Advanced Search</button>
    </div>
    </div>



    {/* Showing overall patient records in a table formatting. Hard-coded for frontend. Revise once backend
        is implemented */}
    <table className="table caption-top bg-white rounded mt-2 ms-4">
    <caption className=' fs-4'>Patient Records</caption>
    <thead>
                    <tr>
                        <th scope="col">Full Name</th>    
                        <th scope="col">Birthdate</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Age</th>
                        <th scope="col">Mother's Name</th>
                        <th scope="col">Father's Name</th>
                        <th scope="col">Emergency Contact's Name</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Case Status</th>
                    </tr>
                </thead>
                <tbody>
                    {patientsData.map((patient, index) => (
                    <tr key={index}>
                        <td>
                        <Link to={`/patient/${patient.PatientNo}`}>
                            <p style={{ color: 'black' }}>
                            <u>{patient.fullname}</u>
                            </p>
                        </Link>
                        </td>
                        <td>{new Date(patient.birthdate).toLocaleDateString()}</td>

                        <td>{patient.sex === 'M' ? 'Male' : 'Female'}</td>
                        <td>{patient.age}</td>
                        <td>{patient.mother_name}</td>
                        <td>{patient.father_name}</td>
                        <td>{patient.emergency_name}</td>
                        <td>{new Date(patient.admission_date).toLocaleDateString()}</td>
                        <td>{patient.status === 'O' ? 'Closed Case' : 'Active Case'}</td>

                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ViewPatient;
