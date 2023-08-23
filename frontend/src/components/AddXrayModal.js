import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import xray from '../assets/xray.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';

function AddXrayModal(props) {
   
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

    const [xrayValues, setXrayValues] = useState({
        CaseNo: props.caseNum,
        HINo: '',
        issue_date:'',
        test_refno:'',
        TestValue: '',
        validity: 1, // Default to 1
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setXrayValues(prev=>({...prev, [name]: value}));
      }

      const computeValidity = () => {
        const today = new Date();
        const issueDate = new Date(xrayValues.issue_date);
        const oneYearInMillis = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

        if (today - issueDate > oneYearInMillis) {
            setXrayValues((prev) => ({ ...prev, validity: 0 }));
        } else {
            setXrayValues((prev) => ({ ...prev, validity: 1 }));
        }
    };

    

      const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            computeValidity(); // Calculate validity before submitting
            await axios.post("http://localhost:4000/api/newXrayresults", xrayValues)
        }catch(err){
            console.log(err)
        }

        window.location.reload()
      }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <button className="btn" onClick={handleShow}> Add XRay </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } >
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>  Add Xray Results  </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div>
            <label><strong> Upload Xray File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={xrayValues.HINo} onChange={handleChange}>
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
            <input type="date" className="form-control" name='issue_date' value={xrayValues.issue_date} onChange={handleChange}/>
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={xrayValues.test_refno} onChange={handleChange}/>
        </div>
        <div className="mt-3"> 
            <label> <strong>Xray Results: </strong></label>
            <select className="form-select" name='TestValue' value={xrayValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="With Signs of TB">With Signs of TB</option>
                <option value="No signs">No signs</option>
                <option value="Undetermined">Undetermined</option>
            </select>
        </div>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AddXrayModal;

