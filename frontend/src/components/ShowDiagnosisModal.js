import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import { Row, Col  } from 'react-bootstrap';
import ViewMapRecomModal from './ViewMapRecomModal';


function ShowDiagnosisModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <button onClick={handleShow} className="btn mt-3" style={{ color: "white", backgroundColor: '#0077B6'}} type="button">Save Assessment</button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Diagnosis</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row className="mt-2">
            <Col><strong> Diagnosis Date: </strong>  12/31/2023</Col>
        </Row>

        <Row className="mt-2">
            <Col><strong> Diagnosis: </strong>  Presumptive TB</Col>
        </Row>

        <Row className="mt-4">
            <Col>The following tests are needed for further evaluation:</Col>
        </Row>

        <Row className="mt-4">
            <Col><ViewMapRecomModal/> </Col>
        </Row>

        <Row className="mt-4">
            <Col> Please advice patient and parent to avoid close contact to contain the spread of TB.</Col>
        </Row>
    
                 
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleClose} style={{color:'white', backgroundColor: "#0077B6"}}>Confirm</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default ShowDiagnosisModal;

