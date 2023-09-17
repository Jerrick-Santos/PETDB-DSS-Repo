import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import axios from 'axios';
import { Row, Col  } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ViewSimilarPatientModal from '../components/ViewSimilarPatientModal'

function AddCloseContactModal(props) {
   
    
    const [validated, setValidated] = useState(false); // Form Validation
    const [show,setShow] = useState(false) // Modal for Close Contact Addition
    const [showSimilar, setShowSimilar] = useState(false) // Modal for View Similar Patient
    const [errors, setErrors] = useState({}); // Stores Form Erros
    const [similarPatients, setSimilarPatients] = useState([]) // Store List of Similar Patient
    const [selectedPatientIndex, setSelectedPatientIndex] = useState(null); // Store Index for Similar Patient Array Access

    // Modal Show and Close
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Form Values
    const [formValues, setFormValues] = useState({
        last_name: '',
        first_name: '',
        middle_initial: '',
        birthdate: new Date(),
        sex: '',
        contact_person: '',
        contact_num: '',
        contact_email: '',
        contact_relationship: '',
        CaseNo: props.id,
        PatientNo: null
    });

    // Form Validation 
    const setField = (field, value) => {
        setFormValues({
            ...formValues,
            [field]:value
        })

        if (errors[field] && value) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [field]: null
            }));
        }
    }

    // Fetch function for similar patient by name
    const fetchData = async () => {
        try {
          const result = await axios.get(`http://localhost:4000/api/getSimilarPatients/${formValues.first_name}/${formValues.middle_initial}/${formValues.last_name}`);
          return result.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          return [];
        }
    };


    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setFormValues(prev=>({...prev, [name]: value}));
        console.log(formValues.first_name)

        if (formValues.first_name && formValues.last_name && formValues.middle_initial) {
            console.log("Similarity Check Condition Triggered");
            fetchData().then(similarData => {
              setSimilarPatients(similarData);
              setShowSimilar(similarData.length > 0);
            });
        }
    }

    const validateForm = () => {
        const { first_name, last_name, middle_initial, birthdate, sex, contact_relationship, contact_num} = formValues
        const newErrors = {}

        console.log(birthdate, new Date())

        // VALID CHECKERS
        if (!first_name) newErrors.first_name = "Input cannot be empty"
        if (!last_name) newErrors.last_name = "Input cannot be empty"
        if (!middle_initial) newErrors.middle_initial = "Input cannot be empty"
        if (new Date(birthdate).toLocaleDateString() === new Date().toLocaleDateString()) newErrors.birthdate = "Please select a date"
        if (sex === "") newErrors.sex = "Please select an option"
        if (!contact_relationship) newErrors.contact_relationship = "Input cannot be empty"
        if (contact_num.length !== 11 && contact_num.length > 0) newErrors.contact_num = "Contact No. must be 11 digits"


        return newErrors
    }

    useEffect(() => {
        if (selectedPatientIndex !== null) {

            const index = parseInt(selectedPatientIndex, 10)
            const selectedPatient = similarPatients[index];

            console.log("SELECTED PATIENT FROM INDEX: ", selectedPatient)

            setFormValues(prevData => ({
                ...prevData,
                last_name: selectedPatient.last_name,
                first_name: selectedPatient.first_name,
                middle_initial: selectedPatient.middle_initial,
                birthdate: new Date(selectedPatient.birthdate).toISOString(),
                sex: selectedPatient.sex,
                contact_person: selectedPatient.emergency_name,
                contact_num: selectedPatient.e_contactno,
                contact_email: selectedPatient.e_email,
                CaseNo: props.id,
                PatientNo: selectedPatient.PatientNo,
            }));

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
                console.log("Form Submitted: ", formValues)
                await axios.post("http://localhost:4000/api/addContacts", formValues)

                setValidated(true)
                setShow(false)
                window.location.reload(false)

                
            }catch(err){
                console.log(err)
            }
            
        }
        
    }

    

  return (
        <>

            <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button" onClick={handleShow} disabled={!props.show}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add a Close Contact
            </button>

    <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg">
        <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
            <Modal.Title>Add Close Contact</Modal.Title>
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
                        onChange={e => setField('first_name', e.target.value)}
                        value={formValues.first_name}
                        isInvalid={!!errors.first_name}
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
                        onChange={e => setField('middle_initial', e.target.value)}
                        value={formValues.middle_initial}
                        isInvalid={!!errors.middle_initial} 
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
                        onChange={e => setField('last_name', e.target.value)}
                        value={formValues.last_name}
                        isInvalid={!!errors.last_name} 
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
                            value={new Date(formValues.birthdate).toISOString().split('T')[0]}
                            isInvalid={!!errors.birthdate}
                        />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{errors.birthdate}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="2" controlId="sex">
                    <Form.Label>Sex</Form.Label>
                    <Form.Select aria-label="Sex" onChange={handleChange} name='sex' isInvalid={!!errors.sex} value={formValues.sex}>
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
                    />
                </Form.Group>
            </Row>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <button type="submit" onClick={handleSubmit} className="btn" style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="button" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AddCloseContactModal;

