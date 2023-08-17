import '../index.css';
import React from 'react';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';


const AddPatient = () => {

   
  return (

    <div>
      <NavBar/>

    
      {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
      <Row className="mt-5 justify-content-center" >
        <Col lg="9" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
             {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
      <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"25px"}}> <strong> New Patient Information  </strong> </p>
                </div>
            </Row>
            
      
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-6">
                    <label for="inputFullName">Full Name</label>
                    <input type="text" class="form-control" id="inputFullName" placeholder="Full Name"/>
                </div>
              
                <div className="form-group col-md-2">
                    <label for="inputBirthdate">Birthdate</label>
                    <input type="date" class="form-control" id="inputBirthdate" placeholder="Age"/>
                </div>
                
                <div className="form-group col-md-2">
                <label for="inputSex">Sex</label>
                <select id="inputSex" class="form-control">
                    <option selected>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                </div>

                <div className="form-group col-md-1">
                    <label for="inputAge">Age</label>
                    <input type="text" class="form-control" id="inputAge" placeholder="Age"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-6">
                    <label for="inputNationality">Nationality</label>
                    <input type="text" class="form-control" id="inputNationality" placeholder="Nationality"/>
                </div>
                
                <div className="form-group col-md-2">
                    <label for="inputWeight">Body Weight</label>
                    <input type="text" class="form-control" id="inputWeight" placeholder="Weight (kg)"/> 
                </div>
                
                <div className="form-group col-md-2">
                    <label for="inputHeight">Height</label>
                    <input type="text" class="form-control" id="inputHeight" placeholder="Height (ft)"/>
                </div>
                <div className="form-group col-md-1"/>
               
            </Row>
            
            <Row className="mb-3 justify-content-center">
                <div class="form-group col-md-11">
                    <label for="inputAddress1">Address 1</label>
                    <input type="text" class="form-control" id="inputAddress1" placeholder="House # / Street Name"/>
                </div>
                
            </Row>

            <Row className="mb-4 justify-content-center">
                <div class="form-group col-md-8">
                    <label for="inputAddress1">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="District Name / Barangay"/>
                </div>

                <div class="form-group col-md-3">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" placeholder="City"/>
                </div>
                
            </Row>
            <hr/>

            <Row className="mb-3 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"25px"}}> <strong> Contacts  </strong> </p>
                </div>
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
                <div class="form-group col-md-3">
                    <label for="inputMotherName">Name of Mother</label>
                    <input type="text" class="form-control" id="inputMotherName" placeholder="Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputMotherBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputMotherBirth" placeholder="Mother's Name"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputMotherEmail">Contact #</label>
                    <input type="text" class="form-control" id="inputMotherEmail" placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputMotherEmail">Email</label>
                    <input type="email" class="form-control" id="inputMotherEmail" placeholder="sample@sample.com"/>
                </div>
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
                <div class="form-group col-md-3">
                    <label for="inputFatherName">Name of Father</label>
                    <input type="text" class="form-control" id="inputFatherName" placeholder="Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputFatherBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputFatherBirth" placeholder="Father's Name"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputFatherEmail">Contact #</label>
                    <input type="text" class="form-control" id="inputFatherEmail" placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputFatherEmail">Email</label>
                    <input type="email" class="form-control" id="inputFatherEmail" placeholder="sample@sample.com"/>
                </div>
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
                <div class="form-group col-md-3">
                    <label for="inputEmergencyName">Emergency Contact Name</label>
                    <input type="text" class="form-control" id="inputEmergencyName" placeholder="Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputEmergencyBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputEmergencyBirth" placeholder="Mother's Name"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputEmergencyEmail">Contact #</label>
                    <input type="text" class="form-control" id="inputEmergencyEmail" placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputEmergencyEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmergencyEmail" placeholder="sample@sample.com"/>
                </div>
            </Row>
            <div className="d-flex justify-content-center mt-5 mb-4" >
              <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} type="button">
                Save Information
              </button>
          </div>
            </form>


      </Col>
    </Row>

    </div>
    
  );
};

export default AddPatient;
