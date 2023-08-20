import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';


function AddCaseModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

            <button
                className="btn"
                style={{ color: "white", backgroundColor: '#0077B6'}}
                type="button"
                onClick={handleShow}
                disabled={!props.allClosed}
            >
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a Case
            </button>


        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add Case</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Case Ref No.</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="No."/>
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




export default AddCaseModal;

