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

const SignUpBHC = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formValues, setFormValues] = useState({
        BGYName:'',
        BGYOperatingHours:'',
        BGYContactNumber:'',
        BGYEmailAddress:'',
        BGYUnitNo:'',
        BGYStreet:'',
        BGYBarangay:'',
        BGYCity:'',
        BGYRegion:'',
        BGYProvince:'',
        BGYZipCode:'',
        XCoord:'',
        YCoord:'',
        first_name: "",
        middle_name: "",
        last_name: "",
        IDNo: "",
        pw: "",
        BGYNo: "",
        isActive: 1,
        user_type: "admin",
        passwordChanged: 1,
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/newbhc", formValues)
            setShowSuccessModal(true);
        }catch(err){
            console.log(err)
        }
    }

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

        setFormValues((prev) => ({
            ...prev,
            BGYProvince: "",
            BGYCity: "",
            BGYBarangay: ""
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
        setFormValues((prev) => ({
            ...prev,
            BGYCity: "",
            BGYBarangay: ""
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
        setFormValues((prev) => ({
            ...prev,
            BGYBarangay: ""
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
    const [pwValues, setPwValues] = useState({
        confirmPw: ''
      });
  
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPwValues((prev) => ({ ...prev, [name]: value }));
      };
    

  

  return (
    

    <div>
<Navbar style={{ backgroundColor: '#0077B6' }}>
      <Navbar.Brand className="text-light ms-4">PEDIA-TB DSS</Navbar.Brand>
      
      
    </Navbar>
            

      {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
      <Row className="mt-5 justify-content-center" >
        <Col lg="9" style={{ color:'#0077B6', borderColor: '#0077B6', borderWidth: '5px', borderStyle: 'solid', borderRadius: '20px' }}>
      
             {/* Content of the page, enclosed within a rounded table appearing like a folder via UI*/}
             <form className="mt-3 justify-content-center">
             <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-12">
                    <p style={{fontSize:"25px"}}> <strong> Barangay Health Center Details  </strong> </p>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">BHC Name</label>
                    <input type="text" class="form-control"  name="BGYName"  value={formValues.BGYName} onChange={handleChange} placeholder="BHC Name"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputOperatingHours">Operating Hours</label>
                    <input type="text" class="form-control" name="BGYOperatingHours" value={formValues.BGYOperatingHours} onChange={handleChange} placeholder="Operating Hours"/>
                </div>
            </Row>
           
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputCurrHouseNo">Unit No.</label>
                    <input type="text" class="form-control"  name='BGYUnitNo' value={formValues.BGYUnitNo} onChange={handleChange} placeholder="House No."/>
                </div>
                
                <div className="form-group col-md-4">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" name='BGYStreet' value={formValues.BGYStreet} onChange={handleChange}  placeholder="Street"/>
                </div>

                

                <div class="form-group col-md-4">
                    <label for="inputCurrRegion">Region</label>
                    <select className="form-select" name="BGYRegion" value={formValues.BGYRegion} onChange={(e)=>{
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

                
                
            </Row>

            <Row className="mb-3 justify-content-center">
           

            <div class="form-group col-md-3">
                    <label for="inputCurrProvince">Province</label>
                    <select className="form-select" name="BGYProvince" value={formValues.BGYProvince} onChange={(e)=>{
                        handleChange(e);
                        handleProvinceChange(e);
                    }} disabled={formValues.BGYRegion === ""}>
                        <option value="">Select</option>
                    
                    {provinceData.map((hi, index) => (
                    <>
                    <option value={hi.province_id}>{hi.province_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-3">
                    <label for="inputCurrCity">City</label>
                    <select className="form-select" name="BGYCity" value={formValues.BGYCity} onChange={(e)=>{
                        handleChange(e);
                        handleCityChange(e);
                    }} disabled={formValues.BGYProvince === ""}>
                        <option value="">Select</option>
                    
                    {cityData.map((hi, index) => (
                    <>
                    <option value={hi.municipality_id}>{hi.municipality_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>

                <div class="form-group col-md-3">
                    <label for="inputCurrBarangay">Barangay</label>
                    <select className="form-select" name="BGYBarangay" value={formValues.BGYBarangay} onChange={handleChange} disabled={formValues.BGYCity === ""}>
                        <option value="">Select</option>
                    
                    {barangayData.map((hi, index) => (
                    <>
                    <option value={hi.barangay_id}>{hi.barangay_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div> 

                <div className="form-group col-md-3">
                    <label for="inputCurrZip">Zip Code</label>
                    <input type="text" class="form-control"  name='BGYZipCode' value={formValues.BGYZipCode} onChange={handleChange}  placeholder="Zip"/>
                </div>
                
            </Row>

            <Row className="mb-3 justify-content-center">
           

           <div className="form-group col-md-6">
               <label for="inputCurrCity">X Coordinate</label>
               <input type="number" class="form-control"  name='XCoord' value={formValues.XCoord} onChange={handleChange}  placeholder="Coordinate"/>
           </div>

           <div className="form-group col-md-6">
               <label for="inputCurrRegion">Y Coordinate</label>
               <input type="number" class="form-control"  name='YCoord' value={formValues.YCoord} onChange={handleChange} placeholder="Coordinate"/>
           </div>

         
           
       </Row>

            <Row className="mb-3 justify-content-center">
            <div class="form-group col-md-6">
                    <label for="inputContactNumber">Contact #</label>
                    <input type="text" class="form-control" name="BGYContactNumber" value={formValues.BGYContactNumber} onChange={handleChange} placeholder="e.g. 09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputContactEmail">Email Address</label>
                    <input type="text" class="form-control" name="BGYEmailAddress" value={formValues.BGYEmailAddress} onChange={handleChange} placeholder="e.g. sample@sample.com"/>
                </div>
            </Row>
            <hr/>
            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-12">
                    <p style={{fontSize:"25px"}}> <strong> Administrator Account Details  </strong> </p>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputFirstName">First Name</label>
                    <input type="text" class="form-control"  name="first_name"  value={formValues.first_name} onChange={handleChange} placeholder="First Name"/>
                </div>
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Middle Name</label>
                    <input type="text" class="form-control"  name="middle_name"  value={formValues.middle_name} onChange={handleChange} placeholder="Middle Name"/>
                </div>
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Last Name</label>
                    <input type="text" class="form-control"  name="last_name"  value={formValues.last_name} onChange={handleChange} placeholder="Last Name"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <label for="inputFirstName">User ID</label>
                    <input type="text" class="form-control"  name="IDNo"  value={formValues.IDNo} onChange={handleChange} placeholder="User ID"/>
                </div>
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Password</label>
                    <input type="password" class="form-control"  name="pw"  value={formValues.pw} onChange={handleChange} placeholder="Password"/>
                </div>
                <div className="form-group col-md-4">
                    <label for="inputFirstName">Confirm Password</label>
                    <input type="password" class="form-control"  name="pw"  value={pwValues.confirmPw} onChange={handlePasswordChange} placeholder="Password"/>
                </div>
            </Row>

            <div className="d-flex justify-content-center mt-5 mb-4" >
              <button className="btn" style={{ color: "white", backgroundColor: '#0077B6'}} onClick={handleSubmit}>
                Create Barangay Health Center
              </button>
          </div>
            
            </form>

           

      </Col>
    </Row>
    <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}} closeButton>
                    <Modal.Title>Successful</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Barangay Health Center created successfully.
                </Modal.Body>

                <Modal.Footer>
                    <Link to={`/`}>
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                    Close
                    </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
    
    </div>
    
  );
};

export default SignUpBHC;