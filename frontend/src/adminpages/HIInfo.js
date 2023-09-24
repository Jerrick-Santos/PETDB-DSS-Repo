import search from '../assets/search.png';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import AdminNavBar from '../admincomponents/AdminNavBar';
import axios from 'axios';
import CreateBHCModal from '../admincomponents/CreateBHCModal';
import { Link, useParams } from 'react-router-dom';
import AssignBHCModal from '../admincomponents/AssignBHCModal';
import AssignHIModal from '../admincomponents/AssignHIModal';
import Pagination from 'react-bootstrap/Pagination';
import DeleteHIModal from '../admincomponents/DeleteHIModal';
import UpdateHIModal from '../admincomponents/UpdateHIModal';
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import noresult from "../assets/noresult.png";
import UpdateHIDGTest from '../admincomponents/UpdateHIDGTest';
import DeleteHIDGTest from '../admincomponents/DeleteHIDGTest';

const HIInfo = () => {

  const { id } = useParams();
  var hiNum = id

  const [hiData, setHiData] = useState([]);
  const [dtData, setDtData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {

  axios.get(`http://localhost:4000/api/hi/${hiNum}`)
  .then((response) => {
    setHiData(response.data[0])
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
  });

  axios.get(`http://localhost:4000/api/hitests/${hiNum}`)
    .then((response) => {
      setDtData(response.data)
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
  const itemsPerPage = 4; // Number of items per page

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxPageLinks = 10;

  const totalPages = Math.ceil(dtData.length / itemsPerPage);

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


  return (
    <div>
    <AdminNavBar/>

    <Row className="mt-5 justify-content-center" >
        <Col lg="9" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
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
    <Row className="mt-5 justify-content-center">
      <Col lg="9">
        <Row>
          <Col lg="10">
           <h1 style={{fontSize:"35px"}}> Health Institution Profile </h1>
          </Col>

          <Col className="d-flex justify-content-end">
              <UpdateHIModal  HINo={hiData.HINo} HIName={hiData.HIName} HIOperatingHours={hiData.HIOperatingHours}
                              XCoord={hiData.XCoord} YCoord={hiData.YCoord} HIContactPerson={hiData.HIContactPerson}
                              HIContactNumber={hiData.HIContactNumber} HIEmailAddress={hiData.HIEmailAddress} isActive={hiData.isActive} 
                              HIUnitNo={hiData.HIUnitNo} HIBarangay={hiData.HIBarangay} HICity={hiData.HICity} HIStreet={hiData.HIStreet} 
                              HIProvince={hiData.HIProvince} HIRegion={hiData.HIRegion} HIZipCode={hiData.HIZipCode}/>
               <DeleteHIModal HINo={hiData.HINo} HIName={hiData.HIName} isActive={hiData.isActive}/>
          </Col>
         
          
         

        </Row>
      
      <Card className="mt-4 mb-4">
          <Card.Body>
            <Row>
              <Col sm="5">
                <Card.Text><strong>Health Institution:</strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted "> {hiData.HIName}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong> Address </strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted"> {hiData.address} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong>Operating Hours </strong> </Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted"> {hiData.HIOperatingHours} </Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong>Contact Person </strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted">{hiData.HIContactPerson}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong>Contact Number </strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted">{hiData.HIContactNumber}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong>Email Address </strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted">{hiData.HIEmailAddress}</Card.Text>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm="5">
                <Card.Text><strong> Status </strong></Card.Text>
              </Col>
              <Col sm="7">
                <Card.Text className="text-muted">{hiData.isActive === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        Active{" "}
                                      </Badge>
                                    ) : hiData.isActive === 0 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        Deactivated{" "}
                                      </Badge>
                                    ) : null}</Card.Text>
              </Col>
            </Row>
        
            
          </Card.Body>
        </Card>

        <h1 style={{fontSize:"25px"}}> Diagnostic Tests Offered </h1>
        {dtData.length > 0 ? (
      <Card className="mt-4 mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Diagnostic Tests</th>
                              <th scope="col">Estimated Price</th>
                              <th scope="col">Accepting Voucher</th>
                              <th scope="col">Status</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
                            {dtData.slice(startIndex, endIndex).map((dt, index) => (
                                <tr key={index}>
                                  <td>
                                  {dt.DGTestName}
                                  </td>
                                  <td>PHP {dt.Price}</td>
                                  <td>{dt.AcceptingVoucher === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        Yes{" "}
                                      </Badge>
                                    ) : dt.AcceptingVoucher === 2  ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        No{" "}
                                      </Badge>
                                    ) : null}</td>
                                  <td>{dt.isActive === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        Active{" "}
                                      </Badge>
                                    ) : dt.isActive === 0  ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        Deactivated{" "}
                                      </Badge>
                                    ) : null}</td>
                                  <td>
                                  {hiData.isActive === 1 ? (
                                    <>
                                    <UpdateHIDGTest HINo={dt.HINo} DGTestNo={dt.DGTestNo} AcceptingVoucher={dt.AcceptingVoucher}
                                                    Price={dt.Price} isActive={dt.isActive} DGTestName={dt.DGTestName}/>
                                    <DeleteHIDGTest DGTestName={dt.DGTestName} HINo={dt.HINo} DGTestNo={dt.DGTestNo} isActive={dt.isActive}/>
                                    </>
                                    ): null}
                                    </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
          
           
           
        
            
          </Card.Body>
        </Card>
        ): (
          <Card className="mt-4 mb-4 text-center">
            <Row className="mt-4 justify-content-center">
              <Col>
                <img
                  src={noresult}
                  alt="No Results"
                  style={{ width: "70px", height: "70px" }}
                />
              </Col>
            </Row>

            <Card.Body>
              <h1 style={{ fontSize: "20px", color: "#808080" }}>
                {" "}
                No Tests Offered{" "}
              </h1>
            </Card.Body>
          </Card>
        )}
        
        <Row className="mb-4">
                    <Col>
                    {hiData.isActive === 1 ? (
                    <AssignHIModal id={hiNum} name={hiData.HIName} address={hiData.address}/>
                    ): null}
                    </Col>

                    <Col className="d-flex justify-content-end">
                      {dtData.length > 0 ? (
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

export default HIInfo;
