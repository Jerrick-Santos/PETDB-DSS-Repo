import search from '../assets/search.png';
import '../index.css';
import React from 'react';
import NavBar from '../components/NavBar';

const PatientSummary = () => {

   
  return (
    <div>
    <NavBar/>
    <div className='px-3'>
    
     {/* Showing 4 summary cards which will have a clickable function that affects the overall patient table
        once backend has been implemented*/}
    <div className='container-fluid'>
        <div className='row g-3 my-2'>
            <div className='col-md-3 p-1'>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor: '#03045E'}}>
                    <div>
                        <h3 className='text-light fs-2'>230</h3>
                        <p className='text-light fs-5'>Total Number of Patients</p>
                    </div>
                    <i className='bi bi-cart-plus p-3 fs-1'></i>
                </div>
            </div>
            <div className='col-md-3 p-1'>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor: '#0077B6'}}>
                    <div>
                        <h3 className='text-light fs-2'>2450</h3>
                        <p className='text-light fs-5'>Patients with Active Cases</p>
                    </div>
                    <i className='bi bi-currency-dollar p-3 fs-1'></i>
                </div>
            </div>
            <div className='col-md-3 p-1'>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded'style={{backgroundColor: '#03045E'}}>
                    <div>
                        <h3 className='text-light fs-2'>2250</h3>
                        <p className='text-light fs-5'>Patients with Ongoing Treatments</p>
                    </div>
                    <i className='bi bi-truck p-3 fs-1'></i>
                </div>
            </div>
            <div className='col-md-3 p-1'>
                <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor: '#0077B6'}}>
                    <div>
                        <h3 className='text-light fs-2'>200</h3>
                        <p className='text-light fs-5'>Patients with Closed Cases</p>
                    </div>
                    <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
                </div>
            </div>
            
        </div>
    </div>


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
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Middle Initial</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Sex</th>
                        <th scope="col">Age</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                <tr className="clickable-row" onClick={() => window.location.href = "link-to-details-page-for-row-1"}>
                        <th scope="row">1</th>
                        <td>Emma </td>
                        <td>Johnson</td>
                        <td>E</td>
                        <td>Em</td>
                        <td>2015-08-10</td>
                        <td>Female</td>
                        <td>7</td>
                        <td>Closed Case</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Noah</td>
                        <td>Smith</td>
                        <td>N</td>
                        <td>Noah</td>
                        <td>2014-06-20</td>
                        <td>Male</td>
                        <td>8</td>
                        <td>Ongoing Treatment</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Ava</td>
                        <td>Williams</td>
                        <td>A</td>
                        <td>Avie</td>
                        <td>2016-11-30</td>
                        <td>Female</td>
                        <td>5</td>
                        <td>Ongoing Treatment</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Liam</td>
                        <td>Miller</td>
                        <td>L</td>
                        <td>Lili</td>
                        <td>2017-08-15</td>
                        <td>Male</td>
                        <td>4</td>
                        <td>Ongoing Treatment</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Mia</td>
                        <td>Johnson</td>
                        <td>M</td>
                        <td>Mia</td>
                        <td>2018-03-10</td>
                        <td>Female</td>
                        <td>3</td>
                        <td>Ongoing Treatment</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>Ethan</td>
                        <td>Davis</td>
                        <td>E</td>
                        <td>Ethan</td>
                        <td>2019-09-25</td>
                        <td>Male</td>
                        <td>2</td>
                         <td>Ongoing Treatment</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default PatientSummary;
