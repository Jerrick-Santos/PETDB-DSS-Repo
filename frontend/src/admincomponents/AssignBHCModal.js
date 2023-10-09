import Modal from 'react-bootstrap/Modal';
import React, {useState,useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import search from '../assets/search.png';
import Pagination from 'react-bootstrap/Pagination';
import CreateHIModal from './CreateHIModal';


function AssignBHCModal(props) {
   
    const[show1,setShow1] = useState(false)

    const handleClose = () => setShow1(false);
    const handleShow = () => setShow1(true);

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

  const [hiNOError, setHIError] = useState('');

  const validate = () => {
    let hiNOError = '';
    if (!formValues.HINo) {
      hiNOError = 'Required';
    }
    setHIError(hiNOError); 

    if (hiNOError) {
      return false;
    }

    return true;
  }

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues(prev=>({...prev, [name]: value}));
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = validate();
    if(!isValid) {
        return;
    }

    try{
        await axios.post("http://localhost:4000/api/assignhi", formValues)
    }catch(err){
        console.log(err)
    }
    window.location.reload()
}


// Add these state variables
const [activePage, setActivePage] = useState(1); // Active page number
const itemsPerPage = 5; // Number of items per page

// Function to handle page change
const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
};

// Calculate the index range for the current page
const startIndex = (activePage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        axios.get(`http://localhost:4000/api/searchbhcmissinghi/${props.id}/${searchTerm}`).then(response => {
                setHiData(response.data);
                console.log("added")
              })
              .catch(error => {
                console.error('Error searching patient:', error);
              });
    }



  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a nearby Health Institution
              </button>

        <Modal show={show1} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Assign a Health Institution</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <p><strong> BHC Name:</strong> {props.name}</p>
    <p><strong> Address:</strong> {props.address}</p>

    <form>
            <div className="mt-5 input-group" style={{ maxWidth: '290px' }}>
                {/* Adjust the max-width to control the width of the input field */}
                <input type="search"  className="form-control" name="searchTerm" value={searchTerm} onChange={handleSearchChange} placeholder="Search" />
                <button className="btn me-auto" style={{ color: "white", backgroundColor: '#0077B6' }} onClick={handleSearch} type="submit">  <img src={search} style={{height:"20px"}}alt="" /></button>
            </div>
        </form>
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
            
            {hiData.slice(startIndex, endIndex).map((hi, index) => (
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
        {hiNOError && (
                        <p style={{color: 'red'}}>{hiNOError}</p>  
                    )}
        <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
            {Array.from({ length: Math.ceil(hiData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === Math.ceil(hiData.length / itemsPerPage)} />
          </Pagination>
        
    </form>
</Modal.Body>

<Modal.Footer>
    <button type="submit" onClick={handleClose} className="btn btn-secondary me-2">
      Close
    </button>
    <button
      className="btn"
      onClick={handleSubmit}
      style={{ color: 'white', backgroundColor: "#0077B6" }}
    >
      Save
    </button>
</Modal.Footer>

</Modal>


    </>
      
  );
}




export default AssignBHCModal;

