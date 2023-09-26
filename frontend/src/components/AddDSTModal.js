import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import edit from '../assets/edit.png';
import xray from '../assets/xray.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import add from '../assets/add.png';
function AddDSTModal(props) {
   
    const[show,setShow] = useState(false)
    const [dstValidity, setDstValidity] = useState([]);
    const[hiData, setHIData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/api/hiwithtests/9`)
          .then((response) => {
            setHIData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
        axios.get(`http://localhost:4000/api/validity/9`)
        .then((response) => {
        setDstValidity(response.data)
        // Call computeValidity after fetching xrayValidity and when issue_date changes
        computeValidity();
        })
        .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error fetchingdata:', error);
        });
        
  

    }, []);

    const [dstValues, setDstValues] = useState({
        CaseNo: props.caseNum,
        HINo: '',
        issue_date: new Date().toISOString().split('T')[0],
        test_refno:'',
        TestValue: '',
        drug2: '',
        drug3: '',
        validity: 1,
    })

    const [HINoError, setHIError] = useState('');
    const [dateError, setDateError] = useState('');
    const [testError, setTestError] = useState('');
    const [valueError, setValueError] = useState('');
    const [drug2Error, setDrug2Error] = useState('');
    const [drug3Error, setDrug3Error] = useState('');

    const validate = () => {
        let HINoError = '';
        if (!dstValues.HINo) {
            HINoError = 'Required';
        }
        setHIError(HINoError);

        let dateError = '';
        if (!dstValues.issue_date) {
            dateError = 'Required';
        }
        setDateError(dateError);

        let testError = '';
        if (!dstValues.test_refno) {
            testError = 'Required';
        }
        setTestError(testError);

        let valueError = '';
        if (!dstValues.TestValue) {
            valueError = 'Required';
        }
        setValueError(valueError);

        let drug2Error = '';
        if (!dstValues.drug2) {
            drug2Error = 'Required';
        }
        setDrug2Error(drug2Error);

        let drug3Error = '';
        if (!dstValues.drug3) {
            drug3Error = 'Required';
        }
        setDrug3Error(drug3Error);

        if (HINoError || dateError || testError || valueError || drug2Error || drug3Error) {
            return false;
          }

        return true;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
  


        setDstValues((prev) => ({ ...prev, [name]: value }));
        if (name === 'issue_date') {
            computeValidity();
          }
      }

      const computeValidity = () => {
        const today = new Date();
        const issueDate = new Date(dstValues.issue_date);

        if (dstValidity.length > 0) {
        const validityMonths = dstValidity[0].DGValidityMonths;
        const validityExpirationDate = new Date(issueDate);
        validityExpirationDate.setMonth(validityExpirationDate.getMonth() + validityMonths);

        console.log('Today: ', today);
        console.log('issueDate: ', issueDate);
        console.log("Computed Validity: ", today > validityExpirationDate ? 0 : 1 );

        if (today <= validityExpirationDate) {
            setDstValues((prev) => ({ ...prev, validity: 1 }));
          } else {
            setDstValues((prev) => ({ ...prev, validity: 0 }));
          }
        }
    };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if(!isValid){
          return;
        }
        
        try{
            await axios.post("http://localhost:4000/api/newDstresults", dstValues)
            props.onTestAdded();
            setDstValues((prevDstValues) => ({
                ...prevDstValues,
                HINo: '',
                issue_date: new Date().toISOString().split('T')[0],
                test_refno: '',
                TestValue: '',
                validity: 1,
              }));
            handleClose()
            
        }catch(err){
            console.log(err)
        }
      }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} onClick={handleShow}> 
        <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add DST </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } >
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>  Add DST Results  </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div>
            <label><strong> Upload DST File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select" name="HINo" value={dstValues.HINo} onChange={handleChange}>
                <option value="">Select</option>
              
              {hiData.map((hi, index) => (
              <>
               <option value={hi.HINo}>{hi.HIName}</option>
              
                   </>
                    ))}
 

            </select>
            {HINoError && (
                <p style={{color: 'red'}}>{HINoError}</p>  
            )}
        </div>
        <div className="mt-3">
            <label><strong>Issued on:</strong></label>
            <input type="date" className="form-control" name='issue_date' value={dstValues.issue_date} onChange={handleChange}/>
            {dateError && (
                <p style={{color: 'red'}}>{dateError}</p>  
            )}
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" name='test_refno' value={dstValues.test_refno} onChange={handleChange}/>
            {testError && (
                <p style={{color: 'red'}}>{testError}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 1: </strong></label>
            <select className="form-select" name='TestValue' value={dstValues.TestValue} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {valueError && (
                <p style={{color: 'red'}}>{valueError}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 2: </strong></label>
            <select className="form-select" name='drug2' value={dstValues.drug2} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {drug2Error && (
                <p style={{color: 'red'}}>{drug2Error}</p>  
            )}
        </div>
        <div className="mt-3"> 
            <label> <strong>Drug 3: </strong></label>
            <select className="form-select" name='drug3' value={dstValues.drug3} onChange={handleChange}>
                <option value="">Select</option>
                <option value="R">Resistant</option>
                <option value="S">Susceptible</option>
                <option value="NA">Indeterminate</option>
            </select>
            {drug3Error && (
                <p style={{color: 'red'}}>{drug3Error}</p>  
            )}
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




export default AddDSTModal;
