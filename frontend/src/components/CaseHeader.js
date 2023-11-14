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

              
               
            </Col>
        </Row>
    )
}

export default CaseHeader