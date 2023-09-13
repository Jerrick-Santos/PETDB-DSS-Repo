import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'


function UpdateXray(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [xrayValidity, setXrayValidity] = useState([]);

    const[hiData, setHIData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/1`)
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
          console.log('Validity Months: ', xrayValidity);
          // Call computeValidity after fetching xrayValidity and when issue_date changes
          computeValidity();
          })
          .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetchingdata:', error);
        });

    }, []);

    const [formValues, setFormValues] = useState({
        DGResultsNo: props.DGResultsNo,
        HINo: props.HINo,
        issue_date: props.issue_date,
        test_refno: props.test_refno,
        TestValue: props.TestValue,
        validity: props.validity,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
        if (name === 'issue_date') {
            computeValidity();
        }
    }

    const computeValidity = () => {
        const today = new Date();
        const issueDate = new Date(formValues.issue_date);

            const validityMonths = xrayValidity[0].DGValidityMonths;
            issueDate.setMonth(issueDate.getMonth() + validityMonths);

            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > issueDate ? 0 : 1);

            
        
              const calculatedValidity = today <= issueDate ? 1 : 0;

              // Log calculated validity
              console.log("Calculated validity:", calculatedValidity);
            
              setFormValues(prev => ({
                ...prev,
                validity: calculatedValidity
              }));     
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/updatetests", formValues)
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

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Update Xray Test</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
            <label><strong> Update Xray File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={formValues.HINo} onChange={handleChange}>
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
            <input type="date" className="form-control" name='issue_date' value={formValues.issue_date} onChange={handleChange}/>
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={formValues.test_refno} onChange={handleChange}/>
        </div>
        <div className="mt-3"> 
            <label> <strong>Xray Results: </strong></label>
            <select className="form-select" name='TestValue' value={formValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="With Signs of TB">With Signs of TB</option>
                <option value="No signs">No signs</option>
                <option value="Undetermined">Undetermined</option>
            </select>
        </div>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Update</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default UpdateXray;

