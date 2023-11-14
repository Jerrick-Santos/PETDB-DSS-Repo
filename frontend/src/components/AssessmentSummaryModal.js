import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import view from '../assets/view.png';
import { Row, Col  } from 'react-bootstrap';
import xrayimg from '../assets/sample_xray.jpg';
import hivimg from '../assets/sample_hiv.jpg';
import '../index.css';
import Badge from "react-bootstrap/Badge";

function AssessmentSummaryModal(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const assessmentFacts = [
        { condition: 'Unable to stand', index: 1, propValue: props.can_stand },
        { condition: 'Drowsy', index: 2, propValue: props.drowsy },
        { condition: 'Non-painful ECL', index: 3, propValue: props.non_painful_ecl },
        { condition: 'Living with a person having HIV', index: 4, propValue: props.plhiv },
        { condition: 'Patient has HIV', index: 5, propValue: props.hiv },
        { condition: "Patient's Mother has HIV", index: 6, propValue: props.mother_hiv },
        { condition: 'History of Smoking', index: 7, propValue: props.smoking },
        { condition: 'History of Drinking', index: 8, propValue: props.drinking },
        { condition: 'History of Sexual Activity', index: 9, propValue: props.sex_active },
        { condition: 'History of Renal Disease', index: 10, propValue: props.renal_disease },
        { condition: 'History of Malnutrition', index: 11, propValue: props.malnutrition },
        { condition: 'History of Tuberculosis', index: 12, propValue: props.prevPTB_diagnosed },
        // Add more conditions as needed
      ];

      const healthFacts = [
        { condition: 'Other Health Issues', index: 1, propValue: props.other_health_issues },
        { condition: 'Other Medications', index: 2, propValue: props.other_meds},
        { condition: 'Other Possible Drug to Drug Interactions', index: 3, propValue: props.other_dd_interacts },
        { condition: 'Other Co-morbidities', index: 4, propValue: props.other_comorbid },
        // Add more conditions as needed
      ];
    
      const filteredFacts = assessmentFacts.filter((fact) => fact.propValue === 1);
  return (
        <>
         <p className="clickable" onClick={handleShow}>
                <strong> <u> {props.date} </u></strong>
              </p>
    
       

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="xl">
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Assessment Summary</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Row className="mt-2 ms-3 justify-content-center">
        <Col>
          <Row>
            <Col> <strong> Assessment Date:  </strong>{props.date}</Col>
            
          </Row>
   
        </Col>
      </Row>
      <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"90%"}}>
            <caption className=' fs-6'>Vital Signs</caption>
                <tbody>
                    <tr>
                        <th >Height</th>
                        <th>Body Weight</th>
                        <th>Body Mass Index (BMI)</th>
                        <th>Temperature</th>
                        {/* <th>Blood Pressure</th> */}
                        
                    </tr>
                    <tr>
                    <td>{props.ass_height} cm</td>
                        <td>{props.ass_body_weight} kg</td>
                        <td>{props.ass_bmi}</td>
                        <td>{props.ass_temp} C</td>
                        {/* <td>{props.ass_bp}</td> */}
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
                        <td>{props.cough === 1 ?  <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.fever === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.night_sweats === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.weight_loss === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.fatigue === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.red_playfulness === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.dec_acts === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.not_eating_well === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                    </tr>
                    <tr>
                        <th scope="col">More than 2 weeks</th>
                        <td>{props.c_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.fe_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.ns_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.wl_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.fat_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.rp_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.da_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.new_weeks === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                    </tr>

                    <tr>
                        <th scope="col">Persistence</th>
                        <td>{props.c_persist === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.fe_persist  === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.ns_persist  === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.wl_persist  === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.fat_persist  === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.rp_persist  === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.da_persist  === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                        <td>{props.new_persist  === 1 ? <Badge style={{ fontSize: 14 }} bg="danger"> YES </Badge>: "NO"}</td>
                    </tr>
                    
                </tbody>
                
               
            </table>

            

            <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{ width: "90%" }}>
      <caption className='fs-6'>Other Assessment Facts</caption>
      <tbody>
        
        {filteredFacts.map((fact, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{fact.condition}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{ width: "90%", borderSpacing: '0px' }}>
  <caption className='fs-6'>Other Medical Information</caption>
  <tbody>
  {healthFacts.map((fact, index) => (
          <tr key={index}>
            <td>{fact.condition}</td>
            <td>{fact.propValue  === "" ? "NONE" : fact.propValue}</td>
          </tr>
        ))}
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

