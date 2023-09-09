import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import bin from '../assets/bin.png'
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CaseHeader from '../components/CaseHeader'
import AddTreatmentModal from '../components/AddTreatmentModal';
import UpdateTreatment from '../components/UpdateTreatment';
import DeleteTreatment from '../components/DeleteTreatment';

const Treatments = () => {

  const { id } = useParams();
  var caseNum = id

  const [treatmentsData, setTreatmentsData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/treatments/${caseNum}`)
    .then(res => {
      console.log(res);
      setTreatmentsData(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  }, [caseNum])


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
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Laboratory Tests
          </button>
          </Link>
          <Link to={`/diagnosis/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <button className="btn ms-1 " style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
          </button>
          <Link to={`/similarcases/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
          </Link>
          
          
          </Nav>
        
        </Navbar>
       
      </Col>
    </Row>
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
    <Row className="justify-content-center" >
      <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>

      <CaseHeader caseNum={caseNum} />
      
      
      
      
      
      {/* Treatments*/}
      
      {/* Symptoms of the Patient */}
      <Row className="mt-5 justify-content-center">
     

    {/* Laboratory Tests of the Patient*/}
      <Col lg="9">
      <p style={{fontSize:"25px"}}> Treatments </p>
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col sm="3">
                <Card.Text>Medicine</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>Dosage</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>Frequency</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>Period</Card.Text>
              </Col>
              
            </Row>
            
            {treatmentsData.map((data, index) => (
              <>
               <hr />
            <Row>
              <Col sm="3">
                <Card.Text>{data.Medicine}</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>{data.Dosage}</Card.Text>
              </Col>
              <Col sm="3">
                <Card.Text>{data.Frequency}</Card.Text>
              </Col>
              <Col sm="2">
                <Card.Text>{data.Period}</Card.Text>
              </Col>
              <Col sm="1">
                <Card.Text className="text-muted">
               <UpdateTreatment/>

                <DeleteTreatment/>
                  </Card.Text>
              </Col>
              
            </Row>
                   </>
                    ))}
          
          </Card.Body>
          
        </Card>
        <AddTreatmentModal caseID={caseNum}/>
      </Col>
    </Row>


    </Col>
  </Row>

  </div>
    
  );
};

export default Treatments;
