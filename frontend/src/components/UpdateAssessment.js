import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'


function UpdateAssessment(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({
        HIName: props.HIName,
        HIOperatingHours:props.HIOperatingHours,
        HIContactNumber:props.HIContactNumber,
        HIEmailAddress:props.HIEmailAddress,
        HIUnitNo:'',
        HIStreet:'',
        HIBarangay:'',
        HICity:'',
        HIRegion:'',
        HIZipCode:'',
        XCoord:props.XCoord,
        YCoord:props.YCoord,
        HIContactPerson: props.HIContactPerson,
        isActive: 1
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newhi", formValues)
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

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='xl'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Update Assessment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
    <Row className="mt-5 justify-content-center">
<Col lg="8">
    <p> <strong> Vital Signs</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="9">
            <Card.Text>Assessment</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text></Card.Text>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Body Weight</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='ass_body_weight' value={props.ass_body_weight} onChange={handleChange} placeholder='in kilograms' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Height</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='ass_height' value={props.ass_height} onChange={handleChange} placeholder='in centimeters' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Body Mass Index</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='ass_bmi'  onChange={handleChange} readOnly />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Body Temperature</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='ass_temp' value={props.ass_temp} onChange={handleChange} placeholder='in Celsius' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Blood Pressure</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='ass_bp' value={props.ass_bp} onChange={handleChange} placeholder='systolic/diastolic' />
              </Card.Text>
          </Col>
        </Row>
       
      </Card.Body>
    </Card>
  </Col>
</Row>
           
<Row className="mt-1 justify-content-center">
  <Col lg="8">
    <p> <strong> Cardinal Symptoms</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="3">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>Symptomatic</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>2 weeks</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>Persistence</Card.Text>
          </Col>

        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Cough</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='cough' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='c_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='c_persist' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Fever</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fever' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fe_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fe_persist' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Night Sweats</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='night_sweats' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='ns_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='ns_persist' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Weight Loss</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='weight_loss' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='wl_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='wl_persist' onChange={handleChange}/>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
</Row>

<Row className="mt-1 justify-content-center">
  <Col lg="8">
    <p> <strong> Additional Symptoms if with TB Contact</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="3">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>Symptomatic</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>2 weeks</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>Persistence</Card.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Fatigue</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fatigue' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fat_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fat_persist' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Reduced Playfulness</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='red_playfulness' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='rp_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='rp_persist' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Decreased Activities</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='dec_acts' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='da_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='da_persist' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="3">
            <Card.Text className="text-muted">Not Eating Well</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='not_eating_well' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='new_weeks' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='new_persist' onChange={handleChange}/>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
</Row>

<Row className="mt-1 justify-content-center">
<Col lg="8">
    <p> <strong> Additional Symptoms to Verify EPTB </strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="9">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text>Symptomatic</Card.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Lumps anywhere on the body</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='non_painful_ecl' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Drowsiness</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='drowsy' onChange={handleChange}/>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  </Col>
</Row>

<Row className="mt-2 justify-content-center">
<Col lg="8">
    <p> <strong> Other Assessments</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="9">
            <Card.Text>Assessment</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text>Yes</Card.Text>
          </Col>
        </Row>
        <hr/>

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Was the patient previously diagnosed with TB?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='prevPTB_diagnosed' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you unable to stand?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='can_stand' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you living with a person with HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='plhiv' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='hiv' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Does your mother have HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='mother_hiv' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of smoking?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='smoking' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of drinking?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='drinking' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of sexual activity?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='sex_active' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of renal disease?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='renal_disease' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of malnutrition?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='malnutrition' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Other Health Issues</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='other_health_issues' value={props.other_health_issues} onChange={handleChange} placeholder='Health Issues' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Other Medications</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='other_meds' value={props.other_meds} onChange={handleChange} placeholder='Medications' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Possible of drug to drug interactions</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='other_dd_interacts' value={props.other_dd_interacts} onChange={handleChange} placeholder='Possible interactions' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Other Co-morbidities</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='other_comorbid' value={props.other_comorbid} onChange={handleChange} placeholder='Co-morbidities' />
              </Card.Text>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  </Col>
</Row>

          

            
            </form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Update</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default UpdateAssessment;

