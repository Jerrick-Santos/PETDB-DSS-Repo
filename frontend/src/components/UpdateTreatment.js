import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'


function UpdateTreatment(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({
        TreatmentID: props.TreatmentID,
        Medicine: props.Medicine,
        Dosage: props.Dosage,
        Frequency: props.Frequency,
        StartDate: props.StartDate,
        EndDate: props.EndDate
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/updatetreatments", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
    }
  return (
        <>

            <img
                src={edit}
                onClick={handleShow}
                className="mb-4 me-1 clickable"
                style={{ height: "20px" }}
                 />

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Update Health Institution</Modal.Title>
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
                    <input type="text" class="form-control" name="Dosage" value={formValues.Dosage} onChange={handleChange} placeholder="dosage of medicine"/>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">Frequency</label>
                    <input type="text" class="form-control" name="Frequency" value={formValues.Frequency} onChange={handleChange} placeholder="frequency of intake"/>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">Date Started</label>
                    <input type="date" class="form-control" name="StartDate" value={formValues.StartDate} onChange={handleChange} />
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">Date Ended</label>
                    <input type="date" class="form-control" name="EndDate" value={formValues.EndDate} onChange={handleChange} />
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




export default UpdateTreatment;

