import '../index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import edit from '../assets/edit.png';
import user from '../assets/user.png';
import distance from '../assets/distance.png';
import assessment from '../assets/assessment.png';
import treatment from '../assets/treatment.png';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddPatient = () => {

    function formatDate(datestring) {
        const date = new Date(datestring);

        // Extract year, month, and day from the date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-based
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    const params = useParams()
    const id = params.id

    const [isAutoFillActive, setIsAutoFillActive] = useState(false);
    const [isCurrentAddressDisabled, setIsCurrentAddressDisabled] = useState(false);
    const [calculatedAge, setCalculatedAge] = useState(null);
    let age = null;

    const [showConsentModal, setShowConsentModal] = useState(true);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userNum, setUserNum] = useState(null);
    const handleCloseConsentModal = () => {
        setShowConsentModal(false);
    };

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
        
          const fetchData = async () => {
            try {
              // Retrieve the JWT token from local storage
              const token = localStorage.getItem('token');
              if (!token) {
                console.error('Token not found in local storage.');
                return;
              }
        
              // Define headers with the JWT token
              const headers = {
                Authorization: `Bearer ${token}`,
              };
        
              // Make an Axios GET request to the /test route with the token in headers
              const response = await axios.get('http://localhost:4000/api/tokencontent', { headers });
        
              // Handle the response data
              console.log('Response:', response.data);
              setUserNum(response.data.userNo);
            } catch (error) {
              console.error('Error:', error);
            }
          };
        
          fetchData(); // Call the fetchData function when the component mounts
    
    }, []);

    const [provinceData, setProvinceData] = useState([]);

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;

        setPatient((prev) => ({
            ...prev,
            per_province: "",
            per_city: "",
            per_barangay: ""
          }));

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
        setPatient((prev) => ({
            ...prev,
            per_city: "",
            per_barangay: ""
          }));
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
        setPatient((prev) => ({
            ...prev,
            per_barangay: ""
          }));
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
        setPatient((prev) => ({
            ...prev,
            curr_province: "",
            curr_city: "",
            curr_barangay: ""
          }));
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
        setPatient((prev) => ({
            ...prev,
            curr_city: "",
            curr_barangay: ""
          }));
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
        setPatient((prev) => ({
            ...prev,
            curr_barangay: ""
          }));
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
        guardian_name: "N/A",
        g_relationship: "N/A",
        g_birthdate: new Date().toISOString().split('T')[0],
        g_contactno: "N/A",
        g_email: "N/A",
        mother_name: "N/A",
        m_birthdate: new Date().toISOString().split('T')[0],
        m_contactno: "N/A",
        m_email: "N/A",
        father_name: "N/A",
        f_birthdate: new Date().toISOString().split('T')[0],
        f_contactno: "N/A",
        f_email: "N/A",
        emergency_name: "N/A",
        e_relationship: "N/A",
        e_birthdate: new Date().toISOString().split('T')[0],
        e_contactno: "N/A",
        e_email: "N/A",
        userNo: userNum

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
            axios.get(`http://localhost:4000/api/provinces/${per_region}`)
          .then((response) => {
              setCurrProvinceData(response.data);
          })
          .catch((error) => {
              console.error('Error fetching provinces:', error);
          });

          axios.get(`http://localhost:4000/api/cities/${per_province}`)
          .then((response) => {
              setCurrCityData(response.data);
          })
          .catch((error) => {
              console.error('Error fetching cities:', error);
          });

          axios.get(`http://localhost:4000/api/barangays/${per_city}`)
            .then((response) => {
                setCurrBarangayData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching barangays:', error);
            });
            
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

    const [firstNameError, setFirstNameError] = useState('');
    const [middleNameError, setMiddleNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [birthdateError, setBirthdateError] = useState('');
    const [sexError, setSexError] = useState('');
    const [nationalityError, setNationalityError] = useState('');
    const [bodyWeightError, setBodyWeightError] = useState('');
    const [heightError, setHeightError] = useState('');
    const [permHouseError, setPermHouseError] = useState('');
    const [permStreetError, setPermStreetError] = useState('');
    const [permRegionError, setPermRegionError] = useState('');
    const [permProvinceError, setPermProvinceError] = useState('');
    const [permCityError, setPermCityError] = useState('');
    const [permBarangayError, setPermBarangayError] = useState('');
    const [permZipError, setPermZipError] = useState('');
    const [currHouseError, setCurrHouseError] = useState('');
    const [currStreetError, setCurrStreetError] = useState('');
    const [currRegionError, setCurrRegionError] = useState('');
    const [currProvinceError, setCurrProvinceError] = useState('');
    const [currCityError, setCurrCityError] = useState('');
    const [currBarangayError, setCurrBarangayError] = useState('');
    const [currZipError, setCurrZipError] = useState('');

    const validate = () => {
        let firstNameError = '';
        if (!patient.first_name) {
            firstNameError = 'First name is required';
        }
        setFirstNameError(firstNameError);

        let middleNameError = '';
        if (!patient.middle_initial) {
            middleNameError = 'Middle name is required';
        }
        setMiddleNameError(middleNameError);

        let lastNameError = '';
        if (!patient.last_name) {
            lastNameError = 'Last name is required';
        }
        setLastNameError(lastNameError);        

        let birthdateError = '';
        if (!patient.birthdate) {
            birthdateError = 'Birthdate is required';
        }
        setBirthdateError(birthdateError);

        let sexError = '';
        if (!patient.sex) {
            sexError = 'Sex is required';
        }
        setSexError(sexError);

        let nationalityError = '';
        if (!patient.nationality) {
            nationalityError = 'Nationality is required';
        }
        setNationalityError(nationalityError);

        let bodyWeightError = '';
        if (!patient.initial_bodyweight) {
            bodyWeightError = 'Body Weight is required';
        }
        setBodyWeightError(bodyWeightError);
    
        let heightError = '';
        if (!patient.initial_height) {
            heightError = 'Height is required';
        }
        setHeightError(heightError);

        // PERMANENT ADDRESS
        let permHouseError = '';
        if (!patient.per_houseno) {
            permHouseError = 'Required';
        }
        setPermHouseError(permHouseError);

        let permStreetError = '';
        if (!patient.per_street) {
            permStreetError = 'Required';
        }
        setPermStreetError(permStreetError);

        let permRegionError = '';
        if (!patient.per_region) {
            permRegionError = 'Required';
        }
        setPermRegionError(permRegionError);

        let permProvinceError = '';
        if (!patient.per_province) {
            permProvinceError = 'Required';
        }
        setPermProvinceError(permProvinceError);

        let permCityError = '';
        if (!patient.per_city) {
            permCityError = 'Required';
        }
        setPermCityError(permCityError);

        let permBarangayError = '';
        if (!patient.per_barangay) {
            permBarangayError = 'Required';
        }
        setPermBarangayError(permBarangayError);

        let permZipError = '';
        if (!patient.per_zipcode) {
            permZipError = 'Required';
        }
        setPermZipError(permZipError);

        // CURRENT ADDRESS
        let currHouseError = '';
        if (!patient.curr_houseno) {
            currHouseError = 'Required';
        }
        setCurrHouseError(currHouseError);

        let currStreetError = '';
        if (!patient.curr_street) {
            currStreetError = 'Required';
        }
        setCurrStreetError(currStreetError);

        let currRegionError = '';
        if (!patient.curr_region) {
            currRegionError = 'Required';
        }
        setCurrRegionError(currRegionError);

        let currProvinceError = '';
        if (!patient.curr_province) {
            currProvinceError = 'Required';
        }
        setCurrProvinceError(currProvinceError);

        let currCityError = '';
        if (!patient.curr_city) {
            currCityError = 'Required';
        }
        setCurrCityError(currCityError);

        let currBarangayError = '';
        if (!patient.curr_barangay) {
            currBarangayError = 'Required';
        }
        setCurrBarangayError(currBarangayError);

        let currZipError = '';
        if (!patient.curr_zipcode) {
            currZipError = 'Required';
        }
        setCurrZipError(currZipError);

        if (firstNameError || middleNameError || lastNameError || birthdateError || sexError || nationalityError || bodyWeightError || heightError || permHouseError || permStreetError || permRegionError || permProvinceError || permCityError || permBarangayError || permZipError || currHouseError || currStreetError || currRegionError || currProvinceError || currCityError || currBarangayError || currZipError) {
            return false;
        }

        return true;
    }

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

        const isValid = validate();
        if(!isValid) {
            return;
        }

        try{
            const patientData = {
                ...patient,
                age: calculatedAge
            };
            await axios.post("http://localhost:4000/api/newpatient", patientData)
            setShowSuccessModal(true);
        }catch(err){
            console.log(err)
        }
    }

    // trigger autofill when accessed with parameter
    useEffect(() => {
        console.log(id)
        axios.get(`http://localhost:4000/api/getOneContact/${id}`)
        .then(res => {
          console.log(res);
          setPatient( prev => ({
            ...prev,
            ...res.data[0],
            id
          }));
        })
        .catch(err => {
          console.error(err);
        })
    }, [id ? id : null ])

    // check parameter
    useEffect(() => {
        console.log(patient)
    }, [patient])

    // calculate age for when birthdate is passed from parameter
    


  return (

    <div>
      <NavBar/>

            <Modal show={showConsentModal} onHide={handleCloseConsentModal}  backdrop={ 'static' } size='lg'>
                <Modal.Header style={{color:'white', backgroundColor: "#0077B6"}}>
                    <Modal.Title>Privacy Consent Reminder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ textAlign: 'justify' }}>Privacy Notice: It has been explained to me that all information collected in this form shall only be used for the purposes
                    of clinical management, program management, and/or provision of psychosocial and financial support. <br/><br/>If I have any query on or
                    wish to revoke this authorization, I shall notify the facility head or contact <b>ntp.helpdesk@doh.gov.ph</b> or <b>(02) 8230-9626</b>. <br/><br/>
                    <span style={{ fontWeight: 'bold', color: 'red' }}>
                        All information collected shall remain secured and confidential and only authorized personnel shall have access to them.
                    </span>
                    </p>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="consentCheckbox"
                            checked={isCheckboxChecked}
                            onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                            required
                        />
                        <label className="form-check-label" htmlFor="consentCheckbox">
                            Patient has signed consent form
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConsentModal} disabled={!isCheckboxChecked}>
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>

      {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
      <Row className="mt-5 justify-content-center" >
        <Col lg="11" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
             {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
      <form className="mt-4 justify-content-center">
            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"25px"}}> <strong> New Patient Information  </strong> </p>
                </div>
            </Row>
            
      
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" class="form-control" id="inputFirstName" name='first_name' onChange={handleChange} placeholder="First Name" value={patient.first_name}/>
                    {firstNameError && (
                        <p style={{color: 'red'}}>{firstNameError}</p>  
                    )}
                </div>

                <div className="form-group col-md-3">
                    <label for="inputMI">Middle Name</label>
                    <input type="text" class="form-control" id="inputMI" name='middle_initial' onChange={handleChange} placeholder="Middle Name" value={patient.middle_initial}/>
                    {middleNameError && (
                        <p style={{color: 'red'}}>{middleNameError}</p>
                    )}
                </div>

                <div className="form-group col-md-4">
                    <label for="inputLastName">Last Name</label>
                    <input type="text" class="form-control" id="inputLastName" name='last_name' onChange={handleChange} placeholder="Last Name" value={patient.last_name} />
                    {lastNameError && (
                        <p style={{color: 'red'}}>{lastNameError}</p>
                    )}
                </div>
              </Row>
              <Row className="mb-5 justify-content-center">
                <div className="form-group col-md-2">
                    <label for="inputBirthdate">Birthdate</label>
                    <input type="date" class="form-control" id="inputBirthdate" name='birthdate' onChange={handleChange}  />
                    {birthdateError && (
                        <p style={{color: 'red'}}>{birthdateError}</p>
                    )}
                </div>
                
                <div className="form-group col-md-2">
                <label for="inputSex">Sex</label>
                <select id="inputSex" class="form-control" name='sex' onChange={handleChange} value={patient.sex} >
                    <option selected>Select</option>
                    <option value="M" >Male</option>
                    <option value="F" >Female</option>
                </select>
                    {sexError && (
                        <p style={{color: 'red'}}>{sexError}</p>
                    )}
                </div>

                <div className="form-group col-md-1">
                    <label for="inputAge">Age</label>
                    <input type="number" class="form-control" id="inputAge"  name='age' value={calculatedAge !== null ? calculatedAge : ''} readOnly placeholder="Age"/>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputNationality">Nationality</label>
                    <input type="text" class="form-control" id="inputNationality"  name='nationality' onChange={handleChange} placeholder="Nationality"/>
                    {nationalityError && (
                        <p style={{color: 'red'}}>{nationalityError}</p>
                    )}
                </div>
                
                <div className="form-group col-md-2">
                    <label for="inputWeight">Body Weight</label>
                    <input type="number" class="form-control" id="inputWeight"  name='initial_bodyweight' onChange={handleChange} placeholder="Weight (kg)"/> 
                    {bodyWeightError && (
                        <p style={{color: 'red'}}>{bodyWeightError}</p>
                    )}
                </div>
                
                <div className="form-group col-md-2">
                    <label for="inputHeight">Height</label>
                    <input type="number" class="form-control" id="inputHeight"  name='initial_height' onChange={handleChange} placeholder="Height (cm)"/>
                    {heightError && (
                        <p style={{color: 'red'}}>{heightError}</p>
                    )}
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
                    {permHouseError && (
                        <p style={{color: 'red'}}>{permHouseError}</p>  
                    )}
                </div>
                
                <div class="form-group col-md-1">
                    <label for="inputPermStreet">Street</label>
                    <input type="text" class="form-control" id="inputPermStreet" name='per_street' onChange={handleChange}  placeholder="Street"/>
                    {permStreetError && (
                        <p style={{color: 'red'}}>{permStreetError}</p>  
                    )}
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
                    {permRegionError && (
                        <p style={{color: 'red'}}>{permRegionError}</p>  
                    )}
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermProvince">Province</label>
                    <select className="form-select" name="per_province" disabled={patient.per_region === ""} value={patient.per_province} onChange={(e)=>{
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
                    {permProvinceError && (
                        <p style={{color: 'red'}}>{permProvinceError}</p>  
                    )}
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermCity">City</label>
                    <select className="form-select" name="per_city" value={patient.per_city} disabled={patient.per_province === ""} onChange={(e)=>{
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
                    {permCityError && (
                        <p style={{color: 'red'}}>{permCityError}</p>  
                    )}
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermBarangay">Barangay</label>
                    <select className="form-select" name="per_barangay" value={patient.per_barangay} disabled={patient.per_city === ""} onChange={handleChange}>
                        <option value="">Select</option>
                    
                    {barangayData.map((hi, index) => (
                    <>
                    <option value={hi.barangay_id}>{hi.barangay_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                    {permBarangayError && (
                        <p style={{color: 'red'}}>{permBarangayError}</p>  
                    )}
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPermZip">Zip Code</label>
                    <input type="text" class="form-control" id="inputPermZip" name='per_zipcode' onChange={handleChange}  placeholder="Zip"/>
                    {permZipError && (
                        <p style={{color: 'red'}}>{permZipError}</p>  
                    )}
                </div>
                
            </Row>

            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p> <strong style={{fontSize:"25px"}}> Current Address&nbsp;  </strong> <label>
                        <input
                            type="checkbox"
                            checked={isAutoFillActive}
                            onChange={handleAutoFill}
                        />
                        &nbsp;Same as Permanent Address
                    </label></p>
                </div>
            </Row>

            <Row className="mb-5 justify-content-center">
            <div class="form-group col-md-1">
                    <label for="inputCurrHouseNo">House #</label>
                    <input type="text" class="form-control" id="inputCurrHouseNo" name='curr_houseno' value={isAutoFillActive ? patient.per_houseno : patient.curr_houseno} onChange={handleChange}  placeholder="House No." disabled={isCurrentAddressDisabled}/>
                    {currHouseError && (
                        <p style={{color: 'red'}}>{currHouseError}</p>  
                    )}
                </div>
                
                <div class="form-group col-md-1">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" id="inputCurrStreet" name='curr_street' value={isAutoFillActive ? patient.per_street : patient.curr_street} onChange={handleChange}  placeholder="Street" disabled={isCurrentAddressDisabled}/>
                    {currStreetError && (
                        <p style={{color: 'red'}}>{currStreetError}</p>  
                    )}
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
                    {currRegionError && (
                        <p style={{color: 'red'}}>{currRegionError}</p>  
                    )}
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrProvince">Province</label>
                    <select className="form-select" name="curr_province" value={patient.curr_province}  onChange={(e)=>{
                        handleChange(e);
                        handleCurrProvinceChange(e);
                    }} disabled={isCurrentAddressDisabled || patient.curr_region === ""}>
                        <option value="">Select</option>
                    
                    {currProvinceData.map((hi, index) => (
                    <>
                    <option value={hi.province_id}>{hi.province_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                    {currProvinceError && (
                        <p style={{color: 'red'}}>{currProvinceError}</p>  
                    )}
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrCity">City</label>
                    <select className="form-select" name="curr_city" value={patient.curr_city} onChange={(e)=>{
                        handleChange(e);
                        handleCurrCityChange(e);
                    }} disabled={isCurrentAddressDisabled || patient.curr_province === ""}>
                        <option value="">Select</option>
                    
                    {currCityData.map((hi, index) => (
                    <>
                    <option value={hi.municipality_id}>{hi.municipality_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                    {currCityError && (
                        <p style={{color: 'red'}}>{currCityError}</p>  
                    )}
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrBarangay">Barangay</label>
                    <select className="form-select" name="curr_barangay" value={patient.curr_barangay} onChange={handleChange} disabled={isCurrentAddressDisabled || patient.curr_city === ""}>
                        <option value="">Select</option>
                    
                    {currBarangayData.map((hi, index) => (
                    <>
                    <option value={hi.barangay_id}>{hi.barangay_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                    {currBarangayError && (
                        <p style={{color: 'red'}}>{currBarangayError}</p>  
                    )}
                </div> 

                <div class="form-group col-md-1">
                    <label for="inputCurrZip">Zip Code</label>
                    <input type="text" class="form-control" id="inputCurrZip" name='curr_zipcode' value={isAutoFillActive ? patient.per_zipcode : patient.curr_zipcode} onChange={handleChange}  placeholder="Zip" disabled={isCurrentAddressDisabled}/>
                    {currZipError && (
                        <p style={{color: 'red'}}>{currZipError}</p>  
                    )}
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
                    <label for="inputGuardianRelationship">Relationship</label>
                    <input type="text" class="form-control" id="inputGuardianRelationship" name='g_relationship' onChange={handleChange} placeholder="Relationship"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputGuardianBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputGuardianBirth" name='g_birthdate' onChange={handleChange} placeholder="Guardian's Name"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputGuardianContact">Contact #</label>
                    <input type="text" class="form-control" id="inputGuardianContact" name='g_contactno' onChange={handleChange} placeholder="09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-2">
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

            <Row className="mt-2 mb-5 justify-content-center">
                <div class="form-group col-md-3">
                    <label for="inputEmergencyName">Emergency Contact Name</label>
                    <input type="text" class="form-control" id="inputEmergencyName" name='emergency_name' onChange={handleChange} placeholder="Name" value={patient.contact_person ? patient.contact_person : ''}/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputEmergencyRelationship">Relationship</label>
                    <input type="text" class="form-control" id="inputEmergencyRelationship" name='e_relationship' onChange={handleChange} placeholder="Relationship"/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputEmergencyBirth">Birthdate</label>
                    <input type="date" class="form-control" id="inputEmergencyBirth" name='e_birthdate' onChange={handleChange} placeholder="Mother's Name" />
                </div>
                <div class="form-group col-md-2">
                    <label for="inputEmergencyContact">Contact #</label>
                    <input type="text" class="form-control" id="inputEmergencyContact" name='e_contactno' onChange={handleChange} placeholder="09xx-xxx-xxxx" value={patient.contact_num ? patient.contact_num : ''}/>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputEmergencyEmail">Email</label>
                    <input type="text" class="form-control" id="inputEmergencyEmail" name='e_email' onChange={handleChange} placeholder="sample@sample.com" value={patient.contact_email ? patient.contact_email : ''} />
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

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}} closeButton>
                    <Modal.Title>Patient Added!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Patient added successfully.
                </Modal.Body>

                <Modal.Footer>
                    <Link to={`/allpatient`}>
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                    Close
                    </Button>
                    </Link>
                </Modal.Footer>
            </Modal>

      </Col>
    </Row>

    </div>
    
  );
};

export default AddPatient;