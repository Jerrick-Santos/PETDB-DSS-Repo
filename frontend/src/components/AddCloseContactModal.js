import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';


function AddCloseContactModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a Close Contact
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg">
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add Close Contact</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="First Name"/>
                </div>
                <div className="form-group col-md-2">
                    <label for="inputMI">M.I.</label>
                    <input type="text" class="form-control" id="inputMI" placeholder="M.I."/>
                </div>
                <div className="form-group col-md-6">
                    <label for="inputLastName">Last Name</label>
                    <input type="text" class="form-control" id="inputLastName" placeholder="Last Name"/>
                </div>
              
                

                
            </Row>
           
            <Row className="mb-3 justify-content-center">
            <div className="form-group col-md-4">
                    <label for="inputBirthdate">Birthdate</label>
                    <input type="date" class="form-control" id="inputBirthdate" placeholder="Age"/>
                </div>
                
                <div className="form-group col-md-2">
                <label for="inputSex">Sex</label>
                <select id="inputSex" class="form-control">
                    <option selected>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                </div>

                <div className="form-group col-md-6"/>

               
               
            </Row>
            

            <Row className="mt-5 mb-3 justify-content-center">
                <div class="form-group col-md-6">
                    <label for="inputContactName">Name of Emergency Contact</label>
                    <input type="text" class="form-control" id="inputContactName" placeholder="Full Name"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputContactRelationship">Relationship</label>
                    <input type="email" class="form-control" id="inputContactRelationship" placeholder="e.g. Mother"/>
                </div>
                
                
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
            <div class="form-group col-md-6">
                    <label for="inputContactNumber">Contact #</label>
                    <input type="text" class="form-control" id="inputContactNumber" placeholder="e.g. 09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputContactEmail">Email Address</label>
                    <input type="text" class="form-control" id="inputContactEmail" placeholder="e.g. sample@sample.com"/>
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




export default AddCloseContactModal;

