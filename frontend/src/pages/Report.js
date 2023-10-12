import search from "../assets/search.png";
import "../index.css";
import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Badge from "react-bootstrap/Badge";
import filter from "../assets/filter.png";
import sort from "../assets/sort.png";
import noresult from "../assets/noresult.png";
import Spinner from "react-bootstrap/Spinner";

const ReportGen = () => {
 
  const [isLoading, setIsLoading] = useState(true);
  const [patientsData, setPatientsData] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allpatients")
      .then((response) => {
        setPatientsData(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, []);

 
 
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
           {isLoading ? (
                <div
                  className="text-center"
                  style={{ marginTop: "10vh", marginBottom: "10vh" }}
                >
                  <Spinner
                    animation="border"
                    variant="primary"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginTop: "1rem",
                      color: "#0077B6",
                    }}
                  >
                    Loading...
                  </p>
                </div>
              ) : (
                <>

<Row className="justify-content-center">
                <Col className="justify-content-center" lg="12">
                  <h1 className="mt-4" style={{ fontSize: "35px" }}>
                    {" "}
                    Report Generation{" "}
                  </h1>
                </Col>
              </Row>

          </>
              )}
        </Col>
      </Row>
    </div>


</>
  );
};

export default ReportGen;
