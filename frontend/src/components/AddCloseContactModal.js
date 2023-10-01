import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import axios from 'axios';
import { Row, Col  } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ViewSimilarPatientModal from '../components/ViewSimilarPatientModal'

function AddCloseContactModal(props) {
   
    function clearForms() {
        const defaultValues = {
            last_name: '',
            first_name: '',
            middle_initial: '',
            birthdate: null,
            sex: '',
            contact_person: '',
            contact_num: '',
            contact_email: '',
            contact_relationship: '',
            CaseNo: props.id,
            PatientNo: null,
            DRNo: null,
            TSNo: null
        }
        setFormValues(defaultValues)
        setSelectedPatientIndex(null)
        setDisableForms(false)
        setSimilarPatients([])
        setErrors({})
        setShowSimilar(false)
    }
    
    const [validated, setValidated] = useState(false); // Form Validation
    const [show,setShow] = useState(false) // Modal for Close Contact Addition
    const [showSimilar, setShowSimilar] = useState(false) // Modal for View Similar Patient
    const [errors, setErrors] = useState({}); // Stores Form Erros
    const [similarPatients, setSimilarPatients] = useState([]) // Store list of Similar Patient
    const [selectedPatientIndex, setSelectedPatientIndex] = useState(null); // Store index for Similar Patient Array Access

    const [disableForms, setDisableForms] = useState(false)
   
    const [diagResult, setDiagResult] = useState([]) // Store list of Diagnostic Result from the reference table
    const [treatmentStatus, setTreatmentStatus] = useState([]) // Store list of Treatment Status from the reference table
    const [displayDiagTreatment, setDisplayDiagTreatment] = useState(false) // Enable dropdown buttons for diagnostic result and treatment status

    // Modal Show and Close
    const handleClose = () => {
        setShow(false)
        clearForms()
    }
    const handleShow = () => setShow(true);

    // Form Values
    const [formValues, setFormValues] = useState({
        last_name: '',
        first_name: '',
        middle_initial: '',
        birthdate: null,
        sex: '',
        contact_person: '',
        contact_num: '',
        contact_email: '',
        contact_relationship: '',
        CaseNo: props.id,
        PatientNo: null,
        DRNo: null,
        TSNo: null
    });

    // Fetch function for similar patient by name
    const fetchData = async () => {
        try {
          const patientResult = await axios.get(`http://localhost:4000/api/getSimilarPatients/${formValues.first_name}/${formValues.middle_initial}/${formValues.last_name}`);
          const contactsResult = await axios.get(`http://localhost:4000/api/getSimilarContacts/${formValues.first_name}/${formValues.middle_initial}/${formValues.last_name}`);

          console.log(patientResult.data, contactsResult.data)

          const combinedData = [...patientResult.data, ...contactsResult.data];
          return {
            combinedData: combinedData
          } 
        } catch (error) {
          console.error('Error fetching data:', error);
          return { patientData: [], contactsData: [] };
        }
    };

    const handleEnableDropdown = () => {
        setDisplayDiagTreatment(!displayDiagTreatment);
        setFormValues((prevData) => ({ // reset DRNo and TSNo to null in case of user misinput
          ...prevData,
          DRNo: null,
          TSNo: null,
        }));
      };

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setFormValues(prev=>({...prev, [name]: value}));
        validateForm()
    }

    useEffect(() => {
        if (formValues.first_name && formValues.last_name && formValues.middle_initial) {
            console.log("Similarity Check Condition Triggered");
            fetchData().then(({ combinedData }) => {
              setSimilarPatients(combinedData);
              setShowSimilar(combinedData.length > 0);
            });
        }
    }, [formValues.first_name, formValues.last_name, formValues.middle_initial])

    const validateForm = () => {
        const { first_name, last_name, middle_initial, birthdate, sex, contact_relationship, contact_num} = formValues
        const newErrors = {}

        console.log(birthdate, new Date())

        // VALID CHECKERS
        if (!first_name) newErrors.first_name = "Input cannot be empty"
        if (!last_name) newErrors.last_name = "Input cannot be empty"
        if (!middle_initial) newErrors.middle_initial = "Input cannot be empty"
        if (!birthdate) newErrors.birthdate = "Please select a date"
        if (sex === "") newErrors.sex = "Please select an option"
        if (!contact_relationship) newErrors.contact_relationship = "Input cannot be empty"
        if (contact_num.length !== 11 && contact_num.length > 0) newErrors.contact_num = "Contact No. must be 11 digits"

        setErrors(newErrors)

        return newErrors
    }

    useEffect(() => {
        if (selectedPatientIndex !== null) {

            const index = parseInt(selectedPatientIndex, 10)
            const selectedPatient = similarPatients[index];

            console.log("SELECTED PATIENT FROM INDEX: ", selectedPatient)

            let contact_name, contact_number, contact_emailadd

            selectedPatient.emergency_name ? contact_name = selectedPatient.emergency_name : contact_name = selectedPatient.contact_person
            selectedPatient.e_contactno ? contact_number = selectedPatient.e_contactno : contact_number = selectedPatient.contact_num
            selectedPatient.e_email ? contact_emailadd = selectedPatient.e_email : contact_emailadd = selectedPatient.contact_email

            setFormValues(prevData => ({
                ...prevData,
                last_name: selectedPatient.last_name,
                first_name: selectedPatient.first_name,
                middle_initial: selectedPatient.middle_initial,
                birthdate: new Date(selectedPatient.birthdate).toISOString(),
                sex: selectedPatient.sex,
                contact_person: contact_name,
                contact_num: contact_number,
                contact_email: contact_emailadd,
                CaseNo: props.id,
                PatientNo: selectedPatient.PatientNo,
                DRNo: selectedPatient.DRNo,
                TSNo: selectedPatient.TSNo
            }));

            setDisableForms(true)

            console.log("UPDATED FORM VALUES FROM SIMILARITY: ", formValues)
        }
    }, [selectedPatientIndex, similarPatients]);

    const handleSubmit = async (e) => {

        e.preventDefault()
        // VALIDITY CHECKER
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0){
            setErrors(formErrors)
            console.log("Errors Present in Form", formErrors)
        } else {
            // TRY-CATCH FOR BACKEND INTERACTION
            try{
                console.log('REACHED SUBMISSION...') //testing
                if (props.update) {
                    console.log('REACHED SUBMISSION...updating') //testing
                    console.log("Forms Updated: ", formValues)
                    await axios.post("http://localhost:4000/api/updateContacts", formValues)
                }
                else {
                    console.log('REACHED SUBMISSION...posting') //testing
                    console.log("Form Submitted: ", formValues)
                    await axios.post("http://localhost:4000/api/addContacts", formValues)
                }

                setValidated(true)
                setShow(false)
                window.location.reload(false)

                
            }catch(err){
                console.log(err)
            }
            
        }
        
    }

    // Load reference information for dropdown selection
    useEffect(() => {
        const fetchData = async () => {
            try {
                const diag_result = await axios.get('http://localhost:4000/api/getDiagnosisResults')
                setDiagResult(diag_result.data)

                const treatment_result = await axios.get('http://localhost:4000/api/getTreatmentStatus')
                setTreatmentStatus(treatment_result.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    },[])
    
    // TESTING ---------------------------------------------------------------- //
    useEffect(() => {
        console.log(diagResult)
        console.log(treatmentStatus)
    }, [diagResult, treatmentStatus])

    useEffect(() => {
        console.log(formValues)
    }, [formValues])

    const handleClear = () => {
        clearForms()
    } 

    useEffect(() => {
        console.log('props.contact: ', props.contact)
        if (props.update && props.contact) {
            setFormValues(prevData => ({
                ...prevData,
                last_name: props.contact.last_name,
                first_name: props.contact.first_name,
                middle_initial: props.contact.middle_initial,
                birthdate: new Date(props.contact.birthdate).toISOString(),
                sex: props.contact.sex,
                contact_person: props.contact.contact_person,
                contact_num: props.contact.contact_num,
                contact_email: props.contact.contact_email,
                contact_relationship: props.contact.contact_relationship,
                DRNo: props.contact.DRNo,
                TSNo: props.contact.TSNo,
                ContactNo: props.contact.ContactNo
            }));
        }
        
    }, [props.update, props.contact])


  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow} disabled={!props.show}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> {props.update ? '' : 'Add a Close Contact'}
            </button>

    <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg">
        <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
            <Modal.Title>{props.update ? 'Update Close Contact Record' : 'Add a Close Contact'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
        {/** NEW FORM FOR VALIDATION */}
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3 justify-content-center">

            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md="4" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type='text' 
                        placeholder='First Name'
                        name='first_name'
                        onChange={handleChange}
                        value={formValues.first_name}
                        isInvalid={!!errors.first_name}
                        disabled={disableForms}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.first_name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="middle_initial">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Middle Name'
                        name='middle_initial'
                        onChange={handleChange}
                        value={formValues.middle_initial}
                        isInvalid={!!errors.middle_initial}
                        disabled={disableForms} 
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.middle_initial}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Last Name'
                        name='last_name'
                        onChange={handleChange}
                        value={formValues.last_name}
                        isInvalid={!!errors.last_name}
                        disabled={disableForms} 
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.last_name}</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md="4" controlId="birthdate">
                    <Form.Label>Birthdate</Form.Label>
                        <Form.Control
                            required
                            type='date'
                            placeholder='Birthdate'
                            name='birthdate'
                            onChange={handleChange}
                            value={formValues.birthdate ? new Date(formValues.birthdate).toISOString().split('T')[0] : ''}
                            isInvalid={!!errors.birthdate}
                            disabled={disableForms}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.birthdate}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="sex">
                    <Form.Label>Sex</Form.Label>
                    <Form.Select aria-label="Sex" onChange={handleChange} name='sex' isInvalid={!!errors.sex} value={formValues.sex} disabled={disableForms}>
                        <option value="">Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.sex}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="contact_relationship">
                    <Form.Label>Relationship to Patient</Form.Label>
                    <Form.Control
                        // required
                        type='text'
                        placeholder='Relationship to Patient'
                        name='contact_relationship'
                        onChange={handleChange}
                        isInvalid={!!errors.contact_relationship}
                        value={formValues.contact_relationship}
                        
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.contact_relationship}</Form.Control.Feedback>
                </Form.Group>

                

            </Row>

            <Row>
                {/** MODAL FOR VIEWING SIMILAR PATIENTS */}
                <ViewSimilarPatientModal visible={showSimilar} patients={similarPatients} setSelectedPatientIndex={setSelectedPatientIndex}/>
            </Row>

            <Row className="mt-5 mb-3 justify-content-center">
                <Form.Group as={Col} md="15" controlId="contact_person">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Contact Name: Leave blank if contact has their own contact details'
                        name='contact_person'
                        value={formValues.contact_person}
                        onChange={handleChange}
                        disabled={disableForms} 
                    />
                </Form.Group>

                
            </Row>

            <Row className="mt-5 mb-3 justify-content-center">
                <Form.Group as={Col} md="6" controlId="contact_num">
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='e.g. 09xx-xxx-xxxx'
                        name='contact_num'
                        value={formValues.contact_num}
                        onChange={handleChange}
                        isInvalid={!!errors.contact_num}
                        disabled={disableForms}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.contact_num}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="contact_email">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='sample@email.com'
                        name='contact_email'
                        value={formValues.contact_email}
                        onChange={handleChange} 
                        disabled={disableForms}
                    />
                </Form.Group>
            </Row>

            {/** TO CONSIDER CLOSE CONTACTS THAT ALREADY HAVE AN ACTIVE CASE */}
            <Row className="mt-5 mb-3 justify-content-center">

                <Col>
                    <strong> Does the close contact have a history with TB or is currently in an active TB case?</strong>
                </Col>
                <Col>
                    <Form.Check type='checkbox' name='showTBHistory' onChange={handleEnableDropdown} disabled={disableForms} checked={!disableForms} />
                </Col>
            </Row>

            <Row>
                <Form.Group as={Col} md="6" controlId="sex">
                    <Form.Label>TB Diagnostic Result</Form.Label>
                    <Form.Select aria-label="Diagnostic Result" onChange={handleChange} name='DRNo' value={formValues.DRNo ? formValues.DRNo : ''} disabled={!displayDiagTreatment}>
                        <option>Select</option>
                        {diagResult.length > 0 && diagResult && (
                            diagResult.map((diag, index) => { return (
                                <option key={index} value={diag.DRNo}>{diag.DRDescription}</option>
                            )})
                        )}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="sex">
                    <Form.Label>TB Treatment Status</Form.Label>
                    <Form.Select aria-label="Treatment Status" onChange={handleChange} name='TSNo' value={formValues.TSNo ? formValues.TSNo : ''} disabled={!displayDiagTreatment}>
                        <option>Select</option>
                        {treatmentStatus.length > 0 && treatmentStatus && (
                            treatmentStatus.map((treat, index) => { return (
                                <option key={index} value={treat.TSNo}>{treat.TSDescription}</option>
                            )})
                        )}
                    </Form.Select>
                </Form.Group>                   
            </Row>

        </Form>
    </Modal.Body>
    <Modal.Footer>
        <button type='button' onClick={handleClear} className="btn btn-secondary">Clear</button>
        <button type="button" onClick={handleClose} className="btn btn-secondary">Close</button>
        <button type="submit" onClick={handleSubmit} className="btn" style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AddCloseContactModal;

