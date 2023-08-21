import Modal from 'react-bootstrap/Modal';
import React, {useState,useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';


function AssignBHCModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [hiData, setHiData] = useState([]);


    useEffect(() => {

      axios.get(`http://localhost:4000/api/bhcmissinghi/${props.id}`)
        .then((response) => {
          setHiData(response.data)
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetching data:', error);
        });
      
  
  }, []);

    const [formValues, setFormValues] = useState({
      BGYNo:props.id,
      HINo:''
  });

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues(prev=>({...prev, [name]: value}));
}

const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        await axios.post("http://localhost:4000/api/assignhi", formValues)
    }catch(err){
        console.log(err)
    }
}

  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Assign a Health Institution
              </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Assign a Health Institution</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <p><strong> BHC Name:</strong> {props.name}</p>
    <p><strong> Address:</strong> {props.address}</p>
    <form className="mt-3 justify-content-center">
    <Card className="mt-4 mb-4">
          <Card.Body>
             <Row>
 
              <Col sm="6">
                    <strong>Health Institution   </strong>
              </Col>
              <Col sm="6">
                    <strong>Address</strong>
              </Col>
            </Row>
            {hiData.map((hi, index) => (
              <>
              <hr/>
            <Row>
 
              <Col sm="6">
             
              <label className="checkbox"  >
                                <input type="radio" name="HINo" value={hi.HINo} onChange={handleChange}/> {hi.HIName}
                    </label>
                    
              </Col>
              <Col sm="6">
                <Card.Text className="text-muted ">  {hi.address}</Card.Text> 
              </Col>
            </Row>
                   </>
                    ))}
            
            
            
            
          </Card.Body>
        </Card>

        
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




export default AssignBHCModal;

