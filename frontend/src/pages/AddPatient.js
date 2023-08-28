import '../index.css';
import React, { useState, useEffect } from 'react';
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

    const[regionData, setRegionData] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:4000/api/allregions`)
          .then((response) => {
            setRegionData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
    
    }, []);

    const [provinceData, setProvinceData] = useState([]);

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        axios.get(`http://localhost:4000/api/provinces/${selectedRegion}`)
            .then((response) => {
                setProvinceData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching provinces:', error);
            });
    }

    const [cityData, setCityData] = useState([]);

    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        axios.get(`http://localhost:4000/api/cities/${selectedProvince}`)
            .then((response) => {
                setCityData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }

    const [barangayData, setBarangayData] = useState([]);

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        axios.get(`http://localhost:4000/api/barangays/${selectedCity}`)
        .then((response) => {
            setBarangayData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching barangays:', error);
        });
    }

    const[currRegionData, setCurrRegionData] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:4000/api/allregions`)
          .then((response) => {
            setCurrRegionData(response.data)
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
          });
        
    
    }, []);

    const[currProvinceData, setCurrProvinceData] = useState([]);

    const handleCurrRegionChange = (e) => {
        // Fetch and update province data based on the selected region if needed
        const selectedRegion = e.target.value;
        axios.get(`http://localhost:4000/api/provinces/${selectedRegion}`)
            .then((response) => {
                setCurrProvinceData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching provinces:', error);
            });
    };

    const[currCityData, setCurrCityData] = useState([]);

    const handleCurrProvinceChange = (e) => {
        // Fetch and update city data based on the selected province if needed
        const selectedProvince = e.target.value;
        axios.get(`http://localhost:4000/api/cities/${selectedProvince}`)
            .then((response) => {
                setCurrCityData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    };

    const[currBarangayData, setCurrBarangayData] = useState([]);

    const handleCurrCityChange = (e) => {
        // Fetch and update barangay data based on the selected city if needed
        const selectedCity = e.target.value;
        axios.get(`http://localhost:4000/api/barangays/${selectedCity}`)
        .then((response) => {
            setCurrBarangayData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching barangays:', error);
        });
    };

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
        guardian_name: "",
        g_birthdate: "",
        g_contactno: "",
        g_email: "",
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

            if (age >= 15) {
                alert("Age must be below 15 years old.");
                return; // Do not proceed with updating the state
            }

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
                    <label for="inputPermHouseNo">House #</label>
                    <input type="text" class="form-control" id="inputPermHouseNo" name='per_houseno' onChange={handleChange}  placeholder="House No."/>
                </div>
                
                <div class="form-group col-md-1">
                    <label for="inputPermStreet">Street</label>
                    <input type="text" class="form-control" id="inputPermStreet" name='per_street' onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermRegion">Region</label>
                    <select className="form-select" name="per_region" value={patient.per_region} onChange={(e)=>{
                        handleChange(e);
                        handleRegionChange(e);
                    }}>
                        <option value="">Select</option>
                    
                    {regionData.map((hi, index) => (
                    <>
                    <option value={hi.region_id}>{hi.region_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermProvince">Province</label>
                    <select className="form-select" name="per_province" value={patient.per_province} onChange={(e)=>{
                        handleChange(e);
                        handleProvinceChange(e);
                    }}>
                        <option value="">Select</option>
                    
                    {provinceData.map((hi, index) => (
                    <>
                    <option value={hi.province_id}>{hi.province_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermCity">City</label>
                    <select className="form-select" name="per_city" value={patient.per_city} onChange={(e)=>{
                        handleChange(e);
                        handleCityChange(e);
                    }}>
                        <option value="">Select</option>
                    
                    {cityData.map((hi, index) => (
                    <>
                    <option value={hi.municipality_id}>{hi.municipality_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermBarangay">Barangay</label>
                    <select className="form-select" name="per_barangay" value={patient.per_barangay} onChange={handleChange}>
                        <option value="">Select</option>
                    
                    {barangayData.map((hi, index) => (
                    <>
                    <option value={hi.barangay_id}>{hi.barangay_name}</option>
                    
                        </>
                            ))}
        

                    </select>
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
                    <label for="inputCurrHouseNo">House #</label>
                    <input type="text" class="form-control" id="inputCurrHouseNo" name='curr_houseno' onChange={handleChange}  placeholder="House No." disabled={isCurrentAddressDisabled}/>
                </div>
                
                <div class="form-group col-md-1">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" id="inputCurrStreet" name='curr_street' onChange={handleChange}  placeholder="Street" disabled={isCurrentAddressDisabled}/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrRegion">Region</label>
                    <select className="form-select" name="curr_region" value={patient.curr_region} onChange={(e)=>{
                        handleChange(e);
                        handleCurrRegionChange(e);
                    }} disabled={isCurrentAddressDisabled}>
                        <option value="">Select</option>
                    
                    {currRegionData.map((hi, index) => (
                    <>
                    <option value={hi.region_id}>{hi.region_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrProvince">Province</label>
                    <select className="form-select" name="curr_province" value={patient.curr_province} onChange={(e)=>{
                        handleChange(e);
                        handleCurrProvinceChange(e);
                    }} disabled={isCurrentAddressDisabled}>
                        <option value="">Select</option>
                    
                    {currProvinceData.map((hi, index) => (
                    <>
                    <option value={hi.province_id}>{hi.province_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrCity">City</label>
                    <select className="form-select" name="curr_city" value={patient.curr_city} onChange={(e)=>{
                        handleChange(e);
                        handleCurrCityChange(e);
                    }} disabled={isCurrentAddressDisabled}>
                        <option value="">Select</option>
                    
                    {currCityData.map((hi, index) => (
                    <>
                    <option value={hi.municipality_id}>{hi.municipality_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrBarangay">Barangay</label>
                    <select className="form-select" name="curr_barangay" value={patient.curr_barangay} onChange={handleChange} disabled={isCurrentAddressDisabled}>
                        <option value="">Select</option>
                    
                    {currBarangayData.map((hi, index) => (
                    <>
                    <option value={hi.barangay_id}>{hi.barangay_name}</option>
                    
                        </>
                            ))}
        

                    </select>
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
                    <label for="inputGuardianName">Name of Guardian</label>
                    <input type="text" class="form-control" id="inputGuardianName" name='guardian_name' onChange={handleChange} placeholder="Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputGuardianBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputGuardianBirth" name='g_birthdate' onChange={handleChange} placeholder="Guardian's Name"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputGuardianContact">Contact #</label>
                    <input type="text" class="form-control" id="inputGuardianContact" name='g_contactno' onChange={handleChange} placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-3">
                    <label for="inputGuardianEmail">Email</label>
                    <input type="text" class="form-control" id="inputGuardianEmail" name='g_email' onChange={handleChange} placeholder="sample@sample.com"/>
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