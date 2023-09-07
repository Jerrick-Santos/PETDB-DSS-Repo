import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import axios from 'axios';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';
import ViewSimilarPatientModal from '../components/ViewSimilarPatientModal'

function AddTreatmentModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id=props.caseID;


    const [formValues, setFormValues] = useState({
        CaseNo: id,
        Medicine:'',
        Dosage:'',
        Frequency:'',
        Period:'',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/addtreatment", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
    }
  return (
        <>

            <button className="btn mb-4" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/>     Add a Treatment
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add a Treatment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-7">
                    <label for="inputFirstName">Medicine Name</label>
                    <input type="text" class="form-control" name="Medicine" value={formValues.Medicine} onChange={handleChange} placeholder="medicine name"/>
                </div>
                <div className="form-group col-md-5">
                    <label for="inputFirstName">Dosage</label>
                    <input type="number" class="form-control" name="Dosage" value={formValues.Dosage} onChange={handleChange} placeholder="dosage of medicine"/>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-7">
                    <label for="inputFirstName">Frequency</label>
                    <input type="text" class="form-control" name="Frequency" value={formValues.Frequency} onChange={handleChange} placeholder="frequency of intake"/>
                </div>
                <div className="form-group col-md-5">
                    <label for="inputFirstName">Period</label>
                    <input type="number" class="form-control" name="Period" value={formValues.Period} onChange={handleChange} placeholder="months"/>
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






export default AddTreatmentModal;

