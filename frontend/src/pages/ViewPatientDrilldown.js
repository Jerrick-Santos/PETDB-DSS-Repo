import search from "../assets/search.png";
import "../index.css";
import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import NavBar from "../components/NavBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import sort from "../assets/sort.png";
import noresult from "../assets/noresult.png";
import Spinner from "react-bootstrap/Spinner";

const ViewPatientDrilldown = () => {

  const { status, year } = useParams()

  let status_name
  parseInt(status, 10) ? status_name = "Latent TB " : status_name = "Presumptive TB "
  
  const[show,setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(true);
  const [patientsData, setPatientsData] = useState([]); // make it the base, the one being collected by the axios call
  const [modifiedPatientsData, setModifiedPatientData] = useState([]) // useState used to render frontend, replace with patientsData on reset
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [regionData, setRegionData] = useState([]);

  // ADDRESS DROPDOWN LOGIC ----------------------------------------------------------
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
  // ADDRESS DROPDOWN LOGIC ----------------------------------------------------------


  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/getPatientDrilldown/${status}/${year}`)
      .then((response) => {
        setPatientsData(response.data);
        setModifiedPatientData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, []);


  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [advanceData, setAdvanceData] = useState({
    last_name: "_",
    first_name: "_",
    middle_initial: "_",
    age: "_",
    sex: "_",
    birthdate: "_",
    nationality: "_",

});


const handleAdvanceChange = (e) => {
    const {name, value} = e.target;
    setAdvanceData(prev=>({...prev, [name]: value}));
}
  const handleAdvanceSearch= async (e) => {
     
    axios.get(`http://localhost:4000/api/advancedsearch/${advanceData.last_name}/${advanceData.first_name}/${advanceData.middle_initial}/${advanceData.age}/${advanceData.sex}/${advanceData.birthdate}/${advanceData.nationality}`)
    .then(response => {
      setPatientsData(response.data);
      setAdvanceData({
        last_name: "_",
        first_name: "_",
        middle_initial: "_",
        age: "_",
        sex: "_",
        birthdate: "_",
        nationality: "_",
      });
      handleClose()
      setActivePage(1)
    })
    .catch(error => {
      console.error('Error fetching patients:', error);
    });
}
  const handleReset = () => {
    setModifiedPatientData(patientsData)
    setSearchTerm("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('function handlesubmit reached...')

    if (searchTerm === "") {
      setModifiedPatientData(patientsData)
    }
    else {
      const patients = patientsData;
      const filtered_patients = []
  
      patients.forEach((patient) => {
        if (patient.completename.toLowerCase().includes(searchTerm)) {
          filtered_patients.push(patient)
        }
      })
  
      console.log('NEW ARRAY: ',filtered_patients);
      console.log(searchTerm);
      
      setModifiedPatientData(filtered_patients)
    }
  };
  console.log(patientsData);

  // Filter the hiData based on selectedStatus
  const filteredData = modifiedPatientsData.filter((item) => {
    if (selectedStatus === "") {
      // If no filter is selected, show all items
      return true;
    } else {
      // Filter based on the selected option (1 for active, 0 for deactivated)
      return item.case_status === selectedStatus;
    }
  });

  if (selectedSort === "0") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.completename; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.completename; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameA.localeCompare(nameB);
    });
  }
  else if (selectedSort === "1") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.completename; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.completename; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameB.localeCompare(nameA);
    });
  } else if (selectedSort === "2") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.CaseNo; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.CaseNo; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameA - nameB;
    });
  } else if (selectedSort === "3") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.CaseNo; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.CaseNo; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameB - nameA;
    });
  } else if (selectedSort === "4") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in ascending order (oldest to newest)
      const dateA = new Date(a.dayssincelastdiag);
      const dateB = new Date(b.dayssincelastdiag);
      return dateA - dateB;
    });
  } else if (selectedSort === "5") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (newest to oldest)
      const dateA = new Date(a.dayssincelastdiag);
      const dateB = new Date(b.dayssincelastdiag);
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

  const maxPageLinks = 8;

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

          {/* Simple search based on a keyword and a button for advanced Search*/}
          <Row className="justify-content-center">
            <Col className="justify-content-center" lg="10">


           
              <Row className="justify-content-center">
                <Col className="justify-content-center" lg="12">
                  <h1 className="mt-4" style={{ fontSize: "35px" }}>
                    {" "}
                    {status_name} Patient Records{" "}
                  </h1>
                </Col>
              </Row>

              <Row>
                <Col lg="9">
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
                {/* <Col lg="2" className="mt-3">
                <button className="btn" onClick={handleShow} style={{ color: "white", backgroundColor: '#0077B6', minWidth: '100%'}} type="submit">Advanced Search</button>
                </Col> */}

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
                      <option value="0">Sort by Name (A-Z)</option>
                      <option value="1">Sort by Name (Z-A)</option>
                      <option value="2">Sort by Case (Oldest to Latest)</option>
                      <option value="3">Sort by Case (Latest to Oldest)</option>
                      <option value="4">Sort by Days Since Last Diagnosis (Ascending)</option>
                      <option value="5">Sort by Date Since Last Diagnosis (Decsending)</option>
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
                   
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col className="justify-content-center" sm="10">
            {filteredData.length > 0 ? (
              <Card className="mt-3 mb-4">
                <Card.Body>
                  {/* Showing overall patient records in a table formatting. Hard-coded for frontend. Revise once backend
        is implemented */}

                  <table className="table caption-top bg-white rounded mt-2 mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Most Recent Case No.</th>
                        <th scope="col">Days Since Last Diagnosis</th>
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
                                  <u>{patient.completename}</u>
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
                              {patient.dayssincelastdiag}
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
                      No Patients Found{" "}
                    </h1>
                  </Card.Body>
                </Card>
              )}
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

          </>
              )}
        </Col>
      </Row>
    </div>

<Modal show={show} onHide={handleClose} backdrop={ 'static' } size="xl">
<Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
    <Modal.Title>Advanced Search</Modal.Title>
</Modal.Header>
<Modal.Body>
<form className="mt-4 justify-content-center">
<Row className="mb-2 justify-content-center">
             <div className="form-group col-md-11">
                <p style={{fontSize:"17px"}}> Input a value to the corresponding text boxes to initiate advanced search. Leave unwanted fields blank. </p>
            </div>
        </Row>
        <hr/>
        <Row className="mb-2 justify-content-center">
             <div className="form-group col-md-11">
                <p style={{fontSize:"20px"}}> <strong> Patient Information  </strong> </p>
            </div>
        </Row>
        
  
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" class="form-control" id="inputFirstName" name='first_name' onChange={handleAdvanceChange} placeholder="First Name"/>
                </div>

                <div className="form-group col-md-3">
                    <label for="inputMI">Middle Name</label>
                    <input type="text" class="form-control" id="inputMI" name='middle_initial' onChange={handleAdvanceChange} placeholder="Middle Name"/>
                </div>

                <div className="form-group col-md-4">
                    <label for="inputLastName">Last Name</label>
                    <input type="text" class="form-control" id="inputLastName" name='last_name' onChange={handleAdvanceChange} placeholder="Last Name"/>
                </div>
          </Row>
          <Row className="mb-5 justify-content-center">
            <div className="form-group col-md-3">
                <label for="inputBirthdate">Birthdate</label>
                <input type="date" class="form-control" id="inputBirthdate" name='birthdate' onChange={handleAdvanceChange} />
            </div>
            
            <div className="form-group col-md-3">
            <label for="inputSex">Sex</label>
            <select id="inputSex" class="form-control" name='sex' onChange={handleAdvanceChange} >
                <option selected>Select</option>
                <option value="M" >Male</option>
                <option value="F" >Female</option>
            </select>
            </div>

            <div className="form-group col-md-2">
                <label for="inputAge">Age</label>
                <input type="number" class="form-control" id="inputAge"  name='age' onChange={handleAdvanceChange} placeholder="Age"/>
            </div>

            <div className="form-group col-md-3">
                <label for="inputNationality">Nationality</label>
                <input type="text" class="form-control" id="inputNationality"  name='nationality' onChange={handleChange} placeholder="Nationality"/>
            </div>
            
        </Row>
   

        
        </form>
</Modal.Body>
<Modal.Footer >
   
    <button className="btn" onClick={handleAdvanceSearch} style={{color:'white', backgroundColor: "#0077B6"}}>Search</button>

    <button type="submit" onClick={handleClose}  className="btn btn-secondary">Close</button>
</Modal.Footer>
</Modal>
</>
  );
};

export default ViewPatientDrilldown;
