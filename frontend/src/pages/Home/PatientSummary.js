

import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';



const PatientSummary = () => {

    const [patientsData, setPatientsData] = useState([]);

   

  return (
    <div>
    <NavBar/>
    <div className='px-3'>
    
     {/* Showing 4 summary cards which will have a clickable function that affects the overall patient table
        once backend has been implemented*/}
   <div className='d-flex justify-content-center'>
    <div className='container-fluid justify-content-center'>
        <div className='row g-3 my-2 justify-content-center'>
            <div className='col-md-2 p-1'>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{ backgroundColor: '#03045E' }}>
                    <div>
                        <h3 className='text-light fs-1'>25</h3>
                        <p className='text-light fs-5'>Presumptive TB Cases</p>
                    </div>
                    <i className='bi bi-cart-plus p-3 fs-1'></i>
                </div>
            </div>
            <div className='col-md-2 p-1'>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{ backgroundColor: '#0077B6' }}>
                    <div>
                        <h3 className='text-light fs-1'>10</h3>
                        <p className='text-light fs-5'>Latent TB Cases</p>
                    </div>
                    <i className='bi bi-currency-dollar p-3 fs-1'></i>
                </div>
            </div>
            
            <div className='col-md-2 p-1'>
            <   Link to={"/home1"}>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{ backgroundColor: '#03045E' }}>
                    <div>
                        <h3 className='text-light fs-1'>15</h3>
                        <p className='text-light fs-5'>Pulmonary TB Cases</p>
                    </div>
                    <i className='bi bi-truck p-3 fs-1'></i>
                </div>
                </Link>
            </div>
            
           
            <div className='col-md-2 p-1'>
            <Link to={"/home2"}>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{ backgroundColor: '#0077B6' }}>
                    <div>
                        <h3 className='text-light fs-1'>20</h3>
                        <p className='text-light fs-5'>ExtraPulmonary TB Cases</p>
                    </div>
                    <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
                </div>
                </Link>
            </div>
          
            
            <div className='col-md-2 p-1'>
            <Link to={"/home3"}>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{ backgroundColor: '#03045E' }}>
                    <div>
                        <h3 className='text-light fs-1'>20</h3>
                        <p className='text-light fs-5'>Closed Cases</p>
                    </div>
                    <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
                </div>
                </Link>
            </div>
          
        </div>
    </div>
</div>


    </div>
    </div>
  );
};

export default PatientSummary;
