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


    useEffect(() => {
      const fetchData = async () => {
          try {
              const diag_result = await axios.get('http://localhost:4000/api/getDiagnosisResults')
              setDiagResult(diag_result.data)
          } catch (error) {
              console.error(error)
          }
      }
      fetchData()
  },[])


    const [testOptions, setTestOptions] = useState([]);
    const [HAOptions, setHAOptions] = useState([]);
    const [feedbackForm, setFeedbackForm] = useState({ DGNo: props.DGNo, 
    recodiagnosis: '', 
    hafeedback: '', 
    recoEPTBpositive: -1, 
    req_xray: -1, 
    req_mtb: -1, 
    req_tst: -1, 
    req_igra: -1, 
    req_dst: -1,
    req_followup: -1, 
    need_hiv: -1
  })
    const [labtestfeedbackForm, setLabtestFeedbackForm] = useState([{ DGResultsNo: '', labtestRemarks: '' }]);
    const [diagResult, setDiagResult] = useState([])

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
      const { name, value, type, checked } = e.target;
    
      // For checkbox, set the value to 1 when checked, otherwise 0
      const updatedValue = type === 'checkbox' ? (checked ? 1 : -1) : value;
    
      // Create a copy of the existing feedbackForm state
      const updatedFeedbackForm = { ...feedbackForm };
    
      // Update the corresponding field in the copy with the new value
      updatedFeedbackForm[name] = updatedValue;
    
      // Set the updated state for feedbackForm
      setFeedbackForm(updatedFeedbackForm);
      console.log(feedbackForm);
    };

    const validate = () => {

      let recodiagnosisError = '';
      if (!feedbackForm.recodiagnosis) {
        recodiagnosisError = 'Required';
      } 
      setRecodiagnosisError(recodiagnosisError)

      const labtestFeedbackErrors = labtestfeedbackForm.map((field, index) => {
        let error = '';
        if (!field.DGResultsNo || !field.labtestRemarks) {
          error = 'Required';
        }
        return error;
      });
    
      setLabtestFeedbackError(labtestFeedbackErrors);
      if (recodiagnosisError || labtestFeedbackErrors.some(error => error !== '')) {
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


        setFeedbackForm({ DGNo: props.DGNo, recodiagnosis: '', hafeedback: '', recoEPTBpositive: -1, 
        req_xray: -1, 
        req_mtb: -1, 
        req_tst: -1, 
        req_igra: -1, 
        req_dst: -1,
        req_followup: -1, 
        need_hiv: -1})
        setLabtestFeedbackForm([{ DGResultsNo: '', labtestRemarks: '' }])
        handleClose();
        window.location.reload();
    }

  return (
        <>

            <button
                className="btn"
                style={{ color: "white", backgroundColor: '#0077B6'}}
                type="button"
                onClick={handleShow}
            >
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Add Dissenting Diagnosis
            </button>


        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='xl'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Dissenting Feedback</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form noValidate>
      
        <Row className="mt-4 justify-content-center">
        <Col lg="8">

            <Card className="mb-4">
              
              <Card.Body>

              <p> System Diagnosis: <strong className='text-danger'> {props.sys_diagosis} </strong> </p>
                <hr/>
                { /* Recommended Diagnosis */ }
                <Row>
                
                  <Col sm="8">
                    <Form.Label className="text-muted">Physician's Recommended Diagnosis *</Form.Label>
                  </Col>
                  <Col sm="4">  
                    <Form.Group as={Col} md="12">
                    <Form.Control
                            as="select"
                            name="recodiagnosis"
                            value={feedbackForm.recodiagnosis}
                            onChange={handleChange}
                            isInvalid={recodiagnosisError}
                        >
                            <option value="">Select an option</option>
                            {diagResult.map((option, index) => (
                                <option key={index} value={option.DRDescription}>
                                    {option.DRDescription}
                                </option>
                            ))}
                        </Form.Control>   
                        <Form.Control.Feedback type='invalid'>{recodiagnosisError}</Form.Control.Feedback>
                      </Form.Group>     
                    </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Is diagnosis Extrapulmonary? </Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='recoEPTBpositive' onChange={handleChange}/>
                  </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Request XRAY Test?</Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='req_xray' onChange={handleChange}/>
                  </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Request MTB/RIF Test?</Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='req_mtb' onChange={handleChange}/>
                  </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Request TST Test?</Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='req_tst' onChange={handleChange}/>
                  </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Request IGRA Test?</Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='req_igra' onChange={handleChange}/>
                  </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Request DST Test?</Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='req_dst' onChange={handleChange}/>
                  </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Request Follow Up?</Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='req_followup' onChange={handleChange}/>
                  </Col>
                </Row>

                <Row>
                <Col sm="8">
                    <Form.Label className="text-muted">Request HIV Test?</Form.Label>
                  </Col>
                <Col sm="4">
                    <input type="checkbox" name='need_hiv' onChange={handleChange}/>
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
                        />
                      </Form.Group>                    
                    </Col>
                </Row>
                <hr />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Col className="d-flex justify-content-center">


        <p>What Laboratory Tests were considered in this diagnosis? (Click "Add Lab Test" Button)</p>
          
        </Col>
                          
        

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
                    <Form.Label className="text-muted">Type of Lab Test*</Form.Label>
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

