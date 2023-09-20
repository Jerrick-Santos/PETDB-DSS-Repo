import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import add from '../assets/add.png';
import { Link, useParams } from 'react-router-dom';
import AddCloseContactModal from '../components/AddCloseContactModal';
import axios from 'axios';
import AddXrayModal from '../components/AddXrayModal';
import AddIGRAModal from '../components/AddIGRAModal';
import AddHIVTestModal from '../components/AddTSTModal';
import AddMTBRIFModal from '../components/AddMTBRIFModal';
import AssessmentSummaryModal from '../components/AssessmentSummaryModal';
import ShowDiagnosisModal from '../components/ShowDiagnosisModal';
import AddTSTModal from '../components/AddTSTModal';
import CaseHeader from '../components/CaseHeader'
import Pagination from 'react-bootstrap/Pagination';
import bin from '../assets/bin.png'
import DeleteTest from '../components/DeleteTest';
import UpdateIGRA from '../components/UpdateIGRA';
import UpdateTST from '../components/UpdateTST';
import UpdateMTBRIF from '../components/UpdateMTBRIF';
import UpdateXray from '../components/UpdateXray';


const LaboratoryTest = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();
  var caseNum = id
  const [patientData, setPatientData] = useState([]);
  const [xrayData, setXrayData] = useState([]);
  const [tstData, setTstData] = useState([]);
  const [mtbData, setMtbData] = useState([]);
  const [igraData, setIgraData] = useState([]);

  const [activeTab, setActiveTab] = useState('xray'); 
  
  useEffect(() => {
    axios.get(`http://localhost:4000/api/getCasePatient/${caseNum}`)
    .then(res => {
      console.log(res);
      setPatientData(res.data[0]);
    })
    .catch(err => {
      console.error(err);
    })


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
  }, [])

  // Add these state variables
  const [activePage1, setActivePage1] = useState(1);
  const [activePage2, setActivePage2] = useState(1);
  const [activePage3, setActivePage3] = useState(1);
  const [activePage4, setActivePage4] = useState(1); // Active page number
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

  // Calculate the index range for the current page
  const startIndex1 = (activePage1 - 1) * itemsPerPage;
  const startIndex2 = (activePage2 - 1) * itemsPerPage;
  const startIndex3 = (activePage3 - 1) * itemsPerPage;
  const startIndex4 = (activePage4 - 1) * itemsPerPage;

  const endIndex1 = startIndex1 + itemsPerPage;
  const endIndex2 = startIndex2 + itemsPerPage;
  const endIndex3 = startIndex3 + itemsPerPage;
  const endIndex4 = startIndex4 + itemsPerPage;

  
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
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          <Link to={`/diagnosis/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <Link to={`/treatments/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
          </button>
          </Link>
          <Link to={`/similarcases/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
          </Link>
          
          </Nav>
        
        </Navbar>
       
      </Col>
    </Row>
    <Row className="justify-content-center">
  <Col lg="10" style={{ color: '#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
   
    
    
    
    <CaseHeader caseNum={caseNum} />

    <hr />

    {/* Pagination */}
    <Row className="mb-3">
      <Col className="text-center">
        <ButtonGroup>
          <Button variant="light" onClick={() => setActiveTab('xray')}>XRay Tests</Button>
          <Button variant="light" onClick={() => setActiveTab('mtb')}>MTB/RIF Tests</Button>
          <Button variant="light" onClick={() => setActiveTab('tst')}>TST Tests</Button>
          <Button variant="light" onClick={() => setActiveTab('igra')}>IGRA Tests</Button>
        </ButtonGroup>
      </Col>
    </Row>

    {activeTab === 'xray' && (
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> X-ray Tests </strong> </p>
      
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="3">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Result</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
            </Row>
        
            
            {xrayData.slice(startIndex1, endIndex1).map((xray, index) => (
              <>
               <hr />
               <Row>
              <Col sm="3">
              <Card.Text className="text-muted"> {xray.HIName} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{new Date(xray.issue_date).toLocaleDateString()} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{xray.test_refno} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{xray.TestValue}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{xray.validity === 1 ? "VALID" : "OUTDATED"}   </Card.Text>
              </Col>
              <Col sm="1">
                <Card.Text className="text-muted">
                <UpdateXray DGResultsNo={xray.DGResultsNo} HINo={xray.HINo} issue_date={xray.issue_date} test_refno={xray.test_refno} TestValue={xray.TestValue} validity={xray.validity}/>

              <DeleteTest DGResultsNo={xray.DGResultsNo}/>
                  </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          


          
          </Card.Body>
        </Card>
        {patientData.case_status === 'O' ? (
          <>
            <AddXrayModal caseNum={caseNum} />
          </>
        ) : (
          <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} disabled> Add XRay </button>
        )}
      </Col>
      <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange1(activePage1 - 1)} disabled={activePage1 === 1} />
            {Array.from({ length: Math.ceil(xrayData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage1} onClick={() => handlePageChange1(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange1(activePage1 + 1)} disabled={activePage1 === Math.ceil(xrayData.length / itemsPerPage)} />
          </Pagination>
      </Row>
    )}

    {activeTab === 'mtb' && (
      /* MTB/RIF Tests */
      // ... (your MTB/RIF tests code)
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> MTB/RIF Tests </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
            <Col sm="3">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Result</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
            </Row>
            {mtbData.slice(startIndex2, endIndex2).map((mtb, index) => (
              <>
               <hr />
               <Row>
              <Col sm="3">
              <Card.Text className="text-muted"> {mtb.HIName} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{new Date(mtb.issue_date).toLocaleDateString()}  </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{mtb.test_refno} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{mtb.TestValue}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{mtb.validity === 1 ? "VALID" : "OUTDATED"}   </Card.Text>
              </Col>
              <Col sm="1">
                <Card.Text className="text-muted">
                <UpdateMTBRIF DGResultsNo={mtb.DGResultsNo} HINo={mtb.HINo} issue_date={mtb.issue_date} test_refno={mtb.test_refno} TestValue={mtb.TestValue} validity={mtb.validity}/>

              <DeleteTest DGResultsNo={mtb.DGResultsNo}/>  
                  </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          </Card.Body>
        </Card>
        {patientData.case_status === 'O' ? (
          <>
            <AddMTBRIFModal caseNum={caseNum} />
          </>
        ) : (
          <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} disabled> Add MTB/RIF</button>
        )}
      </Col>
      <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange2(activePage2 - 1)} disabled={activePage2 === 1} />
            {Array.from({ length: Math.ceil(mtbData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage2} onClick={() => handlePageChange2(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange2(activePage2 + 1)} disabled={activePage2 === Math.ceil(mtbData.length / itemsPerPage)} />
          </Pagination>
     </Row>
    )}

    {activeTab === 'tst' && (
      /* TST Tests */
      // ... (your TST tests code)
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> TST Tests </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
            <Col sm="3">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Result</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
            </Row>
            {tstData.slice(startIndex3, endIndex3).map((tst, index) => (
              <>
               <hr />
               <Row>
              <Col sm="3">
              <Card.Text className="text-muted"> {tst.HIName} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{new Date(tst.issue_date).toLocaleDateString()} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted"> {tst.test_refno}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{tst.TestValue}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{tst.validity === 1 ? "VALID" : "OUTDATED"}   </Card.Text>
              </Col>
              <Col sm="1">
                <Card.Text className="text-muted">
              <UpdateTST DGResultsNo={tst.DGResultsNo} HINo={tst.HINo} issue_date={tst.issue_date} test_refno={tst.test_refno} TestValue={tst.TestValue} validity={tst.validity}/>
            <DeleteTest DGResultsNo={tst.DGResultsNo}/>
                  </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          </Card.Body>
        </Card>
        {patientData.case_status === 'O' ? (
          <>
            <AddTSTModal caseNum={caseNum} />
          </>
        ) : (
          <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} disabled> Add TST</button>
        )}
      </Col>
      <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange3(activePage3 - 1)} disabled={activePage3 === 1} />
            {Array.from({ length: Math.ceil(tstData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage3} onClick={() => handlePageChange3(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange3(activePage3 + 1)} disabled={activePage3 === Math.ceil(tstData.length / itemsPerPage)} />
          </Pagination>
      </Row>
    )}


{activeTab === 'igra' && (
      /* TST Tests */
      // ... (your TST tests code)
      <Row className="justify-content-center">
      <Col lg="10">
      <p> <strong> IGRA Tests </strong> </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
            <Col sm="3">
                <Card.Text>Test Location</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Date Tested</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Ref. #</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Result</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Validity</Card.Text>
              </Col>
            </Row>
            {igraData.slice(startIndex4, endIndex4).map((igra, index) => (
              <>
               <hr />
               <Row>
              <Col sm="3">
              <Card.Text className="text-muted"> {igra.HIName} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{new Date(igra.issue_date).toLocaleDateString()} </Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{igra.test_refno}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{igra.TestValue}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text className="text-muted">{igra.validity === 1 ? "VALID" : "OUTDATED"}   </Card.Text>
              </Col>
              <Col sm="1">
                <Card.Text className="text-muted">
                <UpdateIGRA DGResultsNo={igra.DGResultsNo} HINo={igra.HINo} issue_date={igra.issue_date} test_refno={igra.test_refno} TestValue={igra.TestValue} validity={igra.validity}/>

                <DeleteTest DGResultsNo={igra.DGResultsNo}/>
                  </Card.Text>
              </Col>
            </Row>
                   </>
                    ))}
          </Card.Body>
        </Card>
        {patientData.case_status === 'O' ? (
          <>
            <AddIGRAModal caseNum={caseNum} />
          </>
        ) : (
          <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} disabled> Add IGRA</button>
        )}
      </Col>
      <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange4(activePage4 - 1)} disabled={activePage4 === 1} />
            {Array.from({ length: Math.ceil(igraData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage4} onClick={() => handlePageChange4(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange4(activePage4 + 1)} disabled={activePage4 === Math.ceil(igraData.length / itemsPerPage)} />
          </Pagination>
      </Row>
    )}
  </Col>
</Row>
   

  </div>
  
    

       
  );
};

export default LaboratoryTest;
