import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import add from "../assets/add.png";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import bin from "../assets/bin.png";
import check from "../assets/check.png";
import { Link } from "react-router-dom";

function DeleteBHCHI(props) {
  const [show, setShow] = useState(false);
  const [isReferenced, setIsReferenced] = useState(false);
  const [reference, setReference] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:4000/api/deletebhchi/${props.id}/${props.HINo}`,
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  
  return (
    <>
      
      
          <img
            src={bin}
            onClick={handleShow}
            className="mb-4 clickable"
            style={{ height: "20px" }}
          />
   
         
      

      <Modal show={show} onHide={handleClose} backdrop={"static"} size="md">
      <Modal.Header style={{ color: "white", backgroundColor: "#dc3545"}}>
            <Modal.Title>
            Remove Nearby Health Institution
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
              Are you certain you want to remove{" "}
              <strong> {props.HIName} </strong> as a nearby health institution? <br /> 

              <Row className="mt-4">
                <Col>
                  <Button
                    className="btn me-2"
                    onClick={handleDelete}
                    variant="danger"
                  >
                    Remove
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
           
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteBHCHI;
