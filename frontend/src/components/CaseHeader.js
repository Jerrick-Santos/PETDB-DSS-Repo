import '../index.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import axios from 'axios';
import user from '../assets/user.png';


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
                    <Col><strong>Case No:</strong> {patientData.case_refno}</Col>
                </Row>

                <Row>
                    <Col><strong>Patient Name:</strong> {patientData.patient_name}</Col>
                </Row>

                <Row>
                    <Col><strong>Case Start Date:</strong> {new Date(patientData.start_date).toLocaleDateString()}</Col>
                </Row>

                <Row>
                    <Col><strong>Case End Date:</strong> {patientData.end_date === null ? " --" : new Date(patientData.end_date).toLocaleDateString()}</Col>
                </Row>

                <Row>
                    <Col><strong>Case Status:</strong> {patientData.case_status === "C" ? "Closed" : "Ongoing"} </Col>
                </Row>

                <Row>
                    <Col><strong>Presumptive ID:</strong> {patientData.presumptive_id === null ? "--" : patientData.presumptive_id}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CaseHeader