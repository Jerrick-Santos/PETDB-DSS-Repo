import '../index.css';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
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


const Diagnosis = () => {

  {/*caseNum is the current case number you're accessing close contacts from, use this for your axios queries*/}
  const { id } = useParams();

  const [diagnosisData, setdiagnosisData] = useState([]);
  const [presumptiveData, setPresumptiveData] = useState();
  const [latentData, setLatentData] = useState();
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const handleButtonClick = async () => {
    setIsLoading(true); // Set loading state to true
    // Make the HTTP request

    //SET DIAGNOSIS 
    axios.post(`http://localhost:4000/api/diagnose/${id}`)
      .then(response => {
        console.log(response.data); // Handle the response as needed
        // Reset loading state
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // Reset loading state
      });

      //GET LATEST DIAGNOSIS (specifically get the values of latent and presumptive tb)
      axios.get(`http://localhost:4000/api/getlatestdiagnostic/${id}`)
      .then(diagnosis => {
        console.log(diagnosis.data); // Handle the response as needed
        const {latent_tb} = diagnosis.data
        setLatentData(latent_tb)

        const {presumptive_tb} = diagnosis.data
        console.log(presumptive_tb)
        setPresumptiveData(presumptive_tb)
   
        setIsLoading(false); // Reset loading state
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // Reset loading state
      });

      //DIAGNOSE = PRESUMPTIVE
      if(presumptiveData === 1 && latentData === -1){
        
      }
      //DIAGNOSE = LATENT
      else if (presumptiveData === -1 && latentData === 1){

      }

  };

  useEffect(() => {
    axios.get(`http://localhost:4000/api/getalldiagnosis/${id}`)
      .then(response => {
        setdiagnosisData(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  var caseNum = id

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
          <button className="btn ms-1 " style={{ color: "white", backgroundColor: '#0077B6', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Diagnosis
          </button>
          <Link to={`/treatments/${caseNum}`}> 
          <button className="btn ms-1 " style={{ color: "#03045E", backgroundColor: 'white', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }} type="button">
          <img src={treatment} className="mb-1" style={{height:"25px"}} alt="" /> Treatments
          </button>
          </Link>
          
          </Nav>
        
        </Navbar>
       
      </Col>
    </Row>
    
    {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
    <Row className="justify-content-center" >
      <Col lg="10" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      <Button onClick={handleButtonClick}
        disabled={isLoading} variant="primary" size="lg">
        Diagnose
      </Button>
      <table className="table caption-top bg-white rounded mt-2 ms-4">
    <caption className=' fs-4'>Patient Records</caption>
    <thead>
                    <tr>
                        <th scope="col">Date Diagnosed</th>    
                        <th scope="col">TB Status</th>
                        <th scope="col">Diagnosis</th>
                        <th scope="col">Further Evaluation Required</th>
                        <th scope="col">Request HIV Test</th>
                        <th scope="col">Request XRAY</th>
                        <th scope="col">Request MTB/RIF</th>
                        <th scope="col">Request TST</th>

                    </tr>
                </thead>
                <tbody>
                    {diagnosisData.map((diagnosis, index) => (
                    <tr key={index}>
                        {/* DATE DIAGNOSED */}
                        <td>{new Date(diagnosis.DGDate).toLocaleDateString()}</td>
                        {/* TB STATUS */}
                        <td>
                        {diagnosis.presumptive_tb === 1 ? "WITH TB" :
                        diagnosis.no_tb === 1 ? "NO TB" :
                        diagnosis.latent_tb === 1 ? "WITH TB" :
                        "NO TB"}
                        </td>
                        {/* DIAGNOSIS */}
                        <td>{diagnosis.diagnosis}</td>
                        {/* Further Evaluation Required */}
                        <td>
                        {diagnosis.need_eval === 1 ? "YES" :"NO"}
                        </td>
                        {/* Request HIV Test */}
                        <td>{diagnosis.need_hiv === 1 ? "YES" : "NO"}</td>
                        <td>{diagnosis.need_xray === 1 ? "YES" : "NO"}</td>
                        <td>{diagnosis.need_mtb === 1 ? "YES" : "NO"}</td>
                        <td>{diagnosis.need_tst === 1 ? "YES" : "NO"}</td>
                    </tr>
                    ))}
                </tbody>
            </table>



    </Col>
  </Row>

  </div>
  
    

       
  );
};

export default Diagnosis;
