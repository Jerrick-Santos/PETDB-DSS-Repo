import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';


function AddBHCModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleChange = (e) => {
   
    };
  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a BHC
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add a BHC</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">BHC Name</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="BHC Name"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputOperatingHours">Operating Hours</label>
                    <input type="text" class="form-control" id="inputFirstName" placeholder="Operating Hours"/>
                </div>
            </Row>
           
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputCurrHouseNo">Unit No.</label>
                    <input type="text" class="form-control" id="inputCurrHouseNo" name='curr_houseno' onChange={handleChange}  placeholder="House No."/>
                </div>
                
                <div className="form-group col-md-4">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" id="inputCurrStreet" name='curr_street' onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-4">
                    <label for="inputCurrBarangay">Barangay</label>
                    <input type="text" class="form-control" id="inputCurrBarangay" name='curr_barangay' onChange={handleChange}  placeholder="Barangay"/>
                </div>
                
            </Row>

            <Row className="mb-3 justify-content-center">
           

                <div className="form-group col-md-4">
                    <label for="inputCurrCity">City</label>
                    <input type="text" class="form-control" id="inputCurrCity" name='curr_city' onChange={handleChange}  placeholder="City"/>
                </div>

                <div className="form-group col-md-4">
                    <label for="inputCurrRegion">Region</label>
                    <input type="text" class="form-control" id="inputCurrRegion" name='curr_region' onChange={handleChange}  placeholder="Region"/>
                </div>

                <div className="form-group col-md-4">
                    <label for="inputCurrZip">Zip Code</label>
                    <input type="text" class="form-control" id="inputCurrZip" name='curr_zipcode' onChange={handleChange}  placeholder="Zip"/>
                </div>
                
            </Row>

            <Row className="mb-3 justify-content-center">
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




export default AddBHCModal;

