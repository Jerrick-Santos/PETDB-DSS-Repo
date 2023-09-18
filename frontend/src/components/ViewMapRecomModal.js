import Modal from 'react-bootstrap/Modal';
import React, {useState, useRef, useEffect} from 'react';
import { Row, Col  } from 'react-bootstrap';
import axios from 'axios';

function ViewMapRecomModal(props) {
    // MODAL SETTERS
    
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>

        <p className="clickable" onClick={handleShow} style={{color:"black", fontSize:"18px"}} ><strong><u>Click to show recommendations</u></strong></p> 

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg">
            <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
                <Modal.Title>  Health Institute Recommendations </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row className="mt-2">
                    <Col>Recommended Site for Testing:<strong> DLSHSI</strong></Col>
                </Row>
                <Row className="mt-2">
                    <Col>Operating Hours:<strong> Everyday 7:00 AM - 4:00 PM</strong></Col>
                </Row>


                <Row className="mt-4">
                    {/** INSERT MAP HERE */}
                    <Col>{props.healthInst.HIName}</Col>
                    <Col>{props.healthInst.XCoord}</Col>
                    <Col>{props.healthInst.YCoord}</Col>
                    <Col>{props.healthInst.dist}</Col>
                </Row>

            </Modal.Body>
            <Modal.Footer >
                <button className="btn" onClick={handleClose} style={{color:'white', backgroundColor: "#0077B6"}}>Confirm</button>
            </Modal.Footer>
        </Modal>


    </>
      
  );
}




export default ViewMapRecomModal;

