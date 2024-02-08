import "../index.css";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import {  Card, Row, Col, Button } from "react-bootstrap";

const GenerateReport = () => {

    const [report, setReport] = useState({
        presumptive: 0,
        fromDate: new Date().toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0],
    });

    const handleOptionChange = (e) => {
        setReport(prevReport => ({
            ...prevReport,
            presumptive: e.target.value === 'presumptive' ? 1 : 0,
        }))
    }

    const FromDate = report.fromDate ? new Date(report.fromDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const ToDate = report.toDate ? new Date(report.toDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value, type} = e.target;
        setReport((prevReport) => ({
            ...prevReport,
            [name]: type === 'radio' ? (value === 'presumptive' ? 1 : 0) : value,
        }));
    };

    const generateReport = async () => {
        axios
            .get(`http://localhost:4000/api/getreport`, {
                params: {
                    presumptive: report.presumptive,
                    fromDate: FromDate,
                    toDate: ToDate,
                },
            })
            .then((response) => {
                setResults(response.data);
                console.log(response.data)
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching report: ", error);
                setResults([]);
                setError('Error fetching report');
            })
    }
  
  return (
    <>
    <div>
        <NavBar />
        <Row className="mt-5 justify-content-center">
            <Col
                lg="11"
                className="justify-content-center"
                style={{
                    color: "#0077B6",
                    borderColor: "#0077B6",
                    borderWidth: "5px",
                    borderStyle: "solid",
                    borderRadius: "20px",
                }}
            >
                <Row className="justify-content-center">
                    <Col className="justify-content-center mb-4" lg="10">

                        <Row className="justify-content-center">
                            <Col className="justify-content-center" lg="12">
                                <h1 className="mt-4" style={{ fontSize: "35px" }}>
                                    {" "}
                                    Diagnosis Report{" "}
                                </h1>
                            </Col>
                        </Row>

                        <Row> 
                            <Col className="mb-2" lg="10">
                                <input 
                                    type="radio" 
                                    name='presumptive' 
                                    onChange={handleOptionChange} 
                                    value='presumptive' 
                                    checked={report.presumptive === 1} 
                                />&nbsp;Presumptive&nbsp;&nbsp;&nbsp;
                                <input 
                                    type="radio" 
                                    name='presumptive' 
                                    onChange={handleOptionChange} 
                                    value='latent' 
                                    checked={report.presumptive === 0} 
                                />&nbsp;Latent
                            </Col>
                        </Row>

                        <Row className="mb-3"> 
                            <Col lg="10">
                                &nbsp;From&nbsp;&nbsp;<input type="date" name='fromDate' onChange={handleChange} value={report.fromDate}/>
                                &nbsp;&nbsp;&nbsp;To&nbsp;&nbsp;<input type="date" name='toDate' onChange={handleChange} value={report.toDate}/>
                            </Col>
                        </Row>

                        <Row> 
                            <Col lg="10">
                                <Button variant="secondary" onClick={generateReport}>
                                    Generate Report
                                </Button>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col className="justify-content-center" sm="10">
                                <Card className="mt-3 mb-4">
                                    <Card.Body>
                                        <table className="table caption-top bg-white rounded mt-2 mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Diagnosis</th>
                                                    <th scope="col">Number of Cases</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {results.map((result, index) => (
                                                    <tr key={index}>
                                                        <td>{result.diagnosis}</td>
                                                        <td>{result.NumberofPresumptiveCases}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</>
  );
};

export default GenerateReport;
