import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import add from "../assets/add.png";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import bin from "../assets/bin.png";
import check from "../assets/check.png";
import { Link } from "react-router-dom";

function DeleteHIDGTest(props) {
  const [show, setShow] = useState(false);
  const [isReferenced, setIsReferenced] = useState(false);
  const [reference, setReference] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/checkhidgtestref/${props.HINo}/${props.DGTestNo}`)
      .then((response) => {
        setReference(response.data[0]);

        try {
          if (response.data[0].total_references > 0) {
            setIsReferenced(true);
          } else {
            setIsReferenced(false);
          }
        } catch (error) {
          // Handle any errors that occur during processing
          console.error("Error processing data:", error);
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error fetching data:", error);
      });
  }, [props.userNo]); // Adding props.HINo as dependency

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:4000/api/deletehidgtest/${props.HINo}/${props.DGTestNo}`,
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:4000/api/updatehidgteststatus/${props.HINo}/${props.DGTestNo}`,
        formValues,
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  const [formValues, setFormValues] = useState({
    isActive: !props.isActive,
  });

  return (
    <>
      
      {props.isActive === 1 ? (
        <>
          <img
            src={bin}
            onClick={handleShow}
            className="mb-4 clickable"
            style={{ height: "20px" }}
          />
        </>
      ) : (
        <>
          <img
            src={check}
            onClick={handleShow}
            className="mb-4 clickable"
            style={{ height: "20px" }}
          />
        </>
      )}
      

      <Modal show={show} onHide={handleClose} backdrop={"static"} size="md">
      <Modal.Header style={{ color: "white", backgroundColor: props.isActive === 1 ? "#dc3545" : "#138313" }}>
            <Modal.Title>
            {isReferenced && props.isActive === 1 ? (
            <>
              Deactivate Offered Diagnostic Test
            </>
          ) : !isReferenced && props.isActive === 1 ? (
            <>
              Delete Offered Diagnostic Test
            </>
          ) : (
            <>
              Reactivate Offered Diagnostic Test
            </>
          )}
            
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isReferenced && props.isActive === 1 ? (
            <>
              <strong>{props.DGTestName} </strong>is currently being referenced in
              other records. Only record deactivation is allowed.  <br /> <br />

              Would you like to deactivate this offered diagnostic test?
              <Row className="mt-4">
                <Col>
                  <Button
                    className="btn danger me-2"
                    onClick={handleStatusUpdate}
                    variant="danger"
                  >
                    Deactivate
                  </Button>

                  <Button
                    type="submit"
                    onClick={handleClose}
                    className="btn btn-secondary"
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </>
          ) : !isReferenced && props.isActive === 1 ? (
            <>
              Are you certain you want to remove{" "}
              <strong> {props.DGTestName} </strong>? <br /> <br />
              You can no longer undo this action.
              <br />
              <Row className="mt-4">
                <Col>
                  <Button
                    className="btn me-2"
                    onClick={handleDelete}
                    variant="danger"
                  >
                    Delete
                  </Button>

                  <Button
                    type="submit"
                    onClick={handleClose}
                    className="btn btn-secondary"
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <>
              Are you certain you want to reactivate{" "}
              <strong> {props.DGTestName} </strong>?
              <Row className="mt-4">
                <Col>
                  <Button
                    className="btn me-2"
                    onClick={handleStatusUpdate}
                    variant="success"
                  >
                    Reactivate
                  </Button>

                  <Button
                    type="submit"
                    onClick={handleClose}
                    className="btn btn-secondary"
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteHIDGTest;
