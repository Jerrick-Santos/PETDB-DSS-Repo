import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Button, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import bin from '../assets/bin.png'
import {Link} from 'react-router-dom';





function DeleteTreatment(props) {
    const [show, setShow] = useState(false);
    const [isReferenced, setIsReferenced] = useState(false);
    const [reference, setReference] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async e => {
        e.preventDefault()
        try{
            await axios.delete(`http://localhost:4000/api/deletetreatment/${props.TreatmentID}`)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
       
    }

    const [formValues, setFormValues] = useState({

        isActive: 0
    });


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
                    <Modal.Title>Delete Treatment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Are you certain you want to delete this treatment?  <br/>  <br/>
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
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteTreatment;
