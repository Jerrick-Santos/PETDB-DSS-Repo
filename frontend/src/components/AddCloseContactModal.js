import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import axios from 'axios';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function AddCloseContactModal(props) {
   


    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({
        last_name: '',
        first_name: '',
        middle_initial: '',
        birthdate: new Date(),
        sex: '',
        contact_person: '',
        contact_num: '',
        contact_email: '',
        contact_relationship: '',
        CaseNo: props.id
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            console.log(formValues)
            await axios.post("http://localhost:4000/api/addContacts", formValues)
            setShow(false)
        }catch(err){
            console.log(err)
        }
    } 

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
                    <input type="text" class="form-control" id="inputFirstName" placeholder="First Name" name="first_name"  value={formValues.first_name} onChange={handleChange}/>
                </div>
                <div className="form-group col-md-2">
                    <label for="inputMI">M.I.</label>
                    <input type="text" class="form-control" id="inputMI" placeholder="M.I." name="middle_initial" value={formValues.middle_initial} onChange={handleChange}/>
                </div>
                <div className="form-group col-md-6">
                    <label for="inputLastName">Last Name</label>
                    <input type="text" class="form-control" id="inputLastName" placeholder="Last Name" name="last_name" value={formValues.last_name} onChange={handleChange}/>
                </div>
              
                

                
            </Row>
           
            <Row className="mb-3 justify-content-center">
            <div className="form-group col-md-4">
                    <label for="inputBirthdate">Birthdate</label>
                    <input type="date" class="form-control" id="inputBirthdate" placeholder="Age" name="birthdate" value={formValues.birthdate} onChange={handleChange}/>
                </div>
                
                <div className="form-group col-md-2">
                <label for="inputSex">Sex</label>
                <select id="inputSex" class="form-control" name="sex" value={formValues.sex} onChange={handleChange}>
                    <option selected>Select</option>
                    <option value="M">Male</option>
                    <option value="F" >Female</option>
                </select>
                </div>

                <div className="form-group col-md-6"/>

               
               
            </Row>
            

            <Row className="mt-5 mb-3 justify-content-center">
                <div class="form-group col-md-6">
                    <label for="inputContactName">Name of Emergency Contact</label>
                    <input type="text" class="form-control" id="inputContactName" placeholder="Full Name" name="contact_person" value={formValues.contact_person} onChange={handleChange}/>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputContactRelationship">Relationship</label>
                    <input type="email" class="form-control" id="inputContactRelationship" placeholder="e.g. Mother" name="contact_relationship" value={formValues.contact_relationship} onChange={handleChange}/>
                </div>
                
                
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
            <div class="form-group col-md-6">
                    <label for="inputContactNumber">Contact #</label>
                    <input type="text" class="form-control" id="inputContactNumber" placeholder="e.g. 09xx-xxx-xxxx" name="contact_num" value={formValues.contact_num} onChange={handleChange}/>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputContactEmail">Email Address</label>
                    <input type="text" class="form-control" id="inputContactEmail" placeholder="e.g. sample@sample.com" name="contact_email" value={formValues.contact_email} onChange={handleChange}/>
                </div>
            </Row>

            
            </form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AddCloseContactModal;

