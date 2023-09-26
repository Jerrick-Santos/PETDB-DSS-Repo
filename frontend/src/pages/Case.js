import '../index.css';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCaseModal from '../components/AddCaseModal';
import Badge from "react-bootstrap/Badge";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";

const Case = () => {

  const { id } = useParams();
  var patientNum = id
  const [isLoading, setIsLoading] = useState(true);
  const [caseData, setCaseData] = useState([]);
  const [showAddCase, setShowAddCase] = useState(false);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/patientcase/${patientNum}`)
      .then((response) => {
        setCaseData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    

}, []);

useEffect(() => {
  // Check if any case_status is 'O'
  const hasOpenCase = caseData.some(item => item.case_status === 'O');
  const hasDied = caseData.some(item => item.SRDescription === 'Died');
  // Set allClosed to false if there's an 'O', otherwise true
  setShowAddCase(!hasOpenCase && !hasDied);
}, [caseData]);
///PAGINATION LOGIC
  // Add these state variables
  const [activePage, setActivePage] = useState(1); // Active page number
  const itemsPerPage = 10; // Number of items per page

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxPageLinks = 10;

  const totalPages = Math.ceil(caseData.length / itemsPerPage);

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
      <NavBar/>

       {/* Navigation within the page, Patient Info Page is highlighted and directs user to another page when clicked */}
       <Row className="justify-content-center">
          <Col lg="10">
       
          <Navbar expand="sm" className="mt-4 pb-0">
            <Nav>
            <Link to={`/patient/${patientNum}`}>
            <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0"  }} type="button">
              <img src={user} className="mb-2" style={{height:"23px"}} alt="" /> Patient Profile 
            </button>
            </Link>

            <button className="btn ms-1" style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
              <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Cases
            </button>

            
            
            </Nav>
          
          </Navbar>
         
        </Col>
      </Row>
      
      {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
      <Row className="justify-content-center" >
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
        <Row className="mt-5 justify-content-center">
      <Col lg="8">
        <p style={{fontSize:"25px"}}> Cases </p>
      <Card>
        {/*TODO: Input Frontend Here and Delete all <br/>*/}
        <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
   
          <thead>
            <tr>
            <th scope="col">Case Reference Number</th>
            <th scope="col">Presumptive ID</th>
            <th scope="col">Latent ID</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {caseData.map((singleCase, index) => (
              <tr key={index}>
                <td><Link to={`/closecontacts/${singleCase.CaseNo}`}><u style={{ color:'black'}}>{singleCase.case_refno} </u></Link></td>
                <td>{singleCase.PRESref !== null ? <> {singleCase.PRESref } </>:singleCase.PRESref === null ? "---": null}</td>
                <td>{singleCase.LATENTref !== null ? <> {singleCase.LATENTref } </>:singleCase.LATENTref === null ? "---": null}</td>
                <td>{new Date(singleCase.formatStartDate).toLocaleDateString().replaceAll("/", "-")}</td>
                <td>{singleCase.end_date === null ? "---" : new Date(singleCase.end_date).toLocaleDateString().replaceAll("/", "-")}</td>
                <td>{singleCase.SRDescription === "Died" ? (
                                <Badge style={{ fontSize: 14 }} bg="danger">
                                  {" "}
                                  Died{" "}
                                </Badge>
                              ) : singleCase.SRDescription === "Ongoing" ? (
                                <Badge style={{ fontSize: 14 }} bg="success">
                                  {" "}
                                  Ongoing{" "}
                                </Badge>
                              ) : singleCase.SRDescription === "Lost to follow-up" ? (
                                <Badge style={{ fontSize: 14 }} bg="danger">
                                  {" "}
                                  Lost to follow-up{" "}
                                </Badge>
                              ) : singleCase.SRDescription === "Not Evaluated" ? (
                                <Badge style={{ fontSize: 14 }} bg="danger">
                                  {" "}
                                  Not Evaluated{" "}
                                </Badge>
                              ) : singleCase.SRDescription === "Cured" ? (
                                <Badge style={{ fontSize: 14 }} bg="danger">
                                  {" "}
                                  Cured{" "}
                                </Badge>
                              ) : singleCase.SRDescription === "Manual entry" ? (
                                <Badge style={{ fontSize: 14 }} bg="danger">
                                  {" "}
                                  Manual entry{" "}
                                </Badge>
                              ) : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </Card>
        <Row className="mt-3 mb-4">
                    <Col>
                    {showAddCase ?<AddCaseModal
              patientNo={patientNum}
          /> : null}
                    
                    </Col>

                    <Col className="d-flex justify-content-end">
                      {caseData.length > 0 ? (
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

export default Case;
