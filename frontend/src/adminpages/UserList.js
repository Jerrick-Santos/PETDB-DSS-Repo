import search from "../assets/search.png";
import "../index.css";
import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import AdminNavBar from "../admincomponents/AdminNavBar";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import AddUser from "../admincomponents/AddUser";
import UpdateUser from "../admincomponents/UpdateUser";
import DeleteUser from "../admincomponents/DeleteUser";
import Pagination from "react-bootstrap/Pagination";
import filter from "../assets/filter.png";
import sort from "../assets/sort.png";
import noresult from "../assets/noresult.png";
import Spinner from "react-bootstrap/Spinner";

const UserList = () => {
  const { id } = useParams();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/allusers/${id}`)
      .then((response) => {
        setUsersData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching BHCs:", error);
      });
  }, [update]);

  //PAGINATION LOGIC
  // Add these state variables
  const [activePage, setActivePage] = useState(1); // Active page number
  const itemsPerPage = 6; // Number of items per page

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxPageLinks = 5;

  const totalPages = Math.ceil(usersData.length / itemsPerPage);

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

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:4000/api/searchuser/${searchTerm}`)
      .then((response) => {
        setUsersData(response.data);
        setActivePage(1)
        console.log("added");
      })
      .catch((error) => {
        console.error("Error searching user:", error);
      });
  };
  console.log(usersData);

  // Filter the hiData based on selectedStatus
  const filteredData = usersData.filter((item) => {
    if (selectedStatus === "") {
      // If no filter is selected, show all items
      return true;
    } else if (selectedStatus === "1") {
      return item.isActive === 1 && item.passwordChanged === 1;
    } else if (selectedStatus === "2") {
      return item.isActive === 1 && item.passwordChanged === 0;
    } else if (selectedStatus === "3") {
      return item.isActive === 0;
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
      const nameA = a.username; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.username; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameA.localeCompare(nameB);
    });
  } else if (selectedSort === "3") {
    filteredData.sort((a, b) => {
      // Compare two items for sorting in descending order (Z-A)
      const nameA = a.username; // Replace 'propertyToSort' with the actual property name you want to sort by
      const nameB = b.username; // Replace 'propertyToSort' with the actual property name you want to sort by

      // Use localeCompare to perform a case-insensitive comparison
      return nameB.localeCompare(nameA);
    });
  }

  return (
    <div>
      <AdminNavBar />

      <Row className="mt-5 justify-content-center">
        <Col
          lg="9"
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
            <Col lg="9">
              

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
                <h1 style={{ fontSize: "35px" }}>
                {" "}
                Barangay Health Workers (Users){" "}
                </h1>

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
                          onChange={(e) => {setSelectedSort(e.target.value)
                            setActivePage(1)}}
                        >
                          <option value="">Sort by Name (A-Z)</option>
                          <option value="1">Sort by Name (Z-A)</option>
                          <option value="2">Sort by User ID (A-Z)</option>
                          <option value="3">Sort by User ID (Z-A)</option>
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
                          onChange={(e) => {setSelectedStatus(e.target.value)
                            setActivePage(1)}}
                        >
                          <option value="">All User Status</option>
                          <option value="1">Active</option>
                          <option value="2">New Account</option>
                          <option value="3">Deactivated</option>
                        </select>
                      </div>
                    </Col>
                  </Row>

                  {filteredData.length > 0 ? (
                    <Card className="mt-4 mb-4">
                      <Card.Body>
                        <table className="table caption-top bg-white rounded mt-2 mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Full Name</th>
                              <th scope="col">User ID</th>
                              <th scope="col">Account Status</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData
                              .slice(startIndex, endIndex)
                              .map((user, index) => (
                                <tr
                                  key={index}
                                >
                                  <td>{user.fullname}</td>
                                  <td>{user.username}</td>
                                  <td>
                                    {user.passwordChanged === 0 &&
                                    user.isActive === 1 ? (
                                      <Badge
                                        style={{ fontSize: 14 }}
                                        bg="info"
                                      >
                                        {" "}
                                        New Account{" "}
                                      </Badge>
                                    ) : user.passwordChanged === 1 &&
                                      user.isActive === 1 ? (
                                      <Badge
                                        style={{ fontSize: 14 }}
                                        bg="success"
                                      >
                                        {" "}
                                        Active
                                      </Badge>
                                    ) : user.isActive === 0 ? (
                                      <Badge
                                        style={{ fontSize: 14 }}
                                        bg="danger"
                                      >
                                        {" "}
                                        Deactivated
                                      </Badge>
                                    ) : null}
                                  </td>

                                  <td>
                                    <div className="d-flex justify-content-end">
                                      <UpdateUser
                                        first_name={user.first_name}
                                        middle_name={user.middle_name}
                                        last_name={user.last_name}
                                        username={user.username}
                                        userNo={user.userNo}
                                        isActive={user.isActive}
                                      />
                                      <DeleteUser
                                        userNo={user.userNo}
                                        fullname={user.fullname}
                                        isActive={user.isActive}
                                      />
                                    </div>
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
                      <AddUser BGYNo={id} onUpdate={() => setUpdate(!update)} />
                    </Col>

                    <Col className="d-flex justify-content-end">
                      {filteredData.length > 0 ? (
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

export default UserList;
