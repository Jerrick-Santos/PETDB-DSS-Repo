import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';


function CreateDiagnosticTest() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleChange = (e) => {
   
    };
  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/>     Create a Test
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Create a Diagnostic Test</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-8">
                    <label for="inputFirstName">Diagnostic Test Name</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="Test Name"/>
                </div>
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Validity</label>
                    <input type="number" class="form-control" id="inputFirstName" placeholder="validity (months)"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputOperatingHours">Test Description</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="Operating Hours"/>
                </div>
            </Row>
          
            
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




export default CreateDiagnosticTest;

