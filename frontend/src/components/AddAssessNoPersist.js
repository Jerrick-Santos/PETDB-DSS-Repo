import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import axios from 'axios';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';


function AddAssessNoPersist(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [assessFormValues, setAssessFormValues] = useState({
        case_no:props.caseNo,
        cough: 0,
        c_weeks: 0,
        c_persist: 0,
        fever:0,
        fe_weeks:0,
        weight_loss:0,
        wl_weeks:0,
        night_sweats:0,
        ns_weeks:0,
        fatigue:0,
        fat_weeks:0,
        red_playfulness:0,
        rp_weeks:0,
        dec_acts:0,
        da_weeks:0,
        not_eating_well:0,
        new_weeks:0,
        gibbus_deform:0,
        non_painful_ecl:0,
        stiff_neck:0,
        drowsy:0,
        pleural_effusion:0,
        pericard_effusion:0,
        dist_abdomen:0,
        non_painful_ejoint:0,
        tuberculin_hyper:0,
        can_stand:0,
        ass_body_weight:null,
        ass_height:null,
        diabetes:0,
        plhiv:0,
        hiv:0,
        mother_hiv:0,
        smoking:0,
        drinking:0,
        sex_active:0,
        renal_disease:0,
        malnutrition:0,
        other_health_issues:'',
        other_meds:'',
        other_dd_interacts:'',
        other_comorbid:'',
        assessment_date: new Date().toISOString().split('T')[0],
        person_conducted: '',
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

        setAssessFormValues(prev=>({...prev, [name]: newValue}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newassessment", assessFormValues)
        }catch(err){
            console.log(err)
        }

        window.location.reload()
    }

  return (
        <>

            <button
                className="btn"
                style={{ color: "white", backgroundColor: '#0077B6'}}
                type="button"
                onClick={handleShow}
            >
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add an Assessment
            </button>


        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='xl'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Add an Assessment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-3 justify-content-center">
    <div>
    {/* Shows all medical information in relation to the patient's ongoing case*/}
      
      {/* Symptoms of the Patient */}
      <Row className="mt-5 justify-content-center">
  <Col lg="5">
    <p> <strong> Cardinal Symptoms</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="4">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>Symptomatic</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>2 weeks</Card.Text>
          </Col>

        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Cough</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='cough' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='c_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Fever</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='fever' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fe_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Night Sweats</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='night_sweats' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='ns_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Weight Loss</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='weight_loss' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='wl_weeks' onChange={handleChange}/>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>


  <Col lg="6">
    <p> <strong> Additional Symptoms if with TB Contact</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="4">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>Symptomatic</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>2 weeks</Card.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Fatigue</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='fatigue' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fat_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Reduced Playfulness</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='red_playfulness' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='rp_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Decreased Activities</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='dec_acts' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='da_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Not Eating Well</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" name='not_eating_well' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='new_weeks' onChange={handleChange}/>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
</Row>

<Row className="mt-2 justify-content-center">
<Col lg="8">
    <p> <strong> Additional Symptoms to Verify EPTB (Is the Patient Experiencing the Following:)</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="9">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text>Yes</Card.Text>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Gibbus Deformity?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='gibbus_deform' onChange={handleChange}/>
          </Col>
          
        </Row>
        <hr />
        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you experiencing non-painful enlargment of lymph nodes?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='non_painful_ecl' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you experiencing stiff neck?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='stiff_neck' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you experiencing drowsiness?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='drowsy' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you experiencing pleural effusion?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='pleural_effusion' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you experiencing pericardial effusion?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='pericard_effusion' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you experiencing a distended abdomen?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='dist_abdomen' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you experiencing a non-painful enlarged joint?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='non_painful_ejoint' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you showing signs of tuberculin hypersensitivity?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='tuberculin_hyper' onChange={handleChange}/>
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
            <Card.Text className="text-muted">Are you unable to stand?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='can_stand' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted"> Do you have Diabetes?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='diabetes' onChange={handleChange}/>
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
            <Card.Text className="text-muted">Body Weight</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='ass_body_weight' value={assessFormValues.ass_body_weight} onChange={handleChange} placeholder='in kilograms' />
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
                <input type="text" className="form-control" name='ass_height' value={assessFormValues.ass_height} onChange={handleChange} placeholder='in feet' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Other Health Issues</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='other_health_issues' value={assessFormValues.other_health_issues} onChange={handleChange} placeholder='Health Issues' />
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
                <input type="text" className="form-control" name='other_meds' value={assessFormValues.other_meds} onChange={handleChange} placeholder='Medications' />
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
                <input type="text" className="form-control" name='other_dd_interacts' value={assessFormValues.other_dd_interacts} onChange={handleChange} placeholder='Possible interactions' />
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
                <input type="text" className="form-control" name='other_comorbid' value={assessFormValues.other_comorbid} onChange={handleChange} placeholder='Co-morbidities' />
              </Card.Text>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  </Col>
</Row>
<Row className="mt-2 justify-content-center">
<Col lg="8">
    <p> <strong> Issuance</strong> </p>
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Person who conducted this assessment</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='person_conducted' value={assessFormValues.person_conducted} onChange={handleChange} placeholder='Full Name' />
              </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
</Col>
</Row>
</div>
</form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose}  className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AddAssessNoPersist;

