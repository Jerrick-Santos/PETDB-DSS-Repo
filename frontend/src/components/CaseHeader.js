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
            if (typeof res.data === 'object' && res.data.hasOwnProperty('date') && res.data.hasOwnProperty('sequence')) {
                const { date, sequence } = res.data;
                const orderedTimelineData = Object.keys(sequence)
                    .filter(index => sequence[index] !== -1)
                    .sort((a, b) => sequence[a] - sequence[b])
                    .reduce((acc, index) => {
                        acc[index] = date[index];
                        return acc;
                    }, {});
                
                setTimelineData(orderedTimelineData);
                console.log(orderedTimelineData);
            } else {
                // Log the entire response to understand the structure
                console.log("Invalid data format received", res.data);
            }
        })
        .catch(err => {
            console.error(err);
        })
    }, [props.caseNo]);

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
                        <div className="timeline-steps aos-init aos-animate" data-aos="fade-up">
                                {Object.keys(timelineData).map((key, index) => (
                                    <div className="timeline-step" key={index}>
                                        <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content={`And here's some amazing content. It's very engaging. Right?`} data-original-title={key}>
                                            <div className="inner-circle"></div>
                                            <p className="h6 mt-3 mb-1">{new Date(timelineData[key]).toLocaleDateString().replaceAll("/", "-")}</p>
                                            <p className="h6 text-muted mb-0 mb-lg-0">{mapLabel(key)}</p>
                                        </div>
                                    </div>
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

const mapLabel = (key) => {
    const labelMap = {
        healthAssessment: '1st Assessment',
        presumptve_tb: 'Presumptive Diagnosed',
        latent_tb: 'Latent Diagnosed',
        confirmed_tb: 'Confirmed Diagnosis',
        no_tb: 'No TB',
    };
    return labelMap[key] || key;
}

export default CaseHeader