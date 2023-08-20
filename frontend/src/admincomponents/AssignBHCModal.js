import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';


function AssignBHCModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleChange = (e) => {
   
    };
  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Assign a Health Institution
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Assign a Health Institution</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <p>Name: Name</p>
    <p>Address: Address</p>
    <form className="mt-3 justify-content-center">
    <Card className="mt-4 mb-4">
          <Card.Body>
             <Row>
 
              <Col sm="6">
                    <strong>Health Institution </strong>
              </Col>
              <Col sm="6">
                    <strong>Address</strong>
              </Col>
            </Row>
            <hr/>
            <Row>
 
              <Col sm="6">
              <label className="checkbox"  >
                                <input type="checkbox" name="nameCheckbox" value="Name 1" /> Mark ANthony Anotnio asudhiwrh bajfj
                    </label>
                    
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted "> Mark ANthony Anotnio asudhiwrh bajfjsfasf ffdsfsd fsd dfsdfsdf f sdfsdfsdfsd sdfsdfsdf </Card.Text>
              </Col>
            </Row>
            
            
          </Card.Body>
        </Card>

        
    </form>
</Modal.Body>

    <Modal.Footer >
        <button className="btn" style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AssignBHCModal;

