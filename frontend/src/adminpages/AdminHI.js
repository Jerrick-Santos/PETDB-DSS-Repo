import search from "../assets/search.png";
import "../index.css";
import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import AdminNavBar from "../admincomponents/AdminNavBar";
import axios from "axios";
import CreateHIModal from "../admincomponents/CreateHIModal";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import filter from "../assets/filter.png";
import sort from "../assets/sort.png";
import Badge from "react-bootstrap/Badge";
import noresult from "../assets/noresult.png";
import Spinner from "react-bootstrap/Spinner";

const AdminHI = () => {
  const [hiData, setHiData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allhi")
      .then((response) => {
        setHiData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching HIs:", error);
      });
  }, []);

  console.log(hiData);
  // Function to handle dropdown change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Filter the hiData based on selectedStatus
  // Filter the hiData based on selectedStatus
  const filteredHiData = hiData.filter((item) => {
    if (selectedStatus === "") {
      // If no filter is selected, show all items
      return true;
    } else {
      // Filter based on the selected option (1 for active, 0 for deactivated)
      return item.isActive === parseInt(selectedStatus);
    }
  });

  // Apply additional filters to filteredHiData based on selectedRegion
  const filteredHiData2 = filteredHiData.filter((item) => {
    if (selectedRegion === "") {
      // If no region filter is selected, show all items in filteredHiData
      return true;
    } else {
      // Filter based on the selected region
      return item.HIRegion === parseInt(selectedRegion);
    }
  });

  const filteredHiData3 = filteredHiData2.filter((item) => {
    if (selectedProvince === "") {
      // If no region filter is selected, show all items in filteredHiData
      return true;
    } else {
      // Filter based on the selected region
      return item.HIProvince === parseInt(selectedProvince);
    }
  });

  const filteredHiData4 = filteredHiData3.filter((item) => {
    if (selectedCity === "") {
      // If no region filter is selected, show all items in filteredHiData
      return true;
    } else {
      // Filter based on the selected region
      return item.HICity === parseInt(selectedCity);
    }
  });

  const filteredHiData5 = filteredHiData4.filter((item) => {
    if (selectedBarangay === "") {
      // If no region filter is selected, show all items in filteredHiData
      return true;
    } else {
      // Filter based on the selected region
      return item.HIBarangay === parseInt(selectedBarangay);
    }
  });

  if (selectedSort === "1") {
    filteredHiData5.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.HIName; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.HIName; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameB.localeCompare(nameA);
    });
  }

  ///PAGINATION LOGIC
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

  const maxPageLinks = 10;

  const totalPages = Math.ceil(filteredHiData5.length / itemsPerPage);

  // Define the number of page links to show before and after the active page
  const pageLinksToShow = maxPageLinks - 2; // Subtract 2 for Prev and Next buttons

  // Calculate the start and end page numbers to display
  let startPage = Math.max(
    1,
    Math.min(
      activePage - Math.floor(pageLinksToShow / 2),
      totalPages - pageLinksToShow + 1,
    ),
  );
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
        setActivePage(1);
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
        setActivePage(1);
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
        setActivePage(1);
      })
      .catch((error) => {
        console.error("Error fetching barangays:", error);
      });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setActivePage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:4000/api/searchhi/${searchTerm}`)
      .then((response) => {
        setHiData(response.data);
        setActivePage(1);
      })
      .catch((error) => {
        console.error("Error searching patient:", error);
      });
  };

  return (
    <div>
      <AdminNavBar />
      <Row className="mt-5 justify-content-center">
        <Col
          lg="11"
          style={{
            color: "#0077B6",
            borderColor: "#0077B6",
            borderWidth: "5px",
            borderStyle: "solid",
            borderRadius: "20px",
          }}
        >
          {/* Shows the recommended next course of action */}
          <Row className="mt-5 justify-content-center">
            <Col lg="11">
            
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

                  <h1 style={{ fontSize: "35px" }}> Health Institutions (HI) </h1>
                  <Row>
                    <Col lg="4">
                      <form>
                        <div
                          className="mb- mt-3 input-group"
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
                            style={{
                              color: "white",
                              backgroundColor: "#0077B6",
                            }}
                            onClick={handleSubmit}
                            type="submit"
                          >
                            {" "}
                            <img
                              src={search}
                              style={{ height: "20px" }}
                              alt=""
                            />
                          </button>
                        </div>
                      </form>
                    </Col>
                    <Col lg="4">
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
                          onChange={(e) => {
                            setSelectedSort(e.target.value);
                            setActivePage(1);
                          }}
                        >
                          <option value="">Sort Alphabetically (A-Z)</option>
                          <option value="1">Sort Alphabetically (Z-A)</option>
                        </select>
                      </div>
                    </Col>
                    <Col lg="4">
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
                          onChange={(e) => {
                            setSelectedStatus(e.target.value);
                            setActivePage(1);
                          }}
                        >
                          <option value="">All Status</option>
                          <option value="1">Active</option>
                          <option value="0">Deactivated</option>
                        </select>
                      </div>
                    </Col>
                  </Row>

                  <Row>
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
                          name="HIRegion"
                          value={selectedRegion}
                          onChange={(e) => {
                            setSelectedRegion(e.target.value);
                            setSelectedProvince("");
                            setSelectedCity("");
                            setSelectedBarangay("");
                            handleRegionChange(e);
                          }}
                        >
                          <option value="">All Regions</option>

                          {regionData.map((hi, index) => (
                            <>
                              <option value={hi.region_id}>
                                {hi.region_name}
                              </option>
                            </>
                          ))}
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
                          name="HIProvince"
                          value={selectedProvince}
                          disabled={selectedRegion === ""}
                          onChange={(e) => {
                            setSelectedProvince(e.target.value);
                            setSelectedCity("");
                            setSelectedBarangay("");
                            handleProvinceChange(e);
                          }}
                        >
                          <option value="">All Province</option>

                          {provinceData.map((hi, index) => (
                            <>
                              <option value={hi.province_id}>
                                {hi.province_name}
                              </option>
                            </>
                          ))}
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
                          name="HICity"
                          value={selectedCity}
                          disabled={selectedProvince === ""}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setSelectedBarangay("");
                            handleCityChange(e);
                          }}
                        >
                          <option value="">All Cities</option>

                          {cityData.map((hi, index) => (
                            <>
                              <option value={hi.municipality_id}>
                                {hi.municipality_name}
                              </option>
                            </>
                          ))}
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
                          name="HIBarangay"
                          value={selectedBarangay}
                          disabled={selectedCity === ""}
                          onChange={(e) => {
                            setSelectedBarangay(e.target.value);
                          }}
                        >
                          <option value="">All Barangays</option>

                          {barangayData.map((hi, index) => (
                            <>
                              <option value={hi.barangay_id}>
                                {hi.barangay_name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </Col>
                  </Row>

                  {filteredHiData5.length > 0 ? (
                    <Card className="mt-4 mb-4">
                      <Card.Body>
                        <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">HI Name</th>
                              <th scope="col">Address</th>
                              <th scope="col">Operating Hours</th>
                              <th scope="col">Status</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>

                          <tbody>
                            {filteredHiData5
                              .slice(startIndex, endIndex)
                              .map((hi, index) => (
                                <tr key={index}>
                                  <td>
                                    <Link to={`/hi/${hi.HINo}`}>
                                      <p style={{ color: "black" }}>
                                        <u>{hi.HIName}</u>{" "}
                                      </p>{" "}
                                    </Link>{" "}
                                  </td>
                                  <td>{hi.address}</td>
                                  <td>{hi.HIOperatingHours}</td>
                                  <td>
                                    {hi.isActive === 1 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="success"
                                      >
                                        {" "}
                                        Active{" "}
                                      </Badge>
                                    ) : hi.isActive === 0 ? (
                                      <Badge
                                        style={{ fontSize: 16 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        Deactivated{" "}
                                      </Badge>
                                    ) : null}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card className="mt-4 mb-4 text-center">
                      <Row className="mt-4 justify-content-center">
                        <Col>
                          <img
                            src={noresult}
                            alt="No Results"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </Col>
                      </Row>

                      <Card.Body>
                        <h1 style={{ fontSize: "20px", color: "#808080" }}>
                          {" "}
                          No Records Found{" "}
                        </h1>
                      </Card.Body>
                    </Card>
                  )}

                  <Row className="mb-4">
                    <Col>
                      <CreateHIModal />
                    </Col>

                    <Col className="d-flex justify-content-end">
                      {filteredHiData5.length > 0 ? (
                        <Pagination className="mb-0">
                          <Pagination.Prev
                            onClick={() => handlePageChange(activePage - 1)}
                            disabled={activePage === 1}
                          />

                          {startPage > 1 && (
                            <>
                              <Pagination.Item
                                onClick={() => handlePageChange(1)}
                              >
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
                              {endPage < totalPages - 1 && (
                                <Pagination.Ellipsis />
                              )}
                              <Pagination.Item
                                onClick={() => handlePageChange(totalPages)}
                              >
                                {totalPages}
                              </Pagination.Item>
                            </>
                          )}

                          <Pagination.Next
                            onClick={() => handlePageChange(activePage + 1)}
                            disabled={activePage === totalPages}
                          />
                        </Pagination>
                      ) : null}
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AdminHI;
