import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import edit from '../assets/edit.png';
import map from '../assets/map.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';


function XrayRecomModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <p className="clickable" onClick={handleShow} style={{color:"black", fontSize:"18px"}} ><strong><u>Xray</u> </strong>- Click for recommendations</p> 

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg">
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>  Xray Recommendations </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row className="mt-2">
            <Col>Recommended Site for Testing:<strong> DLSHSI</strong></Col>
        </Row>
        <Row className="mt-2">
            <Col>Operating Hours:<strong> Everyday 7:00 AM - 4:00 PM</strong></Col>
        </Row>


        <Row className="mt-4">
            <img src={map} style={{width:"100%" , opacity:"1"}}/>
        </Row>

    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleClose} style={{color:'white', backgroundColor: "#0077B6"}}>Confirm</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default XrayRecomModal;

