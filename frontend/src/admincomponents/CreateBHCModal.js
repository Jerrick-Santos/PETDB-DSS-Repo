import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';


function CreateBHCModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [formValues, setFormValues] = useState({
        BGYName:'',
        BGYOperatingHours:'',
        BGYContactNumber:'',
        BGYEmailAddress:'',
        BGYUnitNo:'',
        BGYStreet:'',
        BGYBarangay:'',
        BGYCity:'',
        BGYRegion:'',
        BGYZipCode:'',
        XCoord:'',
        YCoord:''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newbhc", formValues)
        }catch(err){
            console.log(err)
        }
    }
  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a BHC
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Create a Barangay Health Center</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">BHC Name</label>
                    <input type="text" class="form-control"  name="BGYName"  value={formValues.BGYName} onChange={handleChange} placeholder="BHC Name"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputOperatingHours">Operating Hours</label>
                    <input type="text" class="form-control" name="BGYOperatingHours" value={formValues.BGYOperatingHours} onChange={handleChange} placeholder="Operating Hours"/>
                </div>
            </Row>
           
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputCurrHouseNo">Unit No.</label>
                    <input type="text" class="form-control"  name='BGYUnitNo' value={formValues.BGYUnitNo} onChange={handleChange} placeholder="House No."/>
                </div>
                
                <div className="form-group col-md-4">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" name='BGYStreet' value={formValues.BGYStreet} onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-4">
                    <label for="inputCurrBarangay">Barangay</label>
                    <input type="text" class="form-control" name='BGYBarangay' value={formValues.BGYBarangay} onChange={handleChange} placeholder="Barangay"/>
                </div>
                
            </Row>

            <Row className="mb-3 justify-content-center">
           

                <div className="form-group col-md-4">
                    <label for="inputCurrCity">City</label>
                    <input type="text" class="form-control"  name='BGYCity' value={formValues.BGYCity} onChange={handleChange}  placeholder="City"/>
                </div>

                <div className="form-group col-md-4">
                    <label for="inputCurrRegion">Region</label>
                    <input type="text" class="form-control"  name='BGYRegion' value={formValues.BGYRegion} onChange={handleChange} placeholder="Region"/>
                </div>

                <div className="form-group col-md-4">
                    <label for="inputCurrZip">Zip Code</label>
                    <input type="text" class="form-control"  name='BGYZipCode' value={formValues.BGYZipCode} onChange={handleChange}  placeholder="Zip"/>
                </div>
                
            </Row>

            <Row className="mb-3 justify-content-center">
           

           <div className="form-group col-md-6">
               <label for="inputCurrCity">X Coordinate</label>
               <input type="number" class="form-control"  name='XCoord' value={formValues.XCoord} onChange={handleChange}  placeholder="Coordinate"/>
           </div>

           <div className="form-group col-md-6">
               <label for="inputCurrRegion">Y Coordinate</label>
               <input type="number" class="form-control"  name='YCoord' value={formValues.YCoord} onChange={handleChange} placeholder="Coordinate"/>
           </div>

         
           
       </Row>

            <Row className="mb-3 justify-content-center">
            <div class="form-group col-md-6">
                    <label for="inputContactNumber">Contact #</label>
                    <input type="text" class="form-control" name="BGYContactNumber" value={formValues.BGYContactNumber} onChange={handleChange} placeholder="e.g. 09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputContactEmail">Email Address</label>
                    <input type="text" class="form-control" name="BGYEmailAddress" value={formValues.BGYEmailAddress} onChange={handleChange} placeholder="e.g. sample@sample.com"/>
                </div>
            </Row>

            
            </form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Add</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default CreateBHCModal;

