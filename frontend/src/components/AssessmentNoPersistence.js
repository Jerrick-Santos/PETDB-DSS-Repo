import '../index.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from './NavBar';
import axios from 'axios';
import user from '../assets/user.png';

import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import AddXrayModal from './AddXrayModal';
import AddHIVTestModal from './AddHIVTestModal';
import AddMTBRIFModal from './AddMTBRIFModal';
import AssessmentSummaryModal from './AssessmentSummaryModal';
import ShowDiagnosisModal from './ShowDiagnosisModal';
import XrayRecomModal from './XrayRecomModal';

const AssessmentFormOld = () => {
  return (
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
          <Col sm="4">
            <Card.Text>Persistence</Card.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Cough</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Fever</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Night Sweats</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Weight Loss</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
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
          <Col sm="4">
            <Card.Text>Persistence</Card.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Fatigue</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Reduced Playfulness</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Decreased Activities</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
          <Col sm="4">
            <input type="checkbox" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="4">
            <Card.Text className="text-muted">Not Eating Well</Card.Text>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
          </Col>
          <Col sm="4">
            <input type="checkbox"/>
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
          <Col sm="8">
            <Card.Text>Gibbus Deformity?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB1" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB1" value="no"/>
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing non-painful enlargment of lymph nodes?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB2" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB2" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing stiff neck?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB3" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB3" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing drowsiness?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB4" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB4" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing pleural effusion?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB5" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB5" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing pericardial effusion?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB6" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB6" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing a distended abdomen?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB7" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB7" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you experiencing a non-painful enlarged joint?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB8" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB8" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you showing signs of tuberculin hypersensitivity?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="EPTB9" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="EPTB9" value="no"  />
                  No
                </label>
              </Card.Text>
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
          <Col sm="8">
            <Card.Text>Are you unable to stand?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA1" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA1" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text> Do you have Diabetes?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA2" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA2" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Are you living with a person with HIV?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA3" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA3" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have HIV?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA4" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA4" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Does your mother have HIV?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA5" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA5" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of smoking?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA6" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA6" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of drinking?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA7" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA7" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of sexual activity?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA8" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA8" value="no" />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of renal disease?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA9" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA9" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Do you have a history of malnutrition?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA10" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA10" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Is there a possibility of drug to drug interaction?</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <label>
                  <input type="radio" name="OA11" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" className="ms-4" name="OA11" value="no"  />
                  No
                </label>
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Body Weight</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='in kilograms' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Height</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='in feet' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Other Health Issues</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='Health Issues' />
              </Card.Text>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text>Other Medications</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='Medications' />
              </Card.Text>
          </Col>
        </Row>
        <hr />


        <Row>
          <Col sm="8">
            <Card.Text>Other Co-morbidities</Card.Text>
          </Col>
          <Col sm="4">
            <Card.Text>
                <input type="text" className="form-control " placeholder='Co-morbidities' />
              </Card.Text>
          </Col>
        </Row>
        
      </Card.Body>
    </Card>
  </Col>
</Row>
</div>
  );
};

export default AssessmentFormOld;
