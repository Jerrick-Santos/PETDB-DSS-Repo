import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function AddAssessNoPersist(props) {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [bodyWeight, setBodyWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBMI] = useState(null);

    const [coughWeeksDisabled, setCoughWeeksDisabled] = useState(true);
    const [feverWeeksDisabled, setFeverWeeksDisabled] = useState(true);
    const [nsWeeksDisabled, setNSWeeksDisabled] = useState(true);
    const [wlWeeksDisabled, setWLWeeksDisabled] = useState(true);
    const [fatWeeksDisabled, setFatWeeksDisabled] = useState(true);
    const [rpWeeksDisabled, setRPWeeksDisabled] = useState(true);
    const [decWeeksDisabled, setDecWeeksDisabled] = useState(true);
    const [newWeeksDisabled, setNEWWeeksDisabled] = useState(true);

      useEffect(() => {

        const calculateBMI = () => {
          if (bodyWeight && height) {
            const heightInMeters = height / 100; // Convert height to meters
            const bmiValue = bodyWeight / (heightInMeters * heightInMeters);
            setBMI(bmiValue.toFixed(2)); // Round BMI to 2 decimal places
          } else {
            setBMI(null); // Reset BMI if any of the inputs are empty
          }
        };

        calculateBMI()
    }, [bodyWeight, height]);

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
        non_painful_ecl:0,
        drowsy:0,
        can_stand:0,
        ass_body_weight:null,
        ass_height:null,
        ass_bmi: null,
        ass_temp: null,
        ass_bp: null,
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
        prevPTB_diagnosed: 0,
        userNo: props.userNo
    });

    const [bodyweightError, setBodyWeightError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [bodyTempError, setTempError] = useState('');
    //const [bloodPressError, setBPError] = useState('');

    const validate = () => {
      let bodyweightError = '';
      if (!bodyWeight) {
        bodyweightError = 'Required field';
      }
      setBodyWeightError(bodyweightError);

      let heightError = '';
      if (!height) {
        heightError = 'Required field';
      }
      setHeightError(heightError);

      let bodyTempError = '';
      if (!assessFormValues.ass_temp) {
        bodyTempError = 'Required field';
      } else if (isNaN(assessFormValues.ass_temp)) {
        bodyTempError = 'Must be a valid number';
      }
      setTempError(bodyTempError);

      // let bloodPressError = '';
      // if (!assessFormValues.ass_bp) {
      //   bloodPressError = 'Required field';
      // }
      // setBPError(bloodPressError);

      if (bodyweightError || heightError || bodyTempError) {
        return false;
      }

      return true;
    }

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

        // Update the corresponding state based on the input field
        if (name === 'ass_body_weight') {
          setBodyWeight(newValue);
        } else if (name === 'ass_height') {
          setHeight(newValue);
        } else if (name === 'cough') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setCoughWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'fever') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setFeverWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'night_sweats') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setNSWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'weight_loss') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setWLWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'fatigue') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setFatWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'red_playfulness') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setRPWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'dec_acts') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setDecWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'not_eating_well') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setNEWWeeksDisabled(!checked);
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else {
          setAssessFormValues((prev) => ({ ...prev, [name]: newValue }));
        }

        
    }

    const resetValidation = () => {
      setBodyWeightError('');
      setHeightError('');
      setTempError('');
      //setBPError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        resetValidation();

        const isValid = validate();
        if(!isValid){
          return;
        }

        // Update assessFormValues with the latest weight, height, and BMI
        

        try{
          const updatedAssessFormValues = {
          ...assessFormValues,
          ass_body_weight: bodyWeight,
          ass_height: height,
          ass_bmi: bmi,
        };
            await axios.post("http://localhost:4000/api/newassessment", updatedAssessFormValues)
            window.location.reload()
        }catch(err){
            console.log(err)
        }

        
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
      <Form noValidate>
        {/* Assesser Details */}
        <Row className="mt-2 justify-content-center">
          {/* Assessed By */}
          <Form.Group as={Col} md="4" className='mb-3'>
            <Form.Label>Assessed By:</Form.Label>
            <Form.Control
              type="text" 
              name="assessment_date"
              value={props.firstName + " " +props.lastName}
              disabled
            />
          </Form.Group>
          {/* Assessment Date */}
          <Form.Group as={Col} md="4" className='mb-3'>
            <Form.Label as={Col}>Assessment Date:</Form.Label>  
            <Form.Control
              type="text"
              name="assessment_date"
              value={assessFormValues.assessment_date}
              disabled
            />
          </Form.Group>
        </Row>

        {/* Card for Vital Signs */}
        <Row className="mt-4 justify-content-center">
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
                {/* Body Weight */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Body Weight</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                      <Form.Control
                        type="text" 
                        name="ass_body_weight"
                        value={assessFormValues.ass_body_weight}
                        onChange={handleChange}
                        placeholder='in kilograms'
                        isInvalid={bodyweightError}
                      />
                      <Form.Control.Feedback type='invalid'>{bodyweightError}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <hr/>
                {/* Height */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Height</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                        <Form.Control
                          type="text" 
                          name="ass_height"
                          value={assessFormValues.ass_height}
                          onChange={handleChange}
                          placeholder='in centimeters'
                          isInvalid={heightError}
                        />
                        <Form.Control.Feedback type='invalid'>{heightError}</Form.Control.Feedback>
                      </Form.Group>
                  </Col>
                </Row>
                <hr />
                {/* BMI */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Body Mass Index</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                        <Form.Control
                          type="text" 
                          name="ass_bmi"
                          value={bmi}
                          onChange={handleChange}
                          readOnly
                        />
                      </Form.Group>
                  </Col>
                </Row>
                <hr />
                { /* Temperature */ }
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Body Temperature</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                        <Form.Control
                          type="text" 
                          name="ass_temp"
                          value={assessFormValues.ass_temp}
                          onChange={handleChange}
                          placeholder='in Celsius'
                          isInvalid={bodyTempError}
                        />
                        <Form.Control.Feedback type='invalid'>{bodyTempError}</Form.Control.Feedback>
                      </Form.Group>
                  </Col>
                </Row>
                <hr />
                { /* Blood Pressure */ }
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Blood Pressure</Form.Label>
                  </Col>
                  <Col sm="4">
                      <Form.Group as={Col} md="12">
                        <Form.Control
                          type="text" 
                          name="ass_bp"
                          value={assessFormValues.ass_bp}
                          onChange={handleChange}
                          placeholder='systolic/diastolic'
                          //isInvalid={bloodPressError}
                        />
                        {/* <Form.Control.Feedback type='invalid'>{bloodPressError}</Form.Control.Feedback> */}
                      </Form.Group>
                  </Col>
                </Row> 
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Card for Cardinal Symptoms*/}
        <Row className="mt-1 justify-content-center">
          <Col lg="8">
          <p> <strong>Cardinal Symptoms</strong> </p>
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
                <hr/>
                {/* Cough */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Cough</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='cough' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='c_weeks' onChange={handleChange} disabled={coughWeeksDisabled}/>
                  </Col>
                </Row>
                <hr/>
                {/* Fever */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Fever</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='fever' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='fe_weeks' onChange={handleChange} disabled={feverWeeksDisabled}/>
                  </Col>
                </Row>
                <hr/>
                {/* Night Sweats */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Night Sweats</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='night_sweats' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='ns_weeks' onChange={handleChange} disabled={nsWeeksDisabled}/>
                  </Col>
                </Row>
                <hr/>
                {/* Weight Loss */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Weight Loss</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='weight_loss' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='wl_weeks' onChange={handleChange} disabled={wlWeeksDisabled}/>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Symptoms if with TB Contact */}
        <Row className="mt-1 justify-content-center">
          <Col lg="8">
          <p> <strong>Additional Symptoms if with TB Contact</strong> </p>
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
                <hr/>
                {/* Fatigue */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Fatigue</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='fatigue' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='fat_weeks' onChange={handleChange} disabled={fatWeeksDisabled}/>
                  </Col>
                </Row>
                <hr/>
                {/* Reduced Playfulness */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Reduced Playfulness</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='red_playfulness' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='rp_weeks' onChange={handleChange} disabled={rpWeeksDisabled}/>
                  </Col>
                </Row>
                <hr/>
                {/* Decreased Activities */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Decreased Activities</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='dec_acts' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='da_weeks' onChange={handleChange} disabled={decWeeksDisabled}/>
                  </Col>
                </Row>
                <hr/>
                {/* Not Eating Well */}
                <Row>
                  <Col sm="6">
                    <Form.Label className="text-muted">Not Eating Well</Form.Label>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='not_eating_well' onChange={handleChange}/>
                  </Col>
                  <Col sm="3">
                    <input type="checkbox" name='new_weeks' onChange={handleChange} disabled={newWeeksDisabled}/>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Symptoms to Verify EPTB */}
        <Row className="mt-1 justify-content-center">
          <Col lg="8">
          <p> <strong>Additional Symptoms to Verify EPTB</strong> </p>
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
                {/* Lumps anywhere on the body */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Lumps anywhere on the body</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='non_painful_ecl' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Drowsiness */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Drowsiness</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='drowsy' onChange={handleChange}/>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Other Assessments */}
        <Row className="mt-1 justify-content-center">
          <Col lg="8">
          <p><strong>Other Assessments</strong> </p>
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
                {/* Was the patient previously diagnosed with TB? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Was the patient previously diagnosed with TB?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='prevPTB_diagnosed' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Are you unable to stand? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Are you unable to stand?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='can_stand' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Are you living with a person with HIV? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Are you living with a person with HIV?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='plhiv' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Do you have HIV? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Do you have HIV?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='hiv' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Does your mother have HIV? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Does your mother have HIV?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='mother_hiv' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Do you have a history of smoking? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Do you have a history of smoking?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='smoking' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Do you have a history of drinking? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Do you have a history of drinking?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='drinking' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Do you have a history of sexual activity? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Do you have a history of sexual activity?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='sex_active' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Do you have a history of renal disease? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Do you have a history of renal disease?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='renal_disease' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Do you have a history of malnutrition? */}
                <Row>
                  <Col sm="9">
                    <Form.Label className="text-muted">Do you have a history of malnutrition?</Form.Label>
                  </Col>
                  <Col sm="2">
                    <input type="checkbox" name='malnutrition' onChange={handleChange}/>
                  </Col>
                </Row>
                <hr />
                {/* Other Health Issues */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Other Health Issues</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                      <Form.Control
                        type="text" 
                        name="other_health_issues"
                        value={assessFormValues.other_health_issues}
                        onChange={handleChange}
                        placeholder='Health Issues'
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                {/* Other Medications */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Other Medications</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                      <Form.Control
                        type="text" 
                        name="other_meds"
                        value={assessFormValues.other_meds}
                        onChange={handleChange}
                        placeholder='Medications'
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                {/* Possible of drug to drug interactions */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Possible of drug to drug interactions</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                      <Form.Control
                        type="text" 
                        name="other_dd_interacts"
                        value={assessFormValues.other_dd_interacts}
                        onChange={handleChange}
                        placeholder='Possible interactions'
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                {/* Other Co-morbidities */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Other Co-morbidities</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                      <Form.Control
                        type="text" 
                        name="other_comorbid"
                        value={assessFormValues.other_comorbid}
                        onChange={handleChange}
                        placeholder='Co-morbidities'
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    {/*<form className="mt-3 justify-content-center">
    <div>

      


      <Row className="mt-2 justify-content-center">

    
          <Col sm="5">
          <label className="text-muted">Assessed By</label>
            <input
              type="text"
              className="form-control"
              name="assessment_date"
              value={props.firstName + " " +props.lastName}
              disabled
            />
          </Col>
          <Col sm="3">
          <label className="text-muted">Assessment Date</label>
            <input
              type="text"
              className="form-control"
              name="assessment_date"
              value={assessFormValues.assessment_date}
              disabled
            />
            </Col>
      </Row>

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
                <input type="text" className="form-control" name='ass_body_weight' value={assessFormValues.ass_body_weight} onChange={handleChange} placeholder='in kilograms' />
                {bodyweightError && (
                        <p style={{color: 'red'}}>{bodyweightError}</p>  
                )}
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
                <input type="text" className="form-control" name='ass_height' value={assessFormValues.ass_height} onChange={handleChange} placeholder='in centimeters' />
                {heightError && (
                        <p style={{color: 'red'}}>{heightError}</p>  
                )}
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
                <input type="text" className="form-control" name='ass_bmi' value={bmi} onChange={handleChange} placeholder='' readOnly/>
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
                <input type="text" className="form-control" name='ass_temp' value={assessFormValues.ass_temp} onChange={handleChange} placeholder='in Celsius' />
                {bodyTempError && (
                        <p style={{color: 'red'}}>{bodyTempError}</p>  
                )}
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
                <input type="text" className="form-control" name='ass_bp' value={assessFormValues.ass_bp} onChange={handleChange} placeholder='systolic/diastolic' />
                {bloodPressError && (
                        <p style={{color: 'red'}}>{bloodPressError}</p>  
                )}
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
            <input type="checkbox" name='cough' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='c_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Fever</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fever' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fe_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Night Sweats</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='night_sweats' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='ns_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Weight Loss</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='weight_loss' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='wl_weeks' onChange={handleChange}/>
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
            <input type="checkbox" name='fatigue' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='fat_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Reduced Playfulness</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='red_playfulness' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='rp_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Decreased Activities</Card.Text>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='dec_acts' onChange={handleChange}/>
          </Col>
          <Col sm="3">
            <input type="checkbox" name='da_weeks' onChange={handleChange}/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Card.Text className="text-muted">Not Eating Well</Card.Text>
          </Col>
          <Col sm="3">
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



</div>
</form>*/}
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

