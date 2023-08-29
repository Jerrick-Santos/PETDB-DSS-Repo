import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import CreateBHCModal from '../admincomponents/CreateBHCModal';
import { Link, useParams } from 'react-router-dom';
import AssignBHCModal from '../admincomponents/AssignBHCModal';
import Pagination from 'react-bootstrap/Pagination';

const BHCInfo = () => {

  const { id } = useParams();
  var bhcNum = id

  const [bhcData, setBhcData] = useState([]);
  const [bhchiData, setBhchiData] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/bhc/${bhcNum}`)
      .then((response) => {
        setBhcData(response.data[0])
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    

}, []);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/bhchi/${bhcNum}`)
      .then((response) => {
        setBhchiData(response.data)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetchingdata:', error);
      });
    

  }, []);

      // Add these state variables
    const [activePage, setActivePage] = useState(1); // Active page number
    const itemsPerPage = 5; // Number of items per page

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
    };

    // Calculate the index range for the current page
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [searchTerm, setSearchTerm] = useState('');

        const handleChange = (e) => {
            setSearchTerm(e.target.value)
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            axios.get(`http://localhost:4000/api/searchbhchi/${bhcNum}/${searchTerm}`).then(response => {
                    setBhchiData(response.data);
                    console.log("added")
                  })
                  .catch(error => {
                    console.error('Error searching patient:', error);
                  });
        }


  return (
    <div>
    <AdminNavBar/>

    <Row className="mt-5 justify-content-center" >
        <Col lg="9" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
      
         {/* Shows the recommended next course of action */}
    <Row className="mt-5 justify-content-center">
      <Col lg="9">
      <h1 style={{fontSize:"35px"}}> Barangay Health Center Profile </h1>
      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text><strong>BHC Name</strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted "> {bhcData.BGYName} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong> Address </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted"> {bhcData.address} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Operating Hours </strong> </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted"> {bhcData.BGYOperatingHours} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Contact Number </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{bhcData.BGYContactNumber} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="6">
                <Card.Text><strong>Email Address </strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted">{bhcData.BGYEmailAddress} </Card.Text>
              </Col>
            </Row>
        
            
          </Card.Body>
        </Card>

        <h1 className="mt-5" style={{fontSize:"25px"}}> Nearby Health Institutions </h1>
        <Row className="mt-4">
        <Col lg="7">
        <form>
            <div className="input-group" style={{ maxWidth: '290px' }}>
                {/* Adjust the max-width to control the width of the input field */}
                <input type="search"  className="form-control" name="searchTerm" value={searchTerm} onChange={handleChange} placeholder="Search" />
                <button className="btn me-auto" style={{ color: "white", backgroundColor: '#0077B6' }} onClick={handleSubmit} type="submit">  <img src={search} style={{height:"20px"}}alt="" /></button>
            </div>
        </form>
        </Col>
          <Col  lg="5">
            <AssignBHCModal id={bhcNum} name={bhcData.BGYName} address={bhcData.address}/>
          </Col>
        </Row>


      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="6">
                <Card.Text><strong>Health Institutions</strong></Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text><strong>Address</strong></Card.Text>
              </Col>
              
            </Row>
            {bhchiData.slice(startIndex, endIndex).map((bhchi, index) => (
              <>
               <hr />
            <Row>
              <Col sm="6">
                <Card.Text>{bhchi.HIName} </Card.Text>
              </Col>
              <Col sm="6">
                <Card.Text>{bhchi.address} </Card.Text>
              </Col>

            </Row>
                   </>
                    ))}
           
           
           
        
            
          </Card.Body>
        </Card>
        
       
        
        <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
            {Array.from({ length: Math.ceil(bhchiData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === Math.ceil(bhchiData.length / itemsPerPage)} />
          </Pagination>
      </Col>
     
    </Row>
      
      </Col>
    </Row>



    </div>
  );
};

export default BHCInfo;
