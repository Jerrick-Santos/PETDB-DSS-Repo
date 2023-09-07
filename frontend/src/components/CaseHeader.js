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

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCasePatient/${props.caseNum}`)
        .then(res => {
            console.log(res)
            setPatientData(res.data[0])
        })
        .catch(err => {
            console.error(err)
        })
    }, [props.caseNum])


    return (
        <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
            <Col className="ms-5" lg="12">
                <Row>
                    <Col><Badge bg="secondary">Case No: </Badge> {patientData.case_refno} </Col>
                </Row>

                <Row>
                    <Col><Badge bg="secondary">Patient Name: </Badge> <Link to={`/patient/${patientData.PatientNo}`}><u style={{ color:'black'}}>{patientData.patient_name} </u></Link></Col>
                </Row>

                <Row>
                     <Col><Badge bg="secondary">Case Start Date:</Badge> {new Date(patientData.start_date).toLocaleDateString().replaceAll("/", "-")}</Col>
                </Row>

                <Row>
                  <Col><Badge bg="secondary">Case End Date:</Badge> {patientData.case_status === "O" ? (
  <CloseCaseModal caseid={props.caseNum} />
) : patientData.case_status === "C" ? (
  <>{new Date(patientData.end_date).toLocaleDateString().replaceAll("/", "-")}</>
) : null}
                  </Col>
                </Row>

                <Row>
                <Col><Badge bg="secondary">Case Status:</Badge> {patientData.case_status === "C" ? "Closed" : "Ongoing"}</Col>
                </Row>

               
            </Col>
        </Row>
    )
}

export default CaseHeader