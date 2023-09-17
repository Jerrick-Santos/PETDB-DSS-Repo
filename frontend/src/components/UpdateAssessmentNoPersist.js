import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'


function UpdateAssessmentNoPersist(props) {

    const assessmentDate = new Date(props.assessment_date);
    const year = assessmentDate.getFullYear();
    const month = assessmentDate.getMonth() + 1; // Adding 1 to account for zero-based months
    const day = assessmentDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isReferenced, setIsReferenced] = useState(false);
    const [reference, setReference] = useState(null);

    useEffect(() => {
      axios.get(`http://localhost:4000/api/checkassessref/${props.AssessNo}`)
          .then((response) => {
              setReference(response.data[0]);

              try {
                  if (response.data[0].total_references > 0) {
                      setIsReferenced(true);
                  } else {
                      setIsReferenced(false);
                  }
              } catch (error) {
                  // Handle any errors that occur during processing
                  console.error('Error processing data:', error);
              }
          })
          .catch((error) => {
              // Handle any errors that occurred during the request
              console.error('Error fetching data:', error);
          });
  }, [props.AssessNo]); // Adding props.DGResultsNo as dependency

    const [formValues, setFormValues] = useState({
      AssessNo: props.AssessNo,
      ass_bmi: props.ass_bmi,
      ass_temp: props.ass_temp,
      ass_bp: props.ass_bp,
      cough: props.cough,
      c_weeks: props.c_weeks,
      fever: props.fever,
      fe_weeks: props.fe_weeks,
      weight_loss: props.weight_loss,
      wl_weeks: props.wl_weeks,
      night_sweats: props.night_sweats,
      ns_weeks: props.ns_weeks,
      fatigue: props.fatigue,
      fat_weeks: props.fat_weeks,
      red_playfulness: props.red_playfulness,
      rp_weeks: props.rp_weeks,
      dec_acts: props.dec_acts,
      da_weeks: props.da_weeks,
      not_eating_well: props.not_eating_well,
      new_weeks: props.new_weeks,
      non_painful_ecl: props.non_painful_ecl,
      drowsy: props.drowsy,
      can_stand: props.can_stand,
      ass_body_weight: props.ass_body_weight,
      ass_height: props.ass_height,
      plhiv: props.plhiv,
      hiv: props.hiv,
      mother_hiv: props.mother_hiv,
      smoking: props.smoking,
      drinking: props.drinking,
      sex_active: props.sex_active,
      renal_disease: props.renal_disease,
      malnutrition: props.malnutrition,
      other_health_issues: props.other_health_issues,
      other_meds: props.other_meds,
      other_dd_interacts: props.other_dd_interacts,
      other_comorbid: props.other_comorbid,
      assessment_date: formattedDate,
      prevPTB_diagnosed: props.prevPTB_diagnosed,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
        setFormValues(prev=>({...prev, [name]: newValue}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/updateassessnopersist", formValues)
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
    {isReferenced ? (
        <>
        This test is currently being referenced in other records.   <br/>  <br/>
        </>             
    ) : (
        <>
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
                <input type="text" className="form-control" name='ass_body_weight' value={formValues.ass_body_weight} onChange={handleChange} placeholder='in kilograms' />
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
                <input type="text" className="form-control" name='ass_height' value={formValues.ass_height} onChange={handleChange} placeholder='in centimeters' />
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
                <input type="text" className="form-control" name='ass_bmi' value={formValues.ass_bmi}  onChange={handleChange} readOnly />
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
                <input type="text" className="form-control" name='ass_temp' value={formValues.ass_temp} onChange={handleChange} placeholder='in Celsius' />
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
                <input type="text" className="form-control" name='ass_bp' value={formValues.ass_bp} onChange={handleChange} placeholder='systolic/diastolic' />
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
          <Col sm="6">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>Symptomatic</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>2 weeks</Card.Text>
          </Col>

        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Cough</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='cough' value={formValues.cough} onChange={handleChange} checked={formValues.cough ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='c_weeks' value={formValues.c_weeks} onChange={handleChange} checked={formValues.c_weeks ? true : false}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Fever</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fever' value={formValues.fever} onChange={handleChange} checked={formValues.fever ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fe_weeks' value={formValues.fe_weeks} onChange={handleChange} checked={formValues.fe_weeks ? true : false}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Night Sweats</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='night_sweats' value={formValues.night_sweats} onChange={handleChange} checked={formValues.night_sweats ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='ns_weeks' value={formValues.ns_weeks} onChange={handleChange} checked={formValues.ns_weeks ? true : false}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Weight Loss</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='weight_loss' value={formValues.weight_loss} onChange={handleChange} checked={formValues.weight_loss ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='wl_weeks' value={formValues.wl_weeks} onChange={handleChange} checked={formValues.wl_weeks ? true : false}/>
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
          <Col sm="6">
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>Symptomatic</Card.Text>
          </Col>
          <Col sm="3">
            <Card.Text>2 weeks</Card.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Fatigue</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fatigue' value={formValues.fatigue} onChange={handleChange} checked={formValues.fatigue ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fat_weeks' value={formValues.fat_weeks} onChange={handleChange} checked={formValues.fat_weeks ? true : false}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Reduced Playfulness</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='red_playfulness' value={formValues.red_playfulness} onChange={handleChange} checked={formValues.red_playfulness ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='rp_weeks' value={formValues.rp_weeks} onChange={handleChange} checked={formValues.rp_weeks ? true : false}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Decreased Activities</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='dec_acts' value={formValues.dec_acts} onChange={handleChange} checked={formValues.dec_acts ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='da_weeks' value={formValues.da_weeks} onChange={handleChange} checked={formValues.da_weeks ? true : false}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Not Eating Well</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='not_eating_well' value={formValues.not_eating_well} onChange={handleChange} checked={formValues.not_eating_well ? true : false}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='new_weeks' value={formValues.new_weeks} onChange={handleChange} checked={formValues.new_weeks ? true : false}/>
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
            <input type="checkbox" name='non_painful_ecl' value={formValues.non_painful_ecl} onChange={handleChange} checked={formValues.non_painful_ecl ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Drowsiness</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='drowsy' value={formValues.drowsy} onChange={handleChange} checked={formValues.drowsy ? true : false}/>
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
            <input type="checkbox" name='prevPTB_diagnosed' value={formValues.prevPTB_diagnosed} onChange={handleChange} checked={formValues.prevPTB_diagnosed ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you unable to stand?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='can_stand' value={formValues.can_stand} onChange={handleChange} checked={formValues.can_stand ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Are you living with a person with HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='plhiv' value={formValues.plhiv} onChange={handleChange} checked={formValues.plhiv ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='hiv' value={formValues.hiv} onChange={handleChange} checked={formValues.hiv ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Does your mother have HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='mother_hiv' value={formValues.mother_hiv} onChange={handleChange} checked={formValues.mother_hiv ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of smoking?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='smoking' value={formValues.smoking} onChange={handleChange} checked={formValues.smoking ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of drinking?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='drinking' value={formValues.drinking} onChange={handleChange} checked={formValues.drinking ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of sexual activity?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='sex_active' value={formValues.sex_active} onChange={handleChange} checked={formValues.sex_active ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of renal disease?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='renal_disease' value={formValues.renal_disease} onChange={handleChange} checked={formValues.renal_disease ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="9">
            <Card.Text className="text-muted">Do you have a history of malnutrition?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" name='malnutrition' value={formValues.malnutrition} onChange={handleChange} checked={formValues.malnutrition ? true : false}/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Other Health Issues</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control" name='other_health_issues' value={formValues.other_health_issues} onChange={handleChange} placeholder='Health Issues' />
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
                <input type="text" className="form-control" name='other_meds' value={formValues.other_meds} onChange={handleChange} placeholder='Medications' />
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
                <input type="text" className="form-control" name='other_dd_interacts' value={formValues.other_dd_interacts} onChange={handleChange} placeholder='Possible interactions' />
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
                <input type="text" className="form-control" name='other_comorbid' value={formValues.other_comorbid} onChange={handleChange} placeholder='Co-morbidities' />
              </Card.Text>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  </Col>
</Row>

          

            
            </form>
            </>
        )}
    </Modal.Body>
    <Modal.Footer >
    {isReferenced ? (
        <>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
        </>             
    ) : (
        <>
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Update</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
        </>
    )}
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default UpdateAssessmentNoPersist;

