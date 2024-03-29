import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import axios from 'axios';
import add from '../assets/add.png';
import { Row } from 'react-bootstrap';

function AddCaseModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({
        case_refno: '',
        patientNo:props.patientNo,
        startDate: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newcase", formValues)
        }catch(err){
            console.log(err)
        }

        window.location.reload()
    }

  return (
        <>
            <button
                className="btn"
                style={{ color: "white", backgroundColor: '#0077B6'}}
                type="button"
                onClick={handleShow}
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
                <input type="text" class="form-control" id="inputFirstName" name="case_refno" value={formValues.case_refno} onChange={handleChange} placeholder="No."/>
            </div>
        </Row>
    </form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose}  className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>
    </>
  );
}
export default AddCaseModal;