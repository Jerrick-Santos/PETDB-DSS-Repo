import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';

function CreateDiagnosticTest() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [formValues, setFormValues] = useState({
        DGTestName:'',
        DGValidityMonths:''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/createdt", formValues)
        }catch(err){
            console.log(err)
        }
    }
  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/>     Create a Test
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Create a Diagnostic Test</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-8">
                    <label for="inputFirstName">Diagnostic Test Name</label>
                    <input type="text" class="form-control" name="DGTestName" value={formValues.DGTestName} onChange={handleChange} placeholder="Test Name"/>
                </div>
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Validity</label>
                    <input type="number" class="form-control" name="DGValidityMonths" value={formValues.DGValidityMonths} onChange={handleChange} placeholder="months"/>
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




export default CreateDiagnosticTest;

