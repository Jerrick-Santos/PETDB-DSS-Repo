import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col, ButtonGroup } from 'react-bootstrap';
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
import Button from 'react-bootstrap/Button';
import PresumptiveTBModal from '../components/PresumptiveTBModal';
import LatentTBModal from '../components/LatentTBModal';
import CaseHeader from '../components/CaseHeader'
import { PieChart, Pie, Cell, Label, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, } from 'recharts';


const SimilarCases = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();

  var caseNum = id

  const graphdata1 = [
    { id: "1", name: "L1", value: 25 },
    { id: "2", name: "L2", value: 75 }
    ];

  const graphdata2 = [
      { id: "1", name: "L1", value: 45 },
      { id: "2", name: "L2", value: 55 }
      ];

  const graphdata3 = [
        { id: "1", name: "L1", value: 55 },
        { id: "2", name: "L2", value: 45 }
        ];
  
        
  
    const [activeTab, setActiveTab] = useState('1'); 
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
          <button className="btn ms-1 " style={{color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          </Link>
          <Link to={`/treatments/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
          </button>
          </Link>
          <button className="btn ms-1 " style={{  color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Similar Cases
          </button>
      
          
          </Nav>
        
        </Navbar>
       
      </Col>
    </Row>
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
    <Row className="justify-content-center" >
      <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      <CaseHeader caseNum={caseNum} />
    <hr/>
      <Row className="mt-5 justify-content-center">
        <Col lg="9">
        <h2> Similar Cases </h2>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col className="text-center">
        <ButtonGroup>
          <Button variant="light" onClick={() => setActiveTab('1')}>Similar Case 1</Button>
          <Button variant="light" onClick={() => setActiveTab('2')}>Similar Case 2</Button>
          <Button variant="light" onClick={() => setActiveTab('3')}>Similar Case 3</Button>
        </ButtonGroup>
      </Col>
    </Row>

    {activeTab === '1' && (
     <Row className="mt-5 justify-content-center">
     <Col lg="4">
           <PieChart width={320} height={320}>
         <Pie
           data={graphdata1}
           isAnimationActive={true}
           dataKey="value"
           innerRadius="80%"
           outerRadius="100%"
           fill="#82ca9d"
           startAngle={90}
           endAngle={-270}
           paddingAngle={0}
           cornerRadius={5}
         >
           <Cell key="test" fill="#CCC" />
           <Label
             value={`${graphdata1[1].value}% Similarity`}
             position="center"
             fontSize={30}
             fill="#000"
           />
         </Pie>
       </PieChart>
     </Col>

     <Col lg="5">
     <Card className="mb-4">
       <Card.Body>
         <Row>
           <Col sm="6">
             <Card.Text>Case Reference No.</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">Name</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case Start Date</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case End Date</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case Status</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Latest Diagnosis</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         
       </Card.Body>
     </Card>

     </Col>
   </Row>
    )}

{activeTab === '2' && (
     <Row className="mt-5 justify-content-center">
     <Col lg="4">
           <PieChart width={320} height={320}>
         <Pie
           data={graphdata2}
           isAnimationActive={true}
           dataKey="value"
           innerRadius="80%"
           outerRadius="100%"
           fill="#82ca9d"
           startAngle={90}
           endAngle={-270}
           paddingAngle={0}
           cornerRadius={5}
         >
           <Cell key="test" fill="#CCC" />
           <Label
             value={`${graphdata2[1].value}% Similarity`}
             position="center"
             fontSize={30}
             fill="#000"
           />
         </Pie>
       </PieChart>
     </Col>

     <Col lg="5">
     <Card className="mb-4">
       <Card.Body>
         <Row>
           <Col sm="6">
             <Card.Text>Case Reference No.</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">Name</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case Start Date</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case End Date</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case Status</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Latest Diagnosis</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         
       </Card.Body>
     </Card>

     </Col>
   </Row>
    )}

{activeTab === '3' && (
     <Row className="mt-5 justify-content-center">
     <Col lg="4">
           <PieChart width={320} height={320}>
         <Pie
           data={graphdata3}
           isAnimationActive={true}
           dataKey="value"
           innerRadius="80%"
           outerRadius="100%"
           fill="#82ca9d"
           startAngle={90}
           endAngle={-270}
           paddingAngle={0}
           cornerRadius={5}
         >
           <Cell key="test" fill="#CCC" />
           <Label
             value={`${graphdata3[1].value}% Similarity`}
             position="center"
             fontSize={30}
             fill="#000"
           />
         </Pie>
       </PieChart>
     </Col>

     <Col lg="5">
     <Card className="mb-4">
       <Card.Body>
         <Row>
           <Col sm="6">
             <Card.Text>Case Reference No.</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">Name</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case Start Date</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case End Date</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Case Status</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         <Row>
           <Col sm="6">
             <Card.Text>Latest Diagnosis</Card.Text>
           </Col>
           <Col sm="6">
             <Card.Text className="text-muted ">---</Card.Text>
           </Col>
         </Row>
         <hr />
         
       </Card.Body>
     </Card>

     </Col>
   </Row>
    )}
      
     

    </Col>
  </Row>

   
  </div>
  
    

       
  );
};

export default SimilarCases;
