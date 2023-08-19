import '../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';

const AddPatient = () => {
    const [patient, setPatient] = useState({
        last_name: "",
        first_name: "",
        middle_initial: "",
        age: null,
        sex: "",
        birthdate: "",
        initial_bodyweight: null,
        initial_height: null,
        nationality: "",
        address_1:"",
        address_2: "",
        city: "",
        admission_date: new Date().toISOString().split('T')[0],
        mother_name: "",
        m_birthdate: "",
        f_contactno: "",
        f_email: "",
        father_name: "",
        f_birthdate: "",
        f_contactno: "",
        f_email: "",
        emergency_name: "",
        e_birthdate: "",
        e_contactno: "",
        e_email: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        const newValue = name === 'last_name' ? value.toUpperCase() : value;

        setPatient(prev=>({...prev, [name]: newValue}));
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newpatient", patient)
        }catch(err){
            console.log(err)
        }
    }

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
                <div className="form-group col-md-5">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" class="form-control" id="inputFirstName" name='first_name' onChange={handleChange} placeholder="First Name"/>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputMI">Middle Name</label>
                    <input type="text" class="form-control" id="inputMI" name='middle_initial' onChange={handleChange} placeholder="Middle Name"/>
                </div>

                <div className="form-group col-md-4">
                    <label for="inputLastName">Last Name</label>
                    <input type="text" class="form-control" id="inputLastName" name='last_name' onChange={handleChange} placeholder="Last Name"/>
                </div>
              </Row>
              <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-2">
                    <label for="inputBirthdate">Birthdate</label>
                    <input type="date" class="form-control" id="inputBirthdate" name='birthdate' onChange={handleChange} />
                </div>
                
                <div className="form-group col-md-2">
                <label for="inputSex">Sex</label>
                <select id="inputSex" class="form-control" name='sex' onChange={handleChange} >
                    <option selected>Select</option>
                    <option value="M" >Male</option>
                    <option value="F" >Female</option>
                </select>
                </div>

                <div className="form-group col-md-1">
                    <label for="inputAge">Age</label>
                    <input type="number" class="form-control" id="inputAge"  name='age' onChange={handleChange} placeholder="Age"/>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputNationality">Nationality</label>
                    <input type="text" class="form-control" id="inputNationality"  name='nationality' onChange={handleChange} placeholder="Nationality"/>
                </div>
                
                <div className="form-group col-md-2">
                    <label for="inputWeight">Body Weight</label>
                    <input type="number" class="form-control" id="inputWeight"  name='initial_bodyweight' onChange={handleChange} placeholder="Weight (kg)"/> 
                </div>
                
                <div className="form-group col-md-2">
                    <label for="inputHeight">Height</label>
                    <input type="number" class="form-control" id="inputHeight"  name='initial_height' onChange={handleChange} placeholder="Height (ft)"/>
                </div>
            </Row>
            
            <Row className="mb-3 justify-content-center">
                <div class="form-group col-md-11">
                    <label for="inputAddress1">Address 1</label>
                    <input type="text" class="form-control" id="inputAddress1" name='address_1' onChange={handleChange}  placeholder="House # / Street Name"/>
                </div>
                
            </Row>

            <Row className="mb-4 justify-content-center">
                <div class="form-group col-md-8">
                    <label for="inputAddress2">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" name='address_2' onChange={handleChange} placeholder="District Name / Barangay"/>
                </div>

                <div class="form-group col-md-3">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity" name='city' onChange={handleChange} placeholder="City"/>
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
                    <input type="text" class="form-control" id="inputMotherName" name='mother_name' onChange={handleChange} placeholder="Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputMotherBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputMotherBirth" name='m_birthdate' onChange={handleChange} placeholder="Mother's Name"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputMotherContact">Contact #</label>
                    <input type="text" class="form-control" id="inputMotherContact" name='m_contactno' onChange={handleChange} placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputMotherEmail">Email</label>
                    <input type="email" class="form-control" id="inputMotherEmail" name='m_email' onChange={handleChange} placeholder="sample@sample.com"/>
                </div>
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
                <div class="form-group col-md-3">
                    <label for="inputFatherName">Name of Father</label>
                    <input type="text" class="form-control" id="inputFatherName" name='father_name' onChange={handleChange} placeholder="Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputFatherBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputFatherBirth" name='f_birthdate' onChange={handleChange} placeholder="Father's Name"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputFatherContact">Contact #</label>
                    <input type="text" class="form-control" id="inputFatherContact" name='f_contactno' onChange={handleChange} placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputFatherEmail">Email</label>
                    <input type="email" class="form-control" id="inputFatherEmail" name='f_email' onChange={handleChange} placeholder="sample@sample.com"/>
                </div>
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
                <div class="form-group col-md-3">
                    <label for="inputEmergencyName">Emergency Contact Name</label>
                    <input type="text" class="form-control" id="inputEmergencyName" name='emergency_name' onChange={handleChange} placeholder="Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputEmergencyBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputEmergencyBirth" name='e_birthdate' onChange={handleChange} placeholder="Mother's Name"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputEmergencyContact">Contact #</label>
                    <input type="text" class="form-control" id="inputEmergencyContact" name='e_contactno' onChange={handleChange} placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputEmergencyEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmergencyEmail" name='e_email' onChange={handleChange} placeholder="sample@sample.com"/>
                </div>
            </Row>
            <div className="d-flex justify-content-center mt-5 mb-4" >
              <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} onClick={handleClick}>
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
