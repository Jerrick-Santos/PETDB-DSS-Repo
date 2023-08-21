import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import view from '../assets/view.png';
import { Row, Col  } from 'react-bootstrap';
import xrayimg from '../assets/sample_xray.jpg';
import hivimg from '../assets/sample_hiv.jpg';


function AssessmentSummaryModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>
         <button className="btn" style={{ width:"170px", color: "white", backgroundColor: '#0077B6'}} onClick={handleShow}>
                <img src={view} className="me-1 mb-1" style={{height:"20px"}}/> View Details
              </button>
    
       

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="xl">
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Diagnosis Summary</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Row className="mt-2 ms-3 justify-content-center">
        <Col>
          <Row>
            <Col> <strong> Patient Name: </strong> Michael Andrews</Col>
          </Row>
          <Row>
            <Col> <strong> Diagnosis Date:  </strong>12/31/2023</Col>
          </Row>
   
        </Col>
      </Row>
  

            <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"90%"}}>
    <thead style={{fontSize:"12px"}}>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Cough</th>
                        <th scope="col">Fever</th>
                        <th scope="col">Night Sweats</th>
                        <th scope="col">Weight Loss</th>
                        <th scope="col">Fatigue</th>
                        <th scope="col">Reduced Playfulness</th>
                        <th scope="col">Decreased Activities</th>
                        <th scope="col">Not Eating Well</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <th scope="col">Symptomatic</th>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                    </tr>
                    <tr>
                        <th scope="col">Persistence</th>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                        <td>YES</td>
                    </tr>
                    
                </tbody>
                
               
            </table>

            <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"90%"}}>
            <caption className=' fs-6'>Other Assessment Facts</caption>
                <tbody>
                <tr>
                        <th scope="col">#</th>
                        <th scope="col">Condition</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Unable to stand</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Diabetes</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Smoking History</td>
                    </tr>
                    
                    
                </tbody>
                
               
            </table>

            <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"90%"}}>
            <caption className=' fs-6'>Laboratory Tests</caption>
                <tbody>
                <tr>
                        <th scope="col">Lab Test</th>
                        <th scope="col">Test Location</th>
                        <th scope="col">Date Tested</th>
                        <th scope="col">Ref. #</th>
                        <th scope="col">Result</th>
                        <th scope="col">Image</th>
                    </tr>
                    <tr>
                        <td>Xray</td>
                        <td>DLSHSI</td>
                        <td>12/31/2023</td>
                        <td>XR-034567</td>
                        <td>with Pedia TB</td>
                        <td><img src={xrayimg} style={{maxWidth:"400px", maxHeight:"200px"}}/></td>
                    </tr>
                    <tr>
                        <td>HIV</td>
                        <td>DLSHSI</td>
                        <td>12/31/2023</td>
                        <td>XR-034567</td>
                        <td>+1</td>
                        <td><img src={hivimg} style={{maxWidth:"400px", maxHeight:"200px"}}/></td>
                    </tr>
                    
                    
                </tbody>
                
               
            </table>
    </Modal.Body>
    <Modal.Footer >
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AssessmentSummaryModal;

