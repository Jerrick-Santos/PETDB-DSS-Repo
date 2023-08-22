import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';

function AssignHIModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [dtData, setDtData] = useState([]);


    useEffect(() => {

      axios.get(`http://localhost:4000/api/himissingtests/${props.id}`)
        .then((response) => {
          setDtData(response.data)
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetching data:', error);
        });
      
  
  }, []);
        const [formValues, setFormValues] = useState({
          HINo:props.id,
          DGTestNo:'',
          AcceptingVoucher:'',
          Price:''
      });

      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/assigntest", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
      }
  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a Diagnostic Test
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } >
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add a Diagnostic Test</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <p><strong> Health Institution:</strong> {props.name}</p>
    <p><strong> Address:</strong> {props.address }</p>
    <form className="mt-4 justify-content-center">
    <Row className="justify-content-center"> 
      <Col lg="12"> 
      <label> <strong>Diagnostic Test </strong></label>
            <select className="form-select" name="DGTestNo" value={formValues.DGTestNo} onChange={handleChange}>
                <option value="">Select</option>
              
              {dtData.map((dt, index) => (
              <>
               <option value={dt.DGTestNo}>{dt.DGTestName}</option>
              
                   </>
                    ))}
 

            </select>
      </Col>
    </Row>

    <Row className="mt-2 justify-content-center"> 
      <Col lg="7"> 
            <label><strong>Price</strong></label>
            <input type="number" className="form-control" name="Price" value={formValues.Price} onChange={handleChange}/>
      </Col>

      <Col lg="5"> 
      <label> <strong>Accepting Voucher </strong></label>
            <select className="form-select" name="AcceptingVoucher" value={formValues.AcceptingVoucher} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="2">No</option>

            </select>
      </Col>
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




export default AssignHIModal;

