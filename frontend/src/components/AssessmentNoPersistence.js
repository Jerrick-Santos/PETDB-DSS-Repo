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
import AddHIVTestModal from './AddTSTModal';
import AddMTBRIFModal from './AddMTBRIFModal';
import AssessmentSummaryModal from './AssessmentSummaryModal';
import ShowDiagnosisModal from './ShowDiagnosisModal';
import ViewMapRecomModal from './ViewMapRecomModal';

const AssessmentFormNoPersistence = () => {
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
            <Card.Text>2 weeks</Card.Text>
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
            <Card.Text>2 weeks</Card.Text>
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
            <Card.Text>Symptom</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text>Yes</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text>No</Card.Text>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Gibbus Deformity?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you experiencing non-painful enlargment of lymph nodes?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you experiencing stiff neck?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you experiencing drowsiness?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you experiencing pleural effusion?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you experiencing pericardial effusion?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you experiencing a distended abdomen?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you experiencing a non-painful enlarged joint?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you showing signs of tuberculin hypersensitivity?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
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
            <Card.Text>Assessment</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text>Yes</Card.Text>
          </Col>
          <Col sm="2">
            <Card.Text>No</Card.Text>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you unable to stand?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted"> Do you have Diabetes?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Are you living with a person with HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Do you have HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Does your mother have HIV?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Do you have a history of smoking?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Do you have a history of drinking?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Do you have a history of sexual activity?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Do you have a history of renal disease?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Do you have a history of malnutrition?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Is there a possibility of drug to drug interaction?</Card.Text>
          </Col>
          <Col sm="2">
            <input type="checkbox" />
          </Col>
          <Col sm="2">
            <input type="checkbox"/>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col sm="8">
            <Card.Text className="text-muted">Body Weight</Card.Text>
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
            <Card.Text className="text-muted">Height</Card.Text>
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
            <Card.Text className="text-muted">Other Health Issues</Card.Text>
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
            <Card.Text className="text-muted">Other Medications</Card.Text>
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
            <Card.Text className="text-muted">Other Co-morbidities</Card.Text>
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

export default AssessmentFormNoPersistence;
