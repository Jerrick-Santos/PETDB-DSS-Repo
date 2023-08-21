import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';

function AddTSTModal(props) {
   
    const[show,setShow] = useState(false)

    const[hiData, setHIData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/api/allhi`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
    
    }, []);

    const [tstValues, setTSTValues] = useState({
        CaseNo: props.caseNum,
        HINo: '',
        issue_date:'',
        test_refno:'',
        TestValue: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTSTValues(prev=>({...prev, [name]: value}));
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newTSTresults", tstValues)
        }catch(err){
            console.log(err)
        }
      }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <button className="btn" onClick={handleShow}> Add TST </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add TST Test Results</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-4 justify-content-center">
        <div>
            <label><strong> Upload TST Test File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={tstValues.HINo} onChange={handleChange}>
                <option value="">Select</option>
              
              {hiData.map((hi, index) => (
              <>
               <option value={hi.HINo}>{hi.HIName}</option>
              
                   </>
                    ))}
 

            </select>
        </div>
        <div className="mt-3">
            <label><strong>Issued on:</strong></label>
            <input type="date" className="form-control" name='issue_date' value={tstValues.issue_date} onChange={handleChange}/>
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={tstValues.test_refno} onChange={handleChange}/>
        </div>
        <div className="mt-3"> 
            <label> <strong>TST Test Results: </strong></label>
            <select className="form-select" name='TestValue' value={tstValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="&gt;10 MM">&gt;10 MM</option>
                <option value="&lt;10 MM">&lt;10 MM</option>
                <option value="10">10</option>
            </select>
        </div>
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

export default AddTSTModal;

