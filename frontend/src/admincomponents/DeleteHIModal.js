import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import { Button, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import bin from '../assets/bin.png'
import {useNavigate} from 'react-router-dom';
import check from "../assets/check.png";

function DeleteHIModal(props) {
    const [show, setShow] = useState(false);
    const [isReferenced, setIsReferenced] = useState(false);
    const [reference, setReference] = useState(null);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/checkhiref/${props.HINo}`)
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
                    console.error('Error processing data:', error);
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            });
            setFormValues((prev) => ({
              ...prev,
              isActive: !props.isActive
            }));
    }, [props.HINo]); // Adding props.HINo as dependency

    const handleDelete = async e => {
        e.preventDefault()
        try{
            await axios.delete(`http://localhost:4000/api/deletehi/${props.HINo}`)
            navigate("/adminhi")
        }catch(err){
            console.log(err)
        }
    }

    const [formValues, setFormValues] = useState({
        isActive: false
    });

    const handleStatusUpdate = async e => {
        e.preventDefault()
        try{
            await axios.patch(`http://localhost:4000/api/updatehistatus/${props.HINo}`, formValues)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>  
            {props.isActive === 1 ? (
  
              <img
                src={bin}
                onClick={handleShow}
                className="mt-1 clickable"
                style={{ height: "30px" }}
                alt="Delete Record"
              />

              ) : (

              <img
                src={check}
                onClick={handleShow}
                className="mt-1 clickable"
                style={{ height: "30px" }}
                alt="Reactivate Record"
              />

          )}
          
            <Modal show={show} onHide={handleClose} backdrop={'static'} size="md">
                <Modal.Header style={{ color: "white", backgroundColor: props.isActive === 1 ? "#dc3545" : "#138313" }}>
                    <Modal.Title>{isReferenced && props.isActive === 1 ? (
                        <>
                        Deactivate Health Institution
                        </>
                    ) : !isReferenced && props.isActive === 1 ? (
                        <>
                        Delete Health Institution
                        </>
                    ) : (
                        <>
                        Reactivate Health Institution
                        </>
                    )}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {isReferenced && props.isActive === 1 ? (
            <>
              <strong>{props.HIName} </strong>is currently being referenced in
              other records. Only user deactivation is allowed. By deactivating,
              the user may no longer access their account. <br /> <br />
              Would you like to deactivate this user?
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
              Are you certain you want to delete{" "}
              <strong> {props.HIName} </strong>? <br /> <br />
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
              <strong> {props.HIName} </strong>?
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

export default DeleteHIModal;