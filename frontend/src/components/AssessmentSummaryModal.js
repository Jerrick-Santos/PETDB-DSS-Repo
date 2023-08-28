import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import view from '../assets/view.png';
import { Row, Col  } from 'react-bootstrap';
import xrayimg from '../assets/sample_xray.jpg';
import hivimg from '../assets/sample_hiv.jpg';
import '../index.css';


function AssessmentSummaryModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
        <>
         <p className="clickable" onClick={handleShow}>
                {props.date} 
              </p>
    
       

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="xl">
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Assessment Summary</Modal.Title>
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
            <caption className=' fs-6'>Vital Signs</caption>
                <tbody>
                    <tr>
                        <th >Height</th>
                        <th>Body Weight</th>
                        <th>Temperature</th>
                        <th>Blood Pressure</th>
                        
                    </tr>
                    <tr>
                    <td>x cm</td>
                        <td>x kg</td>
                        <td>x C</td>
                        <td>x / x</td>
                    </tr>
                    
                    
                </tbody>
                
               
            </table>

            <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"90%"}}>
            <caption className=' fs-6'>Cardinal Symptoms</caption>
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
                        <th scope="col">More than 2 weeks</th>
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

           
    </Modal.Body>
    <Modal.Footer >
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AssessmentSummaryModal;

