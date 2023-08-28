import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import xray from '../assets/xray.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';

function AddXrayModal(props) {
   
    const[show,setShow] = useState(false)
    const [xrayValidity, setXrayValidity] = useState([]);
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
        
        axios.get(`http://localhost:4000/api/validity/1`)
        .then((response) => {
        setXrayValidity(response.data)
        // Call computeValidity after fetching xrayValidity and when issue_date changes
        computeValidity();
        })
        .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetchingdata:', error);
        });
        
  

    }, []);



    const [xrayValues, setXrayValues] = useState({
        CaseNo: props.caseNum,
        HINo: '',
        issue_date: new Date().toISOString().split('T')[0],
        test_refno:'',
        TestValue: '',
        validity: 1,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
  


        setXrayValues((prev) => ({ ...prev, [name]: value }));
        if (name === 'issue_date') {
            computeValidity();
          }
      }

      const computeValidity = () => {
        const today = new Date();
        const issueDate = new Date(xrayValues.issue_date);

        if (xrayValidity.length > 0) {
        const validityMonths = xrayValidity[0].DGValidityMonths;
        const validityExpirationDate = new Date(issueDate);
        validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);

        console.log('Today: ', today);
        console.log('issueDate: ', issueDate);
        console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1 );

        if (today > validityExpirationDate) {
            setXrayValues((prev) => ({ ...prev, validity: 0 }));
        } else {
            setXrayValues((prev) => ({ ...prev, validity: 1 }));
        }
        }
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            await axios.post("http://localhost:4000/api/newXrayresults", xrayValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload();
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

