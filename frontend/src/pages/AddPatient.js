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
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
    const [isAutoFillActive, setIsAutoFillActive] = useState(false);
    const [isCurrentAddressDisabled, setIsCurrentAddressDisabled] = useState(false);
    const [calculatedAge, setCalculatedAge] = useState(null);
    let age = null;

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
        per_houseno:"",
        per_street: "",
        per_region: "",
        per_province: "",
        per_city: "",
        per_barangay: "",
        per_zipcode: "",
        curr_houseno:"",
        curr_street: "",
        curr_region: "",
        curr_province: "",
        curr_city: "",
        curr_barangay: "",
        curr_zipcode: "",
        admission_date: new Date().toISOString().split('T')[0],
        mother_name: "",
        m_birthdate: "",
        m_contactno: "",
        m_email: "",
        father_name: "",
        f_birthdate: "",
        f_contactno: "",
        f_email: "",
        emergency_name: "",
        e_birthdate: "",
        e_contactno: "",
        e_email: "",
        case_refno: "",
    });

    const handleAutoFill = () => {
        
        const {
            per_houseno,
            per_street,
            per_region,
            per_province,
            per_city,
            per_barangay,
            per_zipcode,
        } = patient;

        setIsAutoFillActive(!isAutoFillActive);
        setIsCurrentAddressDisabled(!isCurrentAddressDisabled);

        if (!isAutoFillActive) {
            setPatient(prev => ({
                ...prev,
                curr_houseno: per_houseno,
                curr_street: per_street,
                curr_region: per_region,
                curr_province: per_province,
                curr_city: per_city,
                curr_barangay: per_barangay,
                curr_zipcode: per_zipcode,
            }));
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        let newValue = value;

        if (name === 'birthdate') {
            const selectedBirthdate = new Date(value);
            const currentDate = new Date();
            age = currentDate.getFullYear() - selectedBirthdate.getFullYear();
            if (
                currentDate.getMonth() < selectedBirthdate.getMonth() ||
                (currentDate.getMonth() === selectedBirthdate.getMonth() &&
                    currentDate.getDate() < selectedBirthdate.getDate())
            ) {
                age--;
            }
            newValue = value;
        }

        let updatedPatient = {...patient};  

        updatedPatient[name] = name === 'last_name' ? value.toUpperCase() : newValue;

        if (name === 'birthdate') {
            // also update calculatedAge
            setCalculatedAge(age); 
        }

        setPatient(updatedPatient);
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            const patientData = {
                ...patient,
                age: calculatedAge
            };
            await axios.post("http://localhost:4000/api/newpatient", patientData)
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
      <form className="mt-4 justify-content-center">
            <Row className="mb-2 justify-content-center">
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
              <Row className="mb-5 justify-content-center">
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
                    <input type="number" class="form-control" id="inputAge"  name='age' value={calculatedAge !== null ? calculatedAge : ''} readOnly placeholder="Age"/>
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
            <hr/>

            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"25px"}}> <strong> Permanent Address  </strong> </p>
                </div>
            </Row>
            
            <Row className="mb-5 justify-content-center">
                <div class="form-group col-md-1">
                    <label for="inputPermHouseNo">House No.</label>
                    <input type="text" class="form-control" id="inputPermHouseNo" name='per_houseno' onChange={handleChange}  placeholder="House No."/>
                </div>
                
                <div class="form-group col-md-1">
                    <label for="inputPermStreet">Street</label>
                    <input type="text" class="form-control" id="inputPermStreet" name='per_street' onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermRegion">Region</label>
                    <input type="text" class="form-control" id="inputPermRegion" name='per_region' onChange={handleChange}  placeholder="Region"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermProvince">Province</label>
                    <input type="text" class="form-control" id="inputPermProvince" name='per_province' onChange={handleChange}  placeholder="Province"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermCity">City</label>
                    <input type="text" class="form-control" id="inputPermCity" name='per_city' onChange={handleChange}  placeholder="City"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermBarangay">Barangay</label>
                    <input type="text" class="form-control" id="inputPermBarangay" name='per_barangay' onChange={handleChange}  placeholder="Barangay"/>
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPermZip">Zip Code</label>
                    <input type="text" class="form-control" id="inputPermZip" name='per_zipcode' onChange={handleChange}  placeholder="Zip"/>
                </div>
                
            </Row>

            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"25px"}}> <strong> Current Address  </strong> </p>
                </div>
            </Row>

            <Row className="mb-5 justify-content-center">
            <div class="form-group col-md-1">
                    <label for="inputCurrHouseNo">House No.</label>
                    <input type="text" class="form-control" id="inputCurrHouseNo" name='curr_houseno' onChange={handleChange}  placeholder="House No." disabled={isCurrentAddressDisabled}/>
                </div>
                
                <div class="form-group col-md-1">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" id="inputCurrStreet" name='curr_street' onChange={handleChange}  placeholder="Street" disabled={isCurrentAddressDisabled}/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrRegion">Region</label>
                    <input type="text" class="form-control" id="inputCurrRegion" name='curr_region' onChange={handleChange}  placeholder="Region" disabled={isCurrentAddressDisabled}/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrProvince">Province</label>
                    <input type="text" class="form-control" id="inputCurrProvince" name='curr_province' onChange={handleChange}  placeholder="Province" disabled={isCurrentAddressDisabled}/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrCity">City</label>
                    <input type="text" class="form-control" id="inputCurrCity" name='curr_city' onChange={handleChange}  placeholder="City" disabled={isCurrentAddressDisabled}/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrBarangay">Barangay</label>
                    <input type="text" class="form-control" id="inputCurrBarangay" name='curr_barangay' onChange={handleChange}  placeholder="Barangay" disabled={isCurrentAddressDisabled}/>
                </div> 

                <div class="form-group col-md-1">
                    <label for="inputCurrZip">Zip Code</label>
                    <input type="text" class="form-control" id="inputCurrZip" name='curr_zipcode' onChange={handleChange}  placeholder="Zip" disabled={isCurrentAddressDisabled}/>
                </div>
                
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-11">
                    <label>
                        <input
                            type="checkbox"
                            checked={isAutoFillActive}
                            onChange={handleAutoFill}
                        />
                        Auto-Fill Current Address
                    </label>
                </div>
            </Row>

            <hr/>

            <Row className="mb-2 justify-content-center">
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
                    <input type="text" class="form-control" id="inputMotherEmail" name='m_email' onChange={handleChange} placeholder="sample@sample.com"/>
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
                    <input type="text" class="form-control" id="inputFatherEmail" name='f_email' onChange={handleChange} placeholder="sample@sample.com"/>
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
                    <input type="text" class="form-control" id="inputEmergencyEmail" name='e_email' onChange={handleChange} placeholder="sample@sample.com"/>
                </div>
            </Row>

            <hr/>

            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"25px"}}> <strong> Initial Case Reference  </strong> </p>
                </div>
            </Row>

            <Row className="mt-2 mb-3 justify-content-center">
                <div class="form-group col-md-3">
                    <label for="inputCaseRefno">Initial Case Reference No.</label>
                    <input type="text" class="form-control" id="inputCaseRefno" name='case_refno' onChange={handleChange} placeholder="Case Ref No."/>
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