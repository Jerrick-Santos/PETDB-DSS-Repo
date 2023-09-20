import search from "../assets/search.png";
import "../index.css";
import React, { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import AdvancedSearch from "../components/AdvancedSearch";
import { Navbar, Nav, Card, Row, Col } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Badge from "react-bootstrap/Badge";
import filter from "../assets/filter.png";
import sort from "../assets/sort.png";

const ViewPatient = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/allregions`)
      .then((response) => {
        setRegionData(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error fetching data:", error);
      });
  }, []);

  const [provinceData, setProvinceData] = useState([]);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    axios
      .get(`http://localhost:4000/api/provinces/${selectedRegion}`)
      .then((response) => {
        setProvinceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  };

  const [cityData, setCityData] = useState([]);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    axios
      .get(`http://localhost:4000/api/cities/${selectedProvince}`)
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  const [barangayData, setBarangayData] = useState([]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    axios
      .get(`http://localhost:4000/api/barangays/${selectedCity}`)
      .then((response) => {
        setBarangayData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching barangays:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allpatients")
      .then((response) => {
        setPatientsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:4000/api/searchpatient/${searchTerm}`)
      .then((response) => {
        setPatientsData(response.data);
        console.log("added");
      })
      .catch((error) => {
        console.error("Error searching patient:", error);
      });

    console.log("submitted");
    console.log(searchTerm);
    console.log(patientsData);
  };
  console.log(patientsData);

  // Filter the hiData based on selectedStatus
  const filteredData = patientsData.filter((item) => {
    if (selectedStatus === "") {
      // If no filter is selected, show all items
      return true;
    } else {
      // Filter based on the selected option (1 for active, 0 for deactivated)
      return item.case_status === selectedStatus;
    }
  });

  if (selectedSort === "1") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.fullname; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.fullname; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameB.localeCompare(nameA);
    });
  } else if (selectedSort === "2") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.case_refno; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.case_refno; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameA.localeCompare(nameB);
    });
  } else if (selectedSort === "3") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.case_refno; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.case_refno; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameB.localeCompare(nameA);
    });
  } else if (selectedSort === "4") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in ascending order (oldest to newest)
      const dateA = new Date(a.admission_date);
      const dateB = new Date(b.admission_date);
      return dateA - dateB;
    });
  } else if (selectedSort === "5") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (newest to oldest)
      const dateA = new Date(a.admission_date);
      const dateB = new Date(b.admission_date);
      return dateB - dateA;
    });
  }

  //PAGINATION LOGIC
  // Add these state variables
  const [activePage, setActivePage] = useState(1); // Active page number
  const itemsPerPage = 10; // Number of items per page

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxPageLinks = 4;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Define the number of page links to show before and after the active page
  const pageLinksToShow = maxPageLinks - 2; // Subtract 2 for Prev and Next buttons

  // Calculate the start and end page numbers to display
  let startPage = Math.max(1, Math.min(activePage - Math.floor(pageLinksToShow / 2), totalPages - pageLinksToShow + 1));
  let endPage = Math.min(totalPages, startPage + pageLinksToShow - 1);
  
  // Adjust the start and end page numbers if they exceed the bounds
  if (endPage - startPage + 1 < pageLinksToShow) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, pageLinksToShow);
    } else {
      startPage = Math.max(1, totalPages - pageLinksToShow + 1);
    }
  }
  
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
  return (
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
          

          {/* Simple search based on a keyword and a button for advanced Search*/}
          <Row className="justify-content-center">
            <Col className="justify-content-center" lg="10">
              <Row className="justify-content-center">
                <Col className="justify-content-center" lg="12">
                  <h1 className="mt-4" style={{ fontSize: "35px" }}>
                    {" "}
                    Patient Record{" "}
                  </h1>
                </Col>
              </Row>

              <Row>
                <Col lg="4">
                  <form>
                    <div
                      className=" mt-3 input-group"
                      style={{ maxWidth: "100%" }}
                    >
                      {/* Adjust the max-width to control the width of the input field */}
                      <input
                        type="search"
                        className="form-control"
                        name="searchTerm"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search"
                      />
                      <button
                        className="btn me-auto"
                        style={{ color: "white", backgroundColor: "#0077B6" }}
                        onClick={handleSubmit}
                        type="submit"
                      >
                        {" "}
                        <img src={search} style={{ height: "20px" }} alt="" />
                      </button>
                    </div>
                  </form>
                </Col>
                <Col lg="2" className="mt-3">
                  <AdvancedSearch />
                </Col>

                <Col lg="3">
                  <div
                    className="mb-2 mt-3 input-group"
                    style={{
                      maxWidth: "100%",
                      display: "flex",
                      backgroundColor: "#0077B6",
                      borderRadius: "6px", // Adding borderRadius for rounding the outer div
                      overflow: "hidden", // Ensuring content doesn't overflow rounded corners
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#0077B6",
                        width: "30px",
                        height: "100%",
                      }}
                    >
                      <img
                        className="ms-1 mt-2"
                        src={sort}
                        style={{ height: "20px" }}
                        alt=""
                      />
                    </div>
                    <select
                      className="form-select"
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                    >
                      <option value="">Sort by Name (A-Z)</option>
                      <option value="1">Sort by Name (Z-A)</option>
                      <option value="2">Sort by Case (A-Z)</option>
                      <option value="3">Sort by Case (Z-A)</option>
                      <option value="4">Sort by Date Added (A-Z)</option>
                      <option value="5">Sort by Date Added (Z-A)</option>
                    </select>
                  </div>
                </Col>
                <Col lg="3">
                  <div
                    className="mb-2 mt-3 input-group"
                    style={{
                      maxWidth: "100%",
                      display: "flex",
                      backgroundColor: "#0077B6",
                      borderRadius: "6px", // Adding borderRadius for rounding the outer div
                      overflow: "hidden", // Ensuring content doesn't overflow rounded corners
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#0077B6",
                        width: "30px",
                        height: "100%",
                      }}
                    >
                      <img
                        className="ms-1 mt-2"
                        src={filter}
                        style={{ height: "20px" }}
                        alt=""
                      />
                    </div>
                    <select
                      className="form-select"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">All Case Status</option>
                      <option value="O">Ongoing</option>
                      <option value="C">Closed</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col className="justify-content-center" sm="10">
              <Card className="mt-3 mb-4">
                <Card.Body>
                  {/* Showing overall patient records in a table formatting. Hard-coded for frontend. Revise once backend
        is implemented */}

                  <table className="table caption-top bg-white rounded mt-2 mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Most Recent Case No.</th>
                        <th scope="col">Case Status</th>
                        <th scope="col">Date Added</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData
                        .slice(startIndex, endIndex)
                        .map((patient, index) => (
                          <tr key={index}>
                            <td>
                              <Link to={`/patient/${patient.PatientNo}`}>
                                <p style={{ color: "black" }}>
                                  <u>{patient.fullname}</u>
                                </p>
                              </Link>
                            </td>
                            <td>
                              <Link to={`/closecontacts/${patient.CaseNo}`}>
                                <p style={{ color: "black" }}>
                                  <u>{patient.case_refno}</u>
                                </p>
                              </Link>
                            </td>
                            <td>
                              {patient.case_status === "O" ? (
                                <Badge style={{ fontSize: 14 }} bg="success">
                                  {" "}
                                  Ongoing{" "}
                                </Badge>
                              ) : patient.case_status === "C" ? (
                                <Badge style={{ fontSize: 14 }} bg="danger">
                                  {" "}
                                  Closed{" "}
                                </Badge>
                              ) : null}
                            </td>
                            <td>
                              {new Date(
                                patient.admission_date,
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
            <Pagination className="mt-3 justify-content-center">
              <Pagination.Prev
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1}
              />

              {startPage > 1 && (
                <>
                  <Pagination.Item onClick={() => handlePageChange(1)}>
                    1
                  </Pagination.Item>
                  {startPage > 2 && <Pagination.Ellipsis />}
                </>
              )}

              {pageNumbers.map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === activePage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              ))}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <Pagination.Ellipsis />}
                  <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </Pagination.Item>
                </>
              )}

              <Pagination.Next
                onClick={() => handlePageChange(activePage + 1)}
                disabled={activePage === totalPages}
              />
            </Pagination>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ViewPatient;
