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


const Case = () => {

  const { id } = useParams();
  var patientNum = id

  const [caseData, setCaseData] = useState([]);
  const [allClosed, setAllClosed] = useState(true);

  useEffect(() => {

    axios.get(`http://localhost:4000/api/patientcase/${patientNum}`)
      .then((response) => {
        setCaseData(response.data)
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      });
    

}, []);

useEffect(() => {
  // Check if any case_status is 'O'
  const hasOpenCase = caseData.some(item => item.case_status === 'O');
  
  // Set allClosed to false if there's an 'O', otherwise true
  setAllClosed(!hasOpenCase);
}, [caseData]);


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


        {/*TODO: Input Frontend Here and Delete all <br/>*/}
        <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
        <caption className=' fs-4' style={{ color:'#0077B6'}}>Patient Cases</caption>
          <thead>
            <tr>
            <th scope="col">Case Reference Number</th>
            <th scope="col">Status</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Case Status</th>
            </tr>
          </thead>
          <tbody>
            {caseData.map((singleCase, index) => (
              <tr key={index}>
                <td><Link to={`/closecontacts/${singleCase.CaseNo}`}><u style={{ color:'black'}}>{singleCase.case_refno} </u></Link></td>
                <td>{singleCase.SRDescription}</td>
                <td>{new Date(singleCase.formatStartDate).toLocaleDateString().replaceAll("/", "-")}</td>
                <td>{singleCase.end_date === null ? "---" : new Date(singleCase.end_date).toLocaleDateString().replaceAll("/", "-")}</td>
                <td>{singleCase.case_status === "C" ? "Closed" : "Open"}</td>
              </tr>
            ))}
          </tbody>
        </table>



        
      <Row className="d-flex justify-content-end mb-4" >
          <Col className="d-flex justify-content-end">
          <AddCaseModal
              allClosed={allClosed}
              patientNo={patientNum}
          />
          </Col>
        </Row>
        
       
      </Col>
    </Row>

    </div>
    
  );
};

export default Case;
