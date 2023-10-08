import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AddXrayModal from '../components/AddXrayModal';
import AddIGRAModal from '../components/AddIGRAModal';
import AddMTBRIFModal from '../components/AddMTBRIFModal';
import AddTSTModal from '../components/AddTSTModal';
import AddDSTModal from '../components/AddDSTModal';
import CaseHeader from '../components/CaseHeader'
import Pagination from 'react-bootstrap/Pagination';
import DeleteTest from '../components/DeleteTest';
import UpdateIGRA from '../components/UpdateIGRA';
import UpdateTST from '../components/UpdateTST';
import UpdateMTBRIF from '../components/UpdateMTBRIF';
import UpdateXray from '../components/UpdateXray';
import UpdateDST from '../components/UpdateDST';
import Badge from "react-bootstrap/Badge";
import noresult from "../assets/noresult.png";
import Spinner from "react-bootstrap/Spinner";
import test from "../assets/test.png";
import diagnose from "../assets/diagnose.png";
import similar from "../assets/similar.png";

const LaboratoryTest = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();
  var caseNum = id
  const [isLoading, setIsLoading] = useState(true);
  const [caseData, setCaseData] = useState([]);
  const [xrayData, setXrayData] = useState([]);
  const [tstData, setTstData] = useState([]);
  const [mtbData, setMtbData] = useState([]);
  const [igraData, setIgraData] = useState([]);
  const [dstData, setDstData] = useState([]);
  const [testAdded, setTestAdded] = useState(false);

  const [activeTab, setActiveTab] = useState('xray'); 
  
  useEffect(() => {

    axios.get(`http://localhost:4000/api/testresults/${caseNum}/1`)
    .then((response) => {
      setXrayData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });

    axios.get(`http://localhost:4000/api/testresults/${caseNum}/2`)
    .then((response) => {
      setMtbData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });

    axios.get(`http://localhost:4000/api/testresults/${caseNum}/3`)
    .then((response) => {
      setTstData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });

    axios.get(`http://localhost:4000/api/testresults/${caseNum}/7`)
    .then((response) => {
      setIgraData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });

    axios.get(`http://localhost:4000/api/testresults/${caseNum}/9`)
    .then((response) => {
      setDstData(response.data)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error fetchingdata:', error);
    });

    axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
    .then(res => {
      console.log(res);
      setCaseData(res.data[0]);
      setIsLoading(false)
    })
    .catch(err => {
      console.error(err);
    })
  }, [testAdded])

  // Add these state variables
  const [activePage1, setActivePage1] = useState(1);
  const [activePage2, setActivePage2] = useState(1);
  const [activePage3, setActivePage3] = useState(1);
  const [activePage4, setActivePage4] = useState(1); // Active page number
  const [activePage5, setActivePage5] = useState(1); // Active page number
  const itemsPerPage = 5; // Number of items per page

  // Function to handle page change
  const handlePageChange1 = (pageNumber) => {
    setActivePage1(pageNumber);
  };

  const handlePageChange2 = (pageNumber) => {
    setActivePage2(pageNumber);
  };

  const handlePageChange3 = (pageNumber) => {
    setActivePage3(pageNumber);
  };

  const handlePageChange4 = (pageNumber) => {
    setActivePage4(pageNumber);
  };

  const handlePageChange5 = (pageNumber) => {
    setActivePage5(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex1 = (activePage1 - 1) * itemsPerPage;
  const startIndex2 = (activePage2 - 1) * itemsPerPage;
  const startIndex3 = (activePage3 - 1) * itemsPerPage;
  const startIndex4 = (activePage4 - 1) * itemsPerPage;
  const startIndex5 = (activePage5 - 1) * itemsPerPage;

  const endIndex1 = startIndex1 + itemsPerPage;
  const endIndex2 = startIndex2 + itemsPerPage;
  const endIndex3 = startIndex3 + itemsPerPage;
  const endIndex4 = startIndex4 + itemsPerPage;
  const endIndex5 = startIndex5 + itemsPerPage;

  
  const isTabActive = (tabName) => activeTab === tabName;
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
          <button className="btn ms-1 " style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={test} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          <Link to={`/diagnosis/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={diagnose} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <Link to={`/treatments/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatment History
          </button>
          </Link>
          <Link to={`/similarcases/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={similar} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
          </Link>
          
          </Nav>
        
        </Navbar>
       
      </Col>
    </Row>
    <Row className="justify-content-center">
  <Col lg="10" style={{ color: '#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
   
    
    
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
     

    <hr />

    {/* Pagination */}
    <Row className="mb-3">
      <Col className="text-center">
        <ButtonGroup>
          <Button
            variant={isTabActive('xray') ? 'primary' : 'light'}
            onClick={() => setActiveTab('xray')}
          >
            XRay Tests
          </Button>
          <Button
            variant={isTabActive('mtb') ? 'primary' : 'light'}
            onClick={() => setActiveTab('mtb')}
          >
            MTB/RIF Tests
          </Button>
          <Button
            variant={isTabActive('tst') ? 'primary' : 'light'}
            onClick={() => setActiveTab('tst')}
          >
            TST Tests
          </Button>
          <Button
            variant={isTabActive('igra') ? 'primary' : 'light'}
            onClick={() => setActiveTab('igra')}
          >
            IGRA Tests
          </Button>
          <Button
            variant={isTabActive('dst') ? 'primary' : 'light'}
            onClick={() => setActiveTab('dst')}
          >
            DST Tests
          </Button>
        </ButtonGroup>
      </Col>
    </Row>

    {activeTab === 'xray' && (
      <>
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> X-ray Tests </strong> </p>
      {xrayData.length > 0 ? (
        <Card className="mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Test Location</th>
                              <th scope="col">Date Tested</th>
                              <th scope="col">Ref. #</th>
                              <th scope="col">Result</th>
                              <th scope="col">Validity</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
            
            {xrayData.slice(startIndex1, endIndex1).map((xray, index) => (
              <>
               <tr key={index}>
                                  <td>
                                  {xray.HIName} 
                                  </td>
                                  <td>{new Date(xray.issue_date).toLocaleDateString()}</td>
                                  <td>
                                  {xray.test_refno}
                                  </td>
                                  <td>{xray.TestValue} </td>
                                  <td> {xray.validity === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        VALID{" "}
                                      </Badge>
                                    ) : xray.validity === 0 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        OUTDATED{" "}
                                      </Badge>
                                    ) : null}</td>
                                    <td> <UpdateXray DGResultsNo={xray.DGResultsNo} HINo={xray.HINo} issue_date={xray.issue_date} 
                                                    test_refno={xray.test_refno} TestValue={xray.TestValue} validity={xray.validity}
                                                    onTestAdded={() => setTestAdded(!testAdded)}/>
                                        <DeleteTest DGResultsNo={xray.DGResultsNo}/></td>
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
                          No Tests Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}
        <Row className="mb-4">
                    
                    {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
              
                      <Col>
                      {caseData.case_status === 'O' ? (
                                <>
                                <AddXrayModal caseNum={caseNum} onTestAdded={() => setTestAdded(!testAdded)} />
                                </>
                              ) : (
                               null
                              )}
                      </Col>
              
                  
                  <Col className="d-flex justify-content-end">
                    {xrayData.length > 0 ? (
                       <Pagination className="mt-3 justify-content-center">
                       <Pagination.Prev onClick={() => handlePageChange1(activePage1 - 1)} disabled={activePage1 === 1} />
                       {Array.from({ length: Math.ceil(xrayData.length / itemsPerPage) }).map((_, index) => (
                         <Pagination.Item key={index} active={index + 1 === activePage1} onClick={() => handlePageChange1(index + 1)}>
                           {index + 1}
                         </Pagination.Item>
                       ))}
                       <Pagination.Next onClick={() => handlePageChange1(activePage1 + 1)} disabled={activePage1 === Math.ceil(xrayData.length / itemsPerPage)} />
                     </Pagination>
                    ) : null}
                  </Col>
                </Row>
      </Col>
     
      </Row>
     
</>
    )}
    


    {activeTab === 'mtb' && (
      <>
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> MTB/RIF Tests </strong> </p>
      {mtbData.length > 0 ? (
        <Card className="mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Test Location</th>
                              <th scope="col">Date Tested</th>
                              <th scope="col">Ref. #</th>
                              <th scope="col">Result</th>
                              <th scope="col">Validity</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
            
            {mtbData.slice(startIndex2, endIndex2).map((mtb, index) => (
              <>
               <tr key={index}>
                                  <td>
                                  {mtb.HIName} 
                                  </td>
                                  <td>{new Date(mtb.issue_date).toLocaleDateString()}</td>
                                  <td>
                                  {mtb.test_refno}
                                  </td>
                                  <td>{mtb.TestValue} </td>
                                  <td> {mtb.validity === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        VALID{" "}
                                      </Badge>
                                    ) : mtb.validity === 0 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        OUTDATED{" "}
                                      </Badge>
                                    ) : null}</td>
                                    <td>         <UpdateMTBRIF DGResultsNo={mtb.DGResultsNo} HINo={mtb.HINo} issue_date={mtb.issue_date} test_refno={mtb.test_refno} TestValue={mtb.TestValue} validity={mtb.validity}/>

<DeleteTest DGResultsNo={mtb.DGResultsNo}/> </td>
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
                          No Tests Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}
        <Row className="mb-4">
                    
                    {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
              
                      <Col>
                      {caseData.case_status === 'O' ? (
                                <>

                                  <AddMTBRIFModal caseNum={caseNum} onTestAdded={() => setTestAdded(!testAdded)}/>
                                </>
                              ) : (
                                null
                              )}
                      </Col>
              
                  
                  <Col className="d-flex justify-content-end">
                  {mtbData.length > 0 ? (
                       <Pagination className="mt-3 justify-content-center">
                       <Pagination.Prev onClick={() => handlePageChange2(activePage2 - 1)} disabled={activePage2 === 1} />
                       {Array.from({ length: Math.ceil(mtbData.length / itemsPerPage) }).map((_, index) => (
                         <Pagination.Item key={index} active={index + 1 === activePage2} onClick={() => handlePageChange2(index + 1)}>
                           {index + 1}
                         </Pagination.Item>
                       ))}
                       <Pagination.Next onClick={() => handlePageChange2(activePage2 + 1)} disabled={activePage2 === Math.ceil(mtbData.length / itemsPerPage)} />
                     </Pagination>
                    ) : null}
                  </Col>
                </Row>
      </Col>
     
      </Row>
     
</>
    )}
    

    {activeTab === 'tst' && (
      <>
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> TST Tests</strong> </p>
      {tstData.length > 0 ? (
        <Card className="mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Test Location</th>
                              <th scope="col">Date Tested</th>
                              <th scope="col">Ref. #</th>
                              <th scope="col">Result</th>
                              <th scope="col">Validity</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
            
            {tstData.slice(startIndex3, endIndex3).map((tst, index) => (
              <>
               <tr key={index}>
                                  <td>
                                  {tst.HIName} 
                                  </td>
                                  <td>{new Date(tst.issue_date).toLocaleDateString()}</td>
                                  <td>
                                  {tst.test_refno}
                                  </td>
                                  <td>{tst.TestValue} </td>
                                  <td> {tst.validity === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        VALID{" "}
                                      </Badge>
                                    ) : tst.validity === 0 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        OUTDATED{" "}
                                      </Badge>
                                    ) : null}</td>
                                    <td>         <UpdateTST DGResultsNo={tst.DGResultsNo} HINo={tst.HINo} issue_date={tst.issue_date} test_refno={tst.test_refno} TestValue={tst.TestValue} validity={tst.validity}/>
            <DeleteTest DGResultsNo={tst.DGResultsNo}/> </td>
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
                          No Tests Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}
        <Row className="mb-4">
                    
                    {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
              
                      <Col>
                      {caseData.case_status === 'O' ? (
                                <>
                                 <AddTSTModal caseNum={caseNum} onTestAdded={() => setTestAdded(!testAdded)} />
                                </>
                              ) : (
                                null
                              )}
                      </Col>
              
                  
                  <Col className="d-flex justify-content-end">
                    {tstData.length > 0 ? (
                       <Pagination>
                       <Pagination.Prev onClick={() => handlePageChange3(activePage3 - 1)} disabled={activePage3 === 1} />
                       {Array.from({ length: Math.ceil(tstData.length / itemsPerPage) }).map((_, index) => (
                         <Pagination.Item key={index} active={index + 1 === activePage3} onClick={() => handlePageChange3(index + 1)}>
                           {index + 1}
                         </Pagination.Item>
                       ))}
                       <Pagination.Next onClick={() => handlePageChange3(activePage3 + 1)} disabled={activePage3 === Math.ceil(tstData.length / itemsPerPage)} />
                     </Pagination>
                    ) : null}
                  </Col>
                </Row>
      </Col>
     
      </Row>
     
</>
    )}

{activeTab === 'igra' && (
      <>
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> IGRA Tests</strong> </p>
      {igraData.length > 0 ? (
        <Card className="mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Test Location</th>
                              <th scope="col">Date Tested</th>
                              <th scope="col">Ref. #</th>
                              <th scope="col">Result</th>
                              <th scope="col">Validity</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
            
            {igraData.slice(startIndex4, endIndex4).map((igra, index) => (
              <>
               <tr key={index}>
                                  <td>
                                  {igra.HIName} 
                                  </td>
                                  <td>{new Date(igra.issue_date).toLocaleDateString()}</td>
                                  <td>
                                  {igra.test_refno}
                                  </td>
                                  <td>{igra.TestValue} </td>
                                  <td> {igra.validity === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        VALID{" "}
                                      </Badge>
                                    ) : igra.validity === 0 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        OUTDATED{" "}
                                      </Badge>
                                    ) : null}</td>
                                    <td>         <UpdateIGRA DGResultsNo={igra.DGResultsNo} HINo={igra.HINo} issue_date={igra.issue_date} test_refno={igra.test_refno} TestValue={igra.TestValue} validity={igra.validity} onTestAdded={() => setTestAdded(!testAdded)}/>

<DeleteTest DGResultsNo={igra.DGResultsNo}/> </td>
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
                          No Tests Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}
        <Row className="mb-4">
                    
                    {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
              
                      <Col>
                      {caseData.case_status === 'O' ? (
                                <>
                                  <AddIGRAModal caseNum={caseNum} onTestAdded={() => setTestAdded(!testAdded)} />
                                </>
                              ) : (
                                null
                              )}
                      </Col>
              
                  
                  <Col className="d-flex justify-content-end">
                    {igraData.length > 0 ? (
                         <Pagination className="mt-3 justify-content-center">
                         <Pagination.Prev onClick={() => handlePageChange4(activePage4 - 1)} disabled={activePage4 === 1} />
                         {Array.from({ length: Math.ceil(igraData.length / itemsPerPage) }).map((_, index) => (
                           <Pagination.Item key={index} active={index + 1 === activePage4} onClick={() => handlePageChange4(index + 1)}>
                             {index + 1}
                           </Pagination.Item>
                         ))}
                         <Pagination.Next onClick={() => handlePageChange4(activePage4 + 1)} disabled={activePage4 === Math.ceil(igraData.length / itemsPerPage)} />
                       </Pagination>
                    ) : null}
                  </Col>
                </Row>
      </Col>
     
      </Row>
     
</>
    )}


{activeTab === 'dst' && (
      <>
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> DST Tests </strong> </p>
      {dstData.length > 0 ? (
        <Card className="mb-4">
          <Card.Body>
          <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Test Location</th>
                              <th scope="col">Date Tested</th>
                              <th scope="col">Ref. #</th>
                              <th scope="col">Result</th>
                              <th scope="col">Validity</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
            
            {dstData.slice(startIndex1, endIndex1).map((dst, index) => (
              <>
               <tr key={index}>
                                  <td>
                                  {dst.HIName} 
                                  </td>
                                  <td>{new Date(dst.issue_date).toLocaleDateString()}</td>
                                  <td>
                                  {dst.test_refno}
                                  </td>
                                  <td>{dst.TestValue} </td>
                                  <td> {dst.validity === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        VALID{" "}
                                      </Badge>
                                    ) : dst.validity === 0 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        OUTDATED{" "}
                                      </Badge>
                                    ) : null}</td>
                                    <td> <UpdateDST DGResultsNo={dst.DGResultsNo} HINo={dst.HINo} issue_date={dst.issue_date} test_refno={dst.test_refno} TestValue={dst.TestValue} validity={dst.validity}/>
                                        <DeleteTest DGResultsNo={dst.DGResultsNo}/></td>
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
                          No Tests Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}
        <Row className="mb-4">
                    
                    {/*LOGIC: if walang laman ung assessment, then new sya, if meron then old */}
              
                      <Col>
                      {caseData.case_status === 'O' ? (
                                <>
                                <AddDSTModal caseNum={caseNum} onTestAdded={() => setTestAdded(!testAdded)} />
                                </>
                              ) : (
                               null
                              )}
                      </Col>
              
                  
                  <Col className="d-flex justify-content-end">
                    {dstData.length > 0 ? (
                       <Pagination className="mt-3 justify-content-center">
                       <Pagination.Prev onClick={() => handlePageChange5(activePage5 - 1)} disabled={activePage5 === 1} />
                       {Array.from({ length: Math.ceil(dstData.length / itemsPerPage) }).map((_, index) => (
                         <Pagination.Item key={index} active={index + 1 === activePage5} onClick={() => handlePageChange5(index + 1)}>
                           {index + 1}
                         </Pagination.Item>
                       ))}
                       <Pagination.Next onClick={() => handlePageChange5(activePage5 + 1)} disabled={activePage5 === Math.ceil(dstData.length / itemsPerPage)} />
                     </Pagination>
                    ) : null}
                  </Col>
                </Row>
      </Col>
     
      </Row>
     
</>
    )}
    </>
              )}
  </Col>
</Row>
   

  </div>
  
    

       
  );
};

export default LaboratoryTest;
