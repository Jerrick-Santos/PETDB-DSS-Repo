import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'
import Form from 'react-bootstrap/Form';

function UpdateAssessmentNoPersist(props) {

    const assessmentDate = new Date(props.assessment_date);
    const year = assessmentDate.getFullYear();
    const month = assessmentDate.getMonth() + 1; // Adding 1 to account for zero-based months
    const day = assessmentDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [bodyWeight, setBodyWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBMI] = useState(null);

    const [coughWeeksDisabled, setCoughWeeksDisabled] = useState(false);
    const [feverWeeksDisabled, setFeverWeeksDisabled] = useState(false);
    const [nsWeeksDisabled, setNSWeeksDisabled] = useState(false);
    const [wlWeeksDisabled, setWLWeeksDisabled] = useState(false);
    const [fatWeeksDisabled, setFatWeeksDisabled] = useState(false);
    const [rpWeeksDisabled, setRPWeeksDisabled] = useState(false);
    const [decWeeksDisabled, setDecWeeksDisabled] = useState(false);
    const [newWeeksDisabled, setNEWWeeksDisabled] = useState(false);

    const calculateBMI = () => {
      if (bodyWeight && height) {
        const heightInMeters = height / 100; // Convert height to meters
        const bmiValue = bodyWeight / (heightInMeters * heightInMeters);
        setBMI(bmiValue.toFixed(2)); // Round BMI to 2 decimal places
      } else {
        setBMI(null); // Reset BMI if any of the inputs are empty
      }
    };

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

  useEffect(() => {

    calculateBMI();
  
  }, [bodyWeight, height]); 

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

    const [bodyweightError, setBodyWeightError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [bodyTempError, setTempError] = useState('');
    const [bloodPressError, setBPError] = useState('');

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
      if (!formValues.ass_temp) {
        bodyTempError = 'Required field';
      } else if (isNaN(formValues.ass_temp)) {
        bodyTempError = 'Must be a valid number';
      }
      setTempError(bodyTempError);

      // let bloodPressError = '';
      // if (!formValues.ass_bp) {
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
          setFormValues({
            ...formValues,
            ass_body_weight: newValue  
          });
        } else if (name === 'ass_height') {
          setHeight(newValue);
          setFormValues({
            ...formValues,
            ass_height: newValue  
          });
        } else if (name === 'cough') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setCoughWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'fever') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setFeverWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'night_sweats') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setNSWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'weight_loss') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setWLWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'fatigue') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setFatWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'red_playfulness') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setRPWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'dec_acts') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setDecWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else if (name === 'not_eating_well') {
          // Enable or disable 'c_weeks' and 'c_persist' based on the 'cough' checkbox
          setNEWWeeksDisabled(!checked);
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        } else {
          setFormValues((prev) => ({ ...prev, [name]: newValue }));
        }

        if (name === 'ass_body_weight' || name === 'ass_height') {
          calculateBMI();
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

        try{
            const updatedAssessFormValues = {
              ...formValues,
              ass_body_weight: bodyWeight,
              ass_height: height,
              ass_bmi: bmi,
            };
            await axios.post("http://localhost:4000/api/updateassessnopersist", updatedAssessFormValues)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
        
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
                value={formValues.assessment_date}
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
                          value={formValues.ass_body_weight}
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
                            value={formValues.ass_height}
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
                            value={formValues.ass_temp}
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
                            value={formValues.ass_bp}
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
                      <input type="checkbox" name='cough' value={formValues.cough} onChange={handleChange} checked={formValues.cough ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='c_weeks' value={formValues.c_weeks} onChange={handleChange} disabled={coughWeeksDisabled} checked={formValues.c_weeks ? true : false}/>
                    </Col>
                  </Row>
                  <hr/>
                  {/* Fever */}
                  <Row>
                    <Col sm="6">
                      <Form.Label className="text-muted">Fever</Form.Label>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='fever' value={formValues.fever} onChange={handleChange} checked={formValues.fever ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='fe_weeks' value={formValues.fe_weeks} onChange={handleChange} disabled={feverWeeksDisabled} checked={formValues.fe_weeks ? true : false}/>
                    </Col>
                  </Row>
                  <hr/>
                  {/* Night Sweats */}
                  <Row>
                    <Col sm="6">
                      <Form.Label className="text-muted">Night Sweats</Form.Label>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='night_sweats' value={formValues.night_sweats} onChange={handleChange} checked={formValues.night_sweats ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='ns_weeks' value={formValues.ns_weeks} onChange={handleChange} disabled={nsWeeksDisabled} checked={formValues.ns_weeks ? true : false}/>
                    </Col>
                  </Row>
                  <hr/>
                  {/* Weight Loss */}
                  <Row>
                    <Col sm="6">
                      <Form.Label className="text-muted">Weight Loss</Form.Label>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='weight_loss' value={formValues.weight_loss} onChange={handleChange} checked={formValues.weight_loss ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='wl_weeks' value={formValues.wl_weeks} onChange={handleChange} disabled={wlWeeksDisabled} checked={formValues.wl_weeks ? true : false}/>
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
                      <input type="checkbox" name='fatigue' value={formValues.fatigue} onChange={handleChange} checked={formValues.fatigue ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='fat_weeks' value={formValues.fat_weeks} onChange={handleChange} disabled={fatWeeksDisabled} checked={formValues.fat_weeks ? true : false}/>
                    </Col>
                  </Row>
                  <hr/>
                  {/* Reduced Playfulness */}
                  <Row>
                    <Col sm="6">
                      <Form.Label className="text-muted">Reduced Playfulness</Form.Label>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='red_playfulness' value={formValues.red_playfulness} onChange={handleChange} checked={formValues.red_playfulness ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='rp_weeks' value={formValues.rp_weeks} onChange={handleChange} disabled={rpWeeksDisabled} checked={formValues.rp_weeks ? true : false}/>
                    </Col>
                  </Row>
                  <hr/>
                  {/* Decreased Activities */}
                  <Row>
                    <Col sm="6">
                      <Form.Label className="text-muted">Decreased Activities</Form.Label>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='dec_acts' value={formValues.dec_acts} onChange={handleChange} checked={formValues.dec_acts ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='da_weeks' value={formValues.da_weeks} onChange={handleChange} disabled={decWeeksDisabled} checked={formValues.da_weeks ? true : false}/>
                    </Col>
                  </Row>
                  <hr/>
                  {/* Not Eating Well */}
                  <Row>
                    <Col sm="6">
                      <Form.Label className="text-muted">Not Eating Well</Form.Label>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='not_eating_well' value={formValues.not_eating_well} onChange={handleChange} checked={formValues.not_eating_well ? true : false}/>
                    </Col>
                    <Col sm="3">
                      <input type="checkbox" name='new_weeks' value={formValues.new_weeks} onChange={handleChange} disabled={newWeeksDisabled} checked={formValues.new_weeks ? true : false}/>
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
                      <input type="checkbox" name='non_painful_ecl' value={formValues.non_painful_ecl} onChange={handleChange} checked={formValues.non_painful_ecl ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Drowsiness */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Drowsiness</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='drowsy' value={formValues.drowsy} onChange={handleChange} checked={formValues.drowsy ? true : false}/>
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
                      <input type="checkbox" name='prevPTB_diagnosed' value={formValues.prevPTB_diagnosed} onChange={handleChange} checked={formValues.prevPTB_diagnosed ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Are you unable to stand? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Are you unable to stand?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='can_stand' value={formValues.can_stand} onChange={handleChange} checked={formValues.can_stand ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Are you living with a person with HIV? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Are you living with a person with HIV?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='plhiv' value={formValues.plhiv} onChange={handleChange} checked={formValues.plhiv ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Do you have HIV? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Do you have HIV?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='hiv' value={formValues.hiv} onChange={handleChange} checked={formValues.hiv ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Does your mother have HIV? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Does your mother have HIV?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='mother_hiv' value={formValues.mother_hiv} onChange={handleChange} checked={formValues.mother_hiv ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Do you have a history of smoking? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Do you have a history of smoking?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='smoking' value={formValues.smoking} onChange={handleChange} checked={formValues.smoking ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Do you have a history of drinking? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Do you have a history of drinking?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='drinking' value={formValues.drinking} onChange={handleChange} checked={formValues.drinking ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Do you have a history of sexual activity? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Do you have a history of sexual activity?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='sex_active' value={formValues.sex_active} onChange={handleChange} checked={formValues.sex_active ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Do you have a history of renal disease? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Do you have a history of renal disease?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='renal_disease' value={formValues.renal_disease} onChange={handleChange} checked={formValues.renal_disease ? true : false}/>
                    </Col>
                  </Row>
                  <hr />
                  {/* Do you have a history of malnutrition? */}
                  <Row>
                    <Col sm="9">
                      <Form.Label className="text-muted">Do you have a history of malnutrition?</Form.Label>
                    </Col>
                    <Col sm="2">
                      <input type="checkbox" name='malnutrition' value={formValues.malnutrition} onChange={handleChange} checked={formValues.malnutrition ? true : false}/>
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
                          value={formValues.other_health_issues}
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
                          value={formValues.other_meds}
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
                          value={formValues.other_dd_interacts}
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
                          value={formValues.other_comorbid}
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
                <input type="text" className="form-control" name='ass_height' value={formValues.ass_height} onChange={handleChange} placeholder='in centimeters' />
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
                <input type="text" className="form-control" name='ass_bmi' value={bmi}  onChange={handleChange} readOnly />
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
                <input type="text" className="form-control" name='ass_bp' value={formValues.ass_bp} onChange={handleChange} placeholder='systolic/diastolic' />
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

          

            
                </form>*/}
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

