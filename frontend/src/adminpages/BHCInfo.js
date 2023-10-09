import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AssignBHCModal from '../admincomponents/AssignBHCModal';
import Pagination from 'react-bootstrap/Pagination';
import Badge from "react-bootstrap/Badge";
import DeleteBHCHI from '../admincomponents/DeleteBHCHI';
import Spinner from "react-bootstrap/Spinner";

const BHCInfo = () => {

  const { id } = useParams();
  var bhcNum = id

  const [bhcData, setBhcData] = useState([]);
  const [bhchiData, setBhchiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/bhc/${bhcNum}`)
      .then((response) => {
        setBhcData(response.data[0])
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });

      axios.get(`http://localhost:4000/api/bhchi/${bhcNum}`)
      .then((response) => {
        setBhchiData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetchingdata:', error);
      });
    

}, []);

 

  ///PAGINATION LOGIC
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

  const maxPageLinks = 10;

  const totalPages = Math.ceil(bhchiData.length / itemsPerPage);

  // Define the number of page links to show before and after the active page
  const pageLinksToShow = maxPageLinks - 2; // Subtract 2 for Prev and Next buttons

  // Calculate the start and end page numbers to display
  let startPage = Math.max(
    1,
    Math.min(
      activePage - Math.floor(pageLinksToShow / 2),
      totalPages - pageLinksToShow + 1,
    ),
  );
  let endPage = Math.min(totalPages, startPage + pageLinksToShow - 1);

  // Adjust the start and end page numbers if they exceed the bounds
  if (endPage - startPage + 1 < pageLinksToShow) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, pageLinksToShow);
    } else {
      startPage = Math.max(1, totalPages - pageLinksToShow + 1);
    }
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );


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
        <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
        {isLoading ? (
                <div
                  className="text-center"
                  style={{ marginTop: "10vh", marginBottom: "10vh" }}
                >
                  <Spinner
                    animation="border"
                    variant="primary"
                    style={{ width: "4rem", height: "4rem" }}
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
                </div>
              ) : (
                <>
         {/* Shows the recommended next course of action */}
    <Row className="mt-5 justify-content-center">
      <Col lg="11">
      <h1 style={{fontSize:"35px"}}> Barangay Health Center Profile </h1>
      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="5">
                <Card.Text><strong>BHC Name</strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted "> {bhcData.BGYName} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong> Address </strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted"> {bhcData.address} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong>Operating Hours </strong> </Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted"> {bhcData.BGYOperatingHours} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong>Contact Number </strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted">{bhcData.BGYContactNumber} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong>Email Address </strong></Card.Text>
              </Col>
              <Col sm="7">
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
         
        </Row>


      <Card className="mt-4 mb-4">
          <Card.Body>
            <table className="table caption-top bg-white rounded mt-2 mb-0">
            <thead>
                            <tr>
                              <th scope="col">Health Institutions</th>
                              <th scope="col">Address</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
            
            <tbody>
            {bhchiData.slice(startIndex, endIndex).map((bhchi, index) => (
              
               <tr
                                  key={index}
                                >
                                   
                                  <td><Link to={`/hi/${bhchi.HINo}`}>
                                      <p style={{ color: "black" }}>
                                        <u>{bhchi.HIName}</u>{" "}
                                      </p>{" "}
                                    </Link>{" "}</td>
                             
                                  <td>{bhchi.address}</td>
                                 

                                  <td>
                                    <div className="d-flex justify-content-end">
                                      <DeleteBHCHI id={bhcNum} HINo={bhchi.HINo} HIName={bhchi.HIName}/>
                                    </div>
                                  </td>
                                </tr>
               
                   
                    ))}
                    </tbody>
                    </table>
           
           
           
        
            
          </Card.Body>
        </Card>
        
       
        
       <Row className="mb-4">
                    <Col>
  
                    
            <AssignBHCModal id={bhcNum} name={bhcData.BGYName} address={bhcData.address}/>
   
                    </Col>

                    <Col className="d-flex justify-content-end">
                      {bhchiData.length > 0 ? (
                        <Pagination className="mb-0">
                          <Pagination.Prev
                            onClick={() => handlePageChange(activePage - 1)}
                            disabled={activePage === 1}
                          />

                          {startPage > 1 && (
                            <>
                              <Pagination.Item
                                onClick={() => handlePageChange(1)}
                              >
                                1
                              </Pagination.Item>
                              {startPage > 2 && <Pagination.Ellipsis />}
                            </>
                          )}

                          {pageNumbers.map((pageNumber) => (
                            <Pagination.Item
                              key={pageNumber}
                              active={pageNumber === activePage}
                              onClick={() => handlePageChange(pageNumber)}
                            >
                              {pageNumber}
                            </Pagination.Item>
                          ))}

                          {endPage < totalPages && (
                            <>
                              {endPage < totalPages - 1 && (
                                <Pagination.Ellipsis />
                              )}
                              <Pagination.Item
                                onClick={() => handlePageChange(totalPages)}
                              >
                                {totalPages}
                              </Pagination.Item>
                            </>
                          )}

                          <Pagination.Next
                            onClick={() => handlePageChange(activePage + 1)}
                            disabled={activePage === totalPages}
                          />
                        </Pagination>
                      ) : null}
                    </Col>
                  </Row>
      </Col>
     
    </Row>
    </>
              )}
      
      </Col>
    </Row>



    </div>
  );
};

export default BHCInfo;
