import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function DiagnosisFeedbackModel(props) {
   
    const[show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/
        ${date.getDate().toString().padStart(2, '0')}/
        ${date.getFullYear()}`;
    
      return formattedDate;
    }
    

    useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await axios.get(`http://localhost:4000/api/getlabtestsbycase/${props.caseNum}`);
                  // Handle the data from the response
                  setTestOptions(response.data)
                  // You can set the data to state or perform other operations here
              } catch (error) {
                  // Handle error, such as setting an error state
                  console.error('Error fetching data:', error);
              }
          };
  
          fetchData();
      }, []); 

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/gethealthassessments/${props.caseNum}`);
                // Handle the data from the response
                console.log(response)
                setHAOptions(response.data)
                // You can set the data to state or perform other operations here
            } catch (error) {
                // Handle error, such as setting an error state
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 


    const [testOptions, setTestOptions] = useState([]);
    const [HAOptions, setHAOptions] = useState([]);
    const [feedbackForm, setFeedbackForm] = useState({ ruleno: props.ruleNo, recodiagnosis: '', AssessNo: '',  hafeedback: ''})
    const [labtestfeedbackForm, setLabtestFeedbackForm] = useState([{ DGResultsNo: '', labtestRemarks: '' }]);

    const [recodiagnosisError, setRecodiagnosisError] = useState('');
    const [AssessNoError, setAssessNoError] = useState('');
    const [hafeedbackError, setHafeedbackError] = useState('');
    const [labtestfeedbackError, setLabtestFeedbackError] = useState([]);

    const addNewField = () => {
      setLabtestFeedbackForm([...labtestfeedbackForm, { DGResultsNo: '', labtestRemarks: '' }]);
    };

    const deleteField = (index) => {
      const updatedFields = labtestfeedbackForm.filter((field, idx) => idx !== index);
      setLabtestFeedbackForm(updatedFields);
    };
  
    const handleDynamicFieldChange = (index, event) => {
      const { name, value } = event.target;
      const updatedFields = [...labtestfeedbackForm];
      updatedFields[index][name] = value;
      setLabtestFeedbackForm(updatedFields);
      console.log(labtestfeedbackForm)
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
    
      // Create a copy of the existing feedbackForm state
      const updatedFeedbackForm = { ...feedbackForm };
    
      // Update the corresponding field in the copy with the new value
      updatedFeedbackForm[name] = value;
    
      // Set the updated state for feedbackForm
      setFeedbackForm(updatedFeedbackForm);
      console.log(feedbackForm)
    };

    const validate = () => {

      let recodiagnosisError = '';
      if (!feedbackForm.recodiagnosis) {
        recodiagnosisError = 'Required';
      } 
      setRecodiagnosisError(recodiagnosisError)

      let AssessNoError = '';
      if (!feedbackForm.AssessNo) {
        AssessNoError = 'Required';
      } 
      setAssessNoError(AssessNoError)


      let hafeedbackError = '';
      if (!feedbackForm.hafeedback) {
        hafeedbackError = 'Required';
      } 
      setAssessNoError(hafeedbackError)

      const labtestFeedbackErrors = labtestfeedbackForm.map((field, index) => {
        let error = '';
        if (!field.DGResultsNo || !field.labtestRemarks) {
          error = 'Required';
        }
        return error;
      });
    
      setLabtestFeedbackError(labtestFeedbackErrors);

      if (recodiagnosisError || AssessNoError || hafeedbackError || labtestFeedbackErrors.some(error => error !== '')) {
        return false;
      }

      return true;
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        const isValid = validate();
        if(!isValid){
          return;
        }

        try {
          const labtestfeedback = labtestfeedbackForm.reduce((acc, item) => {
            acc[item.labtestRemarks] = item.DGResultsNo;
            return acc;
          }, {});
      
          const updatedAssessFormValues = {
            ...feedbackForm,
            labtestfeedback
          };
          
          console.log(updatedAssessFormValues)
          await axios.post(`http://localhost:4000/api/addfeedback/${props.caseNum}`, updatedAssessFormValues, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (err) {
          console.log(err);
        }


        setFeedbackForm({ ruleno: props.ruleNo, recodiagnosis: '', AssessNo: '',  hafeedback: ''})
        setLabtestFeedbackForm([{ DGResultsNo: '', labtestRemarks: '' }])
        handleClose();
    }

  return (
        <>

            <button
                className="btn"
                style={{ color: "white", backgroundColor: '#0077B6'}}
                type="button"
                onClick={handleShow}
            >
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add Diagnosis Feedback
            </button>


        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='xl'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Diagnosis Feedback</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form noValidate>

        <Row className="mt-4 justify-content-center">
        <Col lg="8">
        <p> <strong> Feebdack Form </strong> </p>
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="9">
                    <Card.Text>Feedback</Card.Text>
                  </Col>
                  <Col sm="2">
                    <Card.Text></Card.Text>
                  </Col>
                </Row>
                <hr/>
                { /* Recommended Diagnosis */ }
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Recommended Diagnosis *</Form.Label>
                  </Col>
                  <Col sm="4">  
                    <Form.Group as={Col} md="12">
                        <Form.Control
                          type="textarea" 
                          name="recodiagnosis"
                          value={feedbackForm.recodiagnosis}
                          onChange={handleChange}
                          placeholder=''
                          isInvalid={recodiagnosisError}
                        />
                        <Form.Control.Feedback type='invalid'>{recodiagnosisError}</Form.Control.Feedback>
                      </Form.Group>                    
                    </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Health Assessment *</Form.Label>
                  </Col>
                  <Col sm="4">
                  <Form.Group as={Col} md="12">
                        <Form.Control
                            as="select"
                            name="AssessNo"
                            value={feedbackForm.AssessNo}
                            onChange={handleChange}
                            isInvalid={AssessNoError}
                        >
                            <option value="">Select an option</option>
                            {HAOptions.map((option, index) => (
                                <option key={option.AssessNo} value={option.AssessNo}>
                                    {formatDate(option.assessment_date)}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>{AssessNoError}</Form.Control.Feedback>
                      </Form.Group>             
                    </Col>
                </Row>

                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Health Assessment Feedback</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                        <Form.Control
                          as="textarea"
                          name="hafeedback"
                          value={feedbackForm.hafeedback}
                          onChange={handleChange}
                          placeholder=''
                          isInvalid={hafeedbackError}
                        />
                        <Form.Control.Feedback type='invalid'>{hafeedbackError}</Form.Control.Feedback>
                      </Form.Group>                    
                    </Col>
                </Row>
                <hr />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Col className="d-flex justify-content-center">

            <button
            className="btn"
            style={{ color: 'white', backgroundColor: '#0077B6' }}
            type="button"
            onClick={addNewField}
          >
            Add Lab Test
          </button>


              
            </Col>
        

      {/* Lab Test Feedback Section */}
      {labtestfeedbackForm.map((field, index) => (
        <Row key={index} className="mt-4 justify-content-center">
          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>

                                {/* Delete Button */}
                  <Row className="mb-2">
                  <Col sm="12" className="d-flex justify-content-end">
                  <button  className="btn"
                  style={{ color: 'white', backgroundColor: '#E81123' }}
              type="button"onClick={() => deleteField(index)}>
                  x
                  </button>

                  </Col>
                </Row>


                {/* Dropdown */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Lab Test*</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                      <Form.Control
                            as="select"
                            name="DGResultsNo"
                            value={field.DGResultsNo}
                            onChange={(e) => handleDynamicFieldChange(index, e)}
                            isInvalid={labtestfeedbackError[index]}
                        >
                            <option value="">Select an option</option>
                            {testOptions.map((option, index) => (
                                <option key={option.DGResultsNo} value={option.DGResultsNo}>
                                    {option.DGTestName} - {option.test_refno} | Issued At {formatDate(option.issue_date)}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Labtest Remarks Input */}
                <Row>
                  <Col sm="8">
                    <Form.Label className="text-muted">Labtest Remarks *</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Group as={Col} md="12">
                      <Form.Control
                        as="textarea"
                        name="labtestRemarks"
                        value={field.labtestRemarks}
                        onChange={(e) => handleDynamicFieldChange(index, e)}
                        placeholder=""
                        isInvalid={labtestfeedbackError[index]}
                      />
                       <Form.Control.Feedback type='invalid'>{labtestfeedbackError[index]}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>



              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}

       
      </Form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose}  className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}

export default DiagnosisFeedbackModel;

