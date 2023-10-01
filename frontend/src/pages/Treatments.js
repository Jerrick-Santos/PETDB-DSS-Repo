import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import noresult from "../assets/noresult.png";
import add from '../assets/add.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CaseHeader from '../components/CaseHeader'
import AddTreatmentModal from '../components/AddTreatmentModal';
import UpdateTreatment from '../components/UpdateTreatment';
import DeleteTreatment from '../components/DeleteTreatment';
import Spinner from "react-bootstrap/Spinner";
import Pagination from 'react-bootstrap/Pagination';
import test from "../assets/test.png";
import diagnose from "../assets/diagnose.png";
import similar from "../assets/similar.png";

const Treatments = () => {

  const { id } = useParams();
  var caseNum = id

  const [treatmentsData, setTreatmentsData] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:4000/api/treatments/${caseNum}`)
    .then(res => {
      console.log(res);
      setTreatmentsData(res.data);
    })
    .catch(err => {
      console.error(err);
    })

    axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
    .then(res => {
      console.log(res);
      setCaseData(res.data[0]);
      setIsLoading(false)
    })
    .catch(err => {
      console.error(err);
    })
  }, [caseNum])
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

  const totalPages = Math.ceil(treatmentsData.length / itemsPerPage);

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
          <Link to={`/closecontacts/${caseNum}`}>
          <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={distance} className="mb-1" style={{height:"25px"}} alt="" /> Close Contacts
          </button>
          </Link>
          <Link to={`/assessment/${caseNum}`}>
          <button className="btn ms-1" style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
            <img src={assessment} className="mb-1" style={{height:"25px"}} alt="" /> Assessment
          </button>
          </Link>
          <Link to={`/labtest/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={test} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          </Link>
          <Link to={`/diagnosis/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={diagnose} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <button className="btn ms-1 " style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatment History
          </button>
          <Link to={`/similarcases/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={similar} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
          </Link>
          
          
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
     <CaseHeader caseNo={caseNum} case_refno={caseData.case_refno} PatientNo={caseData.PatientNo} patient_name={caseData.patient_name}
                  start_date={caseData.start_date} end_date={caseData.end_date} case_status={caseData.case_status}
                  PRESref={caseData.PRESref} LATENTref={caseData.LATENTref}/>
     
      
      
      
      
      
      {/* Treatments*/}
      
      {/* Symptoms of the Patient */}
      <Row className="mt-5 justify-content-center">
     

    {/* Laboratory Tests of the Patient*/}
      <Col lg="9">
      <p style={{fontSize:"25px"}}> Treatments </p>
      {treatmentsData.length > 0 ? (
        <Card className="mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Medicine</th>
                              <th scope="col">Dosage</th>
                              <th scope="col">Frequency</th>
                              <th scope="col">Date Started</th>
                              <th scope="col">Date Ended</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
          
            
            {treatmentsData.map((data, index) => (
               <>
               <tr key={index}>
                                  <td>
                                  {data.Medicine}
                                  </td>
                                  <td> {data.Dosage}</td>
                                  <td> {data.Frequency}</td>
                                  <td>{new Date(data.StartDate).toLocaleDateString()}</td>
                                  <td>{new Date(data.EndDate).toLocaleDateString()}</td>
                                    <td>           
                                    <UpdateTreatment/>
                                    <DeleteTreatment/> </td>
                                </tr>
                   </>
              
                    ))}
          </tbody>
                        </table>
          </Card.Body>
          

          
        </Card>
        ) : (
                    <Card className="mt-4 mb-4 text-center">
                      <Row className="mt-4 justify-content-center">
                        <Col>
                          <img
                            src={noresult}
                            alt="No Results"
                            style={{ width: "120px", height: "120px" }}
                          />
                        </Col>
                      </Row>

                      <Card.Body>
                        <h1 style={{ fontSize: "20px", color: "#808080" }}>
                          {" "}
                          No Treatments Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}

<Row className="mb-4">
                    
                   <Col>
                    {caseData.case_status === 'O' ? (
          <>
            <AddTreatmentModal caseID={caseNum}/>
          </>
        ) : (
          null
        )}   
        </Col>
                  <Col className="d-flex justify-content-end">
                    {treatmentsData.length > 0 ? (
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

export default Treatments;
