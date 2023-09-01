import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';

function AddMTBRIFModal(props) {
   
    const[show,setShow] = useState(false)
    const [mtbValidity, setMTBValidity] = useState([]);
    const[hiData, setHIData] = useState([])

    const [mtbValues, setMTBValues] = useState({
            CaseNo: props.caseNum,
            HINo: '',
            issue_date: new Date().toISOString().split('T')[0],
            test_refno:'',
            TestValue: '',
            validity: 1,
    })

    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/2`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
        axios.get(`http://localhost:4000/api/validity/2`)
          .then((response) => {
          setMTBValidity(response.data)
          console.log('Validity Months: ', mtbValidity);
          // Call computeValidity after fetching xrayValidity and when issue_date changes
          computeValidity();
          })
          .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error fetchingdata:', error);
        });
    
    }, [mtbValues.issue_date, mtbValidity]);

    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMTBValues((prev)=>({...prev, [name]: value}));
        if (name === 'issue_date') {
            computeValidity();
        }
    }

    const computeValidity = () => {
        const today = new Date();
        const issueDate = new Date(mtbValues.issue_date);

        if (mtbValidity.length > 0) {
            const validityMonths = mtbValidity[0].DGValidityMonths;
            const validityExpirationDate = new Date(issueDate);
            validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);

            console.log('Today: ', today);
            console.log('issueDate: ', issueDate);
            console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1);

            if (today > validityExpirationDate) {
                setMTBValues((prev) => ({ ...prev, validity: 0 }));
            } else {
                setMTBValues((prev) => ({ ...prev, validity: 1 }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newMTBresults", mtbValues)
        }catch(err){
            console.log(err)
        }

        window.location.reload()
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <button className="btn" onClick={handleShow}> Add MTB/RIF</button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' }>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add MTB/RIF Results</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div>
            <label><strong> Upload MTB/RIF File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={mtbValues.HINo} onChange={handleChange}>
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
            <input type="date" className="form-control" name='issue_date' value={mtbValues.issue_date} onChange={handleChange}/>
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={mtbValues.test_refno} onChange={handleChange}/>
        </div>
        <div className="mt-3"> 
            <label> <strong>MTB/RIF Results: </strong></label>
            <select className="form-select" name='TestValue' value={mtbValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="0-NA">MTB not Detected</option>
                <option value="MTB-S">MTB Detected/RIF not detected</option>
                <option value="MTB-R">MTB Detected/RIF detected</option>
                <option value="MTB-NA">MTB Detected Trace/RIF resistance indeterminate 1st collection</option>
                <option value="MTB-NA">MTB Detected Trace/RIF resistance indeterminate 2nd collection</option>
                <option value="0-NA">Indeterminate/Error 1st collection</option>
                <option value="0-NA">Indeterminate/Error 2nd collection</option>
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




export default AddMTBRIFModal;

