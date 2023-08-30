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

  const [casesData, setCasesData] = useState([]);
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const [percent3, setPercent3] = useState(0);
  const [caseNum1, setCaseNum1] = useState(0);
  const [caseNum2, setCaseNum2] = useState(0);
  const [caseNum3, setCaseNum3] = useState(0);

  const [case1Data, setCase1Data] = useState([]);
  const [case2Data, setCase2Data] = useState([]);
  const [case3Data, setCase3Data] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/getsimcases/${caseNum}`)
      .then(response => {
        setCasesData(response.data);
  
        // Loop through casesData to populate variables
        for (let i = 0; i < response.data.length; i++) {
          const caseIndex = response.data[i][0];
          const similarity = response.data[i][1];
  
          // Assign values to percent1, percent2, percent3, caseNum1, caseNum2, caseNum3
          if (i === 0) {
            setPercent1(similarity);
            setCaseNum1(caseIndex);
          } else if (i === 1) {
            setPercent2(similarity);
            setCaseNum2(caseIndex);
          } else if (i === 2) {
            setPercent3(similarity);
            setCaseNum3(caseIndex);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching Sim Cases:', error);
      });
  }, []);
  
  useEffect(() => {
    if (caseNum1) {
      axios.get(`http://localhost:4000/api/case/${caseNum1}`)
        .then(response => {
          setCase1Data(response.data[0]);
        })
        .catch(error => {
          console.error('Error fetching Case 1 Data:', error);
        });
    }
  }, [caseNum1]);
  
  useEffect(() => {
    if (caseNum2) {
      axios.get(`http://localhost:4000/api/case/${caseNum2}`)
        .then(response => {
          setCase2Data(response.data[0]);
        })
        .catch(error => {
          console.error('Error fetching Case 2 Data:', error);
        });
    }
  }, [caseNum2]);
  
  useEffect(() => {
    if (caseNum3) {
      axios.get(`http://localhost:4000/api/case/${caseNum3}`)
        .then(response => {
          setCase3Data(response.data[0]);
        })
        .catch(error => {
          console.error('Error fetching Case 3 Data:', error);
        });
    }
  }, [caseNum3]);
  
  console.log(case1Data)
  
  // Make sure to check if casesData is available before using it
 
    const graphdata1 = [
    { id: "1", name: "L1", value: 18 },
    { id: "2", name: "L2", value: 82 }
    ];

  const graphdata2 = [
      { id: "1", name: "L1", value: 93},
      { id: "2", name: "L2", value: 7 }
      ];

  const graphdata3 = [
        { id: "1", name: "L1", value: 96 },
        { id: "2", name: "L2", value: 4 }
        ];
  
        const graphdata4 = [
          { id: "1", name: "L1", value: 98.5 },
          { id: "2", name: "L2", value: 1.5 }
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
      
    <Row className="mb-3">
      <Col className="text-center">
      <h2> Similar Cases </h2>
      </Col>
    </Row>
    

 
     <Row className="mt-5 justify-content-center">
     

     <Col lg="4">
     <Card className="mb-4">
       <Card.Body>
         <Row>
           <Col sm="4">
             <Card.Text>Similar Cases</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">121 Cases</Card.Text>
           </Col>
         </Row>
         <hr />
        
         <Row>
           <Col sm="4">
             <Card.Text>Diagnosis</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">Bacteriologically Confirmed - Drug Resistant</Card.Text>
           </Col>
         </Row>
       
         
       </Card.Body>
     </Card>

     </Col>
     <Col lg="2">
           <PieChart width={150} height={150}>
         <Pie
           data={graphdata1}
           isAnimationActive={true}
           dataKey="value"
           innerRadius="80%"
           outerRadius="100%"
           fill='#56592F'
           startAngle={90}
           endAngle={-270}
           paddingAngle={0}
           cornerRadius={5}
         >
           <Cell key="test" fill="#CCC" />
           <Label
             value={`${graphdata1[1].value}% Likelihood`}
             position="center"
             fontSize={15}
             fill="#000"
           />
         </Pie>
       </PieChart>
     </Col>

     <Col lg="4">
     <Card className="mb-4">
       <Card.Body>
         <Row>
           <Col sm="4">
             <Card.Text>Similar Cases</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">121 Cases</Card.Text>
           </Col>
         </Row>
         <hr />
        
         <Row>
           <Col sm="4">
             <Card.Text>Diagnosis</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">Clinically Diagnosed - Drug Resistant</Card.Text>
           </Col>
         </Row>
       
         
       </Card.Body>
     </Card>

     </Col>
     <Col lg="2">
           <PieChart width={150} height={150}>
         <Pie
           data={graphdata2}
           isAnimationActive={true}
           dataKey="value"
           innerRadius="80%"
           outerRadius="100%"
           fill='#BECB12'
           startAngle={90}
           endAngle={-270}
           paddingAngle={0}
           cornerRadius={5}
         >
           <Cell key="test" fill="#CCC" />
           <Label
             value={`${graphdata2[1].value}% Likelihood`}
             position="center"
             fontSize={15}
             fill="#000"
           />
         </Pie>
       </PieChart>
     </Col>
     
   </Row>

   <Row className="mt-5 justify-content-center">
     

     <Col lg="4">
     <Card className="mb-4">
       <Card.Body>
         <Row>
           <Col sm="4">
             <Card.Text>Similar Cases</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">121 Cases</Card.Text>
           </Col>
         </Row>
         <hr />
        
         <Row>
           <Col sm="4">
             <Card.Text>Diagnosis</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">EPTB Bacteriologically Confirmed - Drug Susceptible</Card.Text>
           </Col>
         </Row>
       
         
       </Card.Body>
     </Card>

     </Col>
     <Col lg="2">
           <PieChart width={150} height={150}>
         <Pie
           data={graphdata3}
           isAnimationActive={true}
           dataKey="value"
           innerRadius="80%"
           outerRadius="100%"
           fill='#7D3D07'
           startAngle={90}
           endAngle={-270}
           paddingAngle={0}
           cornerRadius={5}
         >
           <Cell key="test" fill="#CCC" />
           <Label
             value={`${graphdata3[1].value}% Likelihood`}
             position="center"
             fontSize={15}
             fill="#000"
           />
         </Pie>
       </PieChart>
     </Col>

     <Col lg="4">
     <Card className="mb-4">
       <Card.Body>
         <Row>
           <Col sm="4">
             <Card.Text>Similar Cases</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">121 Cases</Card.Text>
           </Col>
         </Row>
         <hr />
        
         <Row>
           <Col sm="4">
             <Card.Text>Diagnosis</Card.Text>
           </Col>
           <Col sm="8">
             <Card.Text className="text-muted ">No TB</Card.Text>
           </Col>
         </Row>
       
         
       </Card.Body>
     </Card>

     </Col>
     <Col lg="2">
           <PieChart width={150} height={150}>
         <Pie
           data={graphdata4}
           isAnimationActive={true}
           dataKey="value"
           innerRadius="80%"
           outerRadius="100%"
           fill='#0077B6'
           startAngle={90}
           endAngle={-270}
           paddingAngle={0}
           cornerRadius={5}
         >
           <Cell key="test" fill="#CCC" />
           <Label
             value={`${graphdata4[1].value}% Likelihood`}
             position="center"
             fontSize={15}
             fill="#000"
           />
         </Pie>
       </PieChart>
     </Col>
     
   </Row>

   
 



    </Col>
  </Row>

   
  </div>
  
    

       
  );
};

export default SimilarCases;
