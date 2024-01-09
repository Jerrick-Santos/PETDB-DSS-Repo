import '../index.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import axios from 'axios';
import user from '../assets/user.png';
import Badge from 'react-bootstrap/Badge';
import CloseCaseModal from './CloseCaseModal';

const CaseHeader = (props) => {

    const [patientData, setPatientData] = useState([]);
    const [timelineData, setTimelineData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getttimelineinfo/${props.caseNo}`)
        .then(res => {
            console.log(res);
    
            // Check if res.data is an object and has the expected properties
            if (typeof res.data === 'object' && res.data.hasOwnProperty('healthAssessment')) {
                setTimelineData(res.data);
            } else {
                // Log the entire response to understand the structure
                console.log("Invalid data format received", res.data);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }, [props.caseNo]);

    const timelineSteps = [
        { key: 'healthAssessment', label: '1st Assessment' },
        { key: 'presumptve_tb', label: 'Presumptive Diagnosed' },
        { key: 'latent_tb', label: 'Latent Diagnosed' },
        { key: 'confirmed_tb', label: 'Confirmed Diagnosis' },
        { key: 'no_tb', label: 'No TB' },
    ]

    return (
        <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
            <Col className="ms-5" lg="12">
                <Row>
                    <Col><Badge bg="secondary">Case No: </Badge> {props.case_refno} </Col>
                </Row>

                <Row>
                    <Col><Badge bg="secondary">Patient Name: </Badge> <Link to={`/patient/${props.PatientNo}`}><u style={{ color:'black'}}>{props.patient_name} </u></Link></Col>
                </Row>
                


                <Row>
                <Col>
  <Badge bg="secondary">Case Start Date:</Badge>{" "}
  {props.start_date
    ? new Date(props.start_date).toLocaleDateString().replaceAll("/", "-")
    : null}
</Col>
                </Row>
                {props.case_status === "C" ? (
                <Row>
                  <Col><Badge bg="secondary">Case End Date:</Badge> 
                  <>{" "}
               {new Date(props.end_date).toLocaleDateString().replaceAll("/", "-")}
               </>
                  </Col>
                </Row>
                ):null}

                <Row>
                <Col><Badge bg="secondary">Case Status:</Badge> {props.case_status === "O" ? (
                <CloseCaseModal caseid={props.caseNo} />
                ) : props.case_status === "C" ? (
                <><Badge bg="danger">
                Closed
              </Badge></>
                ) : null}</Col>
                </Row>
                <Row className='text-center justify-content-center'>
                <div class="container">                      
                    <div class="row text-center justify-content-center mt-4 mb-5 me-4">
                        <div class="col-xl-6 col-lg-8">
                            <h2 class="font-weight-bold">Patient Timeline</h2>
                        </div>
                    </div>

                    <div class="row text-center mb-5 me-4">
                        <div class="col">
                            <div class="timeline-steps aos-init aos-animate" data-aos="fade-up">
                                {timelineSteps.map(step => (
                                timelineData[step.key] !== 0 && (
                                    <div class="timeline-step" key={step.key}>
                                    <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">
                                        <div class="inner-circle"></div>
                                        <p class="h6 text-muted mt-3 mb-1">{timelineData[step.key] !== 0 ? new Date(timelineData[step.key]).toLocaleDateString().replaceAll("/", "-") : null}</p>
                                        <p class="h6 mb-0 mb-lg-0">{step.label}</p>
                                    </div>
                                    </div>
                                )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </Row>
            </Col>
        </Row>
    )
}

export default CaseHeader