import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Button, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import bin from '../assets/bin.png'
import {Link} from 'react-router-dom';





function DeleteAssessment(props) {
    const [show, setShow] = useState(false);
    const [isReferenced, setIsReferenced] = useState(false);
    const [reference, setReference] = useState(null);


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
    }, [props.HINo]); // Adding props.HINo as dependency

    const handleDelete = async e => {
        e.preventDefault()
        try{
            await axios.delete(`http://localhost:4000/api/deletehi/${props.HINo}`)
        }catch(err){
            console.log(err)
        }
       
    }

    const [formValues, setFormValues] = useState({

        isActive: 0
    });

    const handleDeactivate = async e => {
        e.preventDefault()
        try{
            await axios.patch(`http://localhost:4000/api/updatehistatus/${props.HINo}`, formValues)
        }catch(err){
            console.log(err)
        }
       
    }

    return (
        <>
            
            
            <img
                src={bin}
                onClick={handleShow}
                className="mb-4 clickable"
                style={{ height: "20px" }}
                 />

            <Modal show={show} onHide={handleClose} backdrop={'static'} size="md">
                <Modal.Header style={{ color: 'white', backgroundColor: "#0077B6" }}>
                    <Modal.Title>Delete Health Institution</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isReferenced ? (
                        <>
                        <strong>{props.HIName}  </strong>is currently being referenced in other records.   <br/>  <br/>
                        Would you like to deactivate this record instead?
                        <Row className="mt-4">
                            <Col >
                            <button className="btn me-2" onClick={handleDeactivate} style={{ color: 'white', backgroundColor: "#0077B6", border: "none" }}>
                                    <Link to={"/adminhi"} >
                                        Deactivate
                                    </Link>
                                </button>
                           
                           
                                <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
                            </Col>
                        </Row>
                        </>
                       
                    ) : (
                        <>
                        Are you certain you want to delete <strong> {props.HIName}  </strong>?  <br/>  <br/>
                        You can no longer undo this action.
                        <br/>
                        <Row className="mt-4">
                            <Col >
                            
                            
                                <button className="btn me-2" onClick={handleDelete} style={{ color: 'white', backgroundColor: "#0077B6", border: "none" }}>
                                   
                                        Delete
                                   
                                </button>
                                
                            
                                
                                    
                           

                             
                           
                                <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
                            </Col>
                        </Row>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteAssessment;
