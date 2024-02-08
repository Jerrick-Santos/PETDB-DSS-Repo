import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function CreateHIModal(props) {
   
    const[show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
            HIProvince: "",
            HICity: "",
            HIBarangay: ""
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
            HICity: "",
            HIBarangay: ""
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
            HIBarangay: ""
          }));
        axios.get(`http://localhost:4000/api/barangays/${selectedCity}`)
        .then((response) => {
            setBarangayData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching barangays:', error);
        });
    }

    const [formValues, setFormValues] = useState({
        HIName:'',
        HIOperatingHours:'',
        HIContactNumber:'',
        HIEmailAddress:'',
        HIUnitNo:'',
        HIStreet:'',
        HIBarangay:'',
        HICity:'',
        HIRegion:'',
        HIProvince:'',
        HIZipCode:'',
        XCoord:'',
        YCoord:'',
        HIContactPerson: '',
        isActive: 1
    });

    const [HINameError, setHINameError] = useState('');
    const [operatingHoursError, setOHError] = useState('');
    const [unitError, setUnitError] = useState('');
    const [streetError, setStreetError] = useState('');
    const [regionError, setRegionError] = useState('');
    const [provinceError, setProvinceError] = useState('');
    const [cityError, setCityError] = useState('');
    const [barangayError, setBarangayError] = useState('');
    const [zipError, setZipError] = useState('');
    const [xCoordError, setXCError] = useState('');
    const [yCoordError, setYCError] = useState('');
    const [contactError, setContactError] = useState('');
    const [contactNoError, setContactNoError] = useState('');
    const [emailError, setEmailError] = useState('');
  
    const validate = () => {
      let HINameError = '';
      if (!formValues.HIName) {
        HINameError = 'Required field';
      }
      setHINameError(HINameError);
  
      let operatingHoursError = '';
      if (!formValues.HIOperatingHours) {
        operatingHoursError = 'Required field';
      }
      setOHError(operatingHoursError);
  
      let unitError = '';
      if (!formValues.HIUnitNo) {
        unitError = 'Required field';
      }
      setUnitError(unitError); 
  
      let streetError = '';
      if (!formValues.HIStreet) {
        streetError = 'Required field';
      }
      setStreetError(streetError); 
  
      let regionError = '';
      if (!formValues.HIRegion) {
        regionError = 'Required field';
      }
      setRegionError(regionError); 

      let provinceError = '';
      if (!formValues.HIProvince) {
        provinceError = 'Required field';
      }
      setProvinceError(provinceError); 

      let cityError = '';
      if (!formValues.HICity) {
        cityError = 'Required field';
      }
      setCityError(cityError);

      let barangayError = '';
      if (!formValues.HIBarangay) {
        barangayError = 'Required field';
      }
      setBarangayError(barangayError);

      let zipError = '';
      if (!formValues.HIZipCode) {
        zipError = 'Required field';
      } else if (isNaN(formValues.HIZipCode)) {
        zipError = 'Must be a valid number';
      } else if (!/^\d+$/.test(formValues.HIZipCode)) {
        zipError = 'Should not have letters';
      }
      setZipError(zipError);

      let xCoordError = '';
      if (!formValues.XCoord) {
        xCoordError = 'Required field';
      }
      setXCError(xCoordError);

      let yCoordError = '';
      if (!formValues.YCoord) {
        yCoordError = 'Required field';
      }
      setYCError(yCoordError);

      let contactError = '';
      if (!formValues.HIContactPerson) {
        contactError = 'Required field';
      }
      setContactError(contactError);

      let contactNoError = '';
      if (!formValues.HIContactNumber) {
        contactNoError = 'Required field';
      } else if (formValues.HIContactNumber.length > 11) {
        contactNoError = 'Must be a valid contact number';
      } else if (formValues.HIContactNumber.length < 11) {
        contactNoError = 'Must be a valid contact number';
      } else if (isNaN(formValues.HIContactNumber)) {
        contactNoError = 'Must be a valid contact number';
      } else if (!/^\d+$/.test(formValues.HIContactNumber)) {
        contactNoError = 'Must be a valid contact number';
      }
      setContactNoError(contactNoError);

      let emailError = '';
      if (!formValues.HIEmailAddress) {
        emailError = 'Required field';
      }
      setEmailError(emailError);
  
      if (HINameError || operatingHoursError || unitError || streetError || regionError || provinceError || cityError || barangayError || zipError || xCoordError || yCoordError || contactError || contactNoError || emailError) {
        return false;
      }
  
      return true;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isValid = validate();
        if(!isValid) {
            return;
        }

        try{
            await axios.post("http://localhost:4000/api/newhi", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
    }
  return (
        <>

    <button
    className="btn"
    style={{ color: "white", backgroundColor: "#0077B6" }}
    type="button"
    onClick={() => {
        handleShow(); // Call the handleShow function after a delay
    }}
    >
    <img src={add} className="me-1 mb-1" style={{ height: "20px" }} /> Create a new HI
    </button>
    <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
        <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
            <Modal.Title>Create a Health Institution</Modal.Title>
        </Modal.Header>
    <Modal.Body>
        <Form className="mt-3 justify-content-center" noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <Form.Label>Health Institution Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIName'
                        onChange={handleChange}
                        value={formValues.HIName}
                        placeholder="HI Name"
                        isInvalid={HINameError}
                    />
                    <Form.Control.Feedback type='invalid'>{HINameError}</Form.Control.Feedback>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <Form.Label>Operating Hours</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIOperatingHours'
                        onChange={handleChange}
                        value={formValues.HIOperatingHours}
                        placeholder="Operating Hours"
                        isInvalid={operatingHoursError}
                    />
                    <Form.Control.Feedback type='invalid'>{operatingHoursError}</Form.Control.Feedback>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-3">
                    <Form.Label>Unit No.</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIUnitNo'
                        value={formValues.HIUnitNo}
                        onChange={handleChange}
                        placeholder="House No."
                        isInvalid={unitError}
                    />
                    <Form.Control.Feedback type='invalid'>{unitError}</Form.Control.Feedback>
                </div>
                <div className="form-group col-md-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIStreet'
                        value={formValues.HIStreet}
                        onChange={handleChange}
                        placeholder="Street"
                        isInvalid={streetError}
                    />
                    <Form.Control.Feedback type='invalid'>{streetError}</Form.Control.Feedback>
                </div>
                <div className="form-group col-md-3">
                    <Form.Label>Region</Form.Label>
                    <Form.Select
                        aria-label="HIRegion"
                        name="HIRegion"
                        value={formValues.HIRegion}
                        onChange={(e)=>{
                            handleChange(e);
                            handleRegionChange(e);
                        }}
                        isInvalid={regionError}
                    >
                        <option value="">Select</option>
                        {regionData.map((hi, index) => (
                            <>
                                <option value={hi.region_id}>{hi.region_name}</option>
                            </>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{regionError}</Form.Control.Feedback>
                </div>
                <div className="form-group col-md-3">
                    <Form.Label>Province</Form.Label>
                    <Form.Select
                        aria-label="HIProvince"
                        name="HIProvince"
                        disabled={formValues.HIRegion === ""}
                        value={formValues.HIProvince}
                        onChange={(e)=>{
                            handleChange(e);
                            handleProvinceChange(e);
                        }}
                        isInvalid={provinceError}
                    >
                        <option value="">Select</option>
                        {provinceData.map((hi, index) => (
                            <>
                                <option value={hi.province_id}>{hi.province_name}</option>
                            </>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{provinceError}</Form.Control.Feedback>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-4">
                    <Form.Label>City</Form.Label>
                    <Form.Select
                        aria-label="HICity"
                        name="HICity"
                        disabled={formValues.HIProvince === ""}
                        value={formValues.HICity}
                        onChange={(e)=>{
                            handleChange(e);
                            handleCityChange(e);
                        }}
                        isInvalid={cityError}
                    >
                        <option value="">Select</option>
                        {cityData.map((hi, index) => (
                            <>
                                <option value={hi.municipality_id}>{hi.municipality_name}</option>
                            </>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{cityError}</Form.Control.Feedback>
                </div> 
                <div class="form-group col-md-4">
                    <Form.Label>Barangay</Form.Label>
                    <Form.Select
                        aria-label="HIBarangay"
                        name="HIBarangay"
                        disabled={formValues.HICity === ""}
                        value={formValues.HIBarangay}
                        onChange={handleChange}
                        isInvalid={barangayError}
                    >
                        <option value="">Select</option>
                        {barangayData.map((hi, index) => (
                            <>
                                <option value={hi.barangay_id}>{hi.barangay_name}</option>
                            </>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{barangayError}</Form.Control.Feedback>
                </div>
                <div className="form-group col-md-4">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIZipCode'
                        value={formValues.HIZipCode}
                        onChange={handleChange}
                        placeholder="Zip"
                        isInvalid={zipError}
                    />
                    <Form.Control.Feedback type='invalid'>{zipError}</Form.Control.Feedback>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-6">
                    <Form.Label>X Coordinate</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        name='XCoord'
                        value={formValues.XCoord}
                        onChange={handleChange}
                        placeholder="Coordinate"
                        isInvalid={xCoordError}
                    />
                    <Form.Control.Feedback type='invalid'>{xCoordError}</Form.Control.Feedback>
                </div>
                <div className="form-group col-md-6">
                    <Form.Label>Y Coordinate</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        name='YCoord'
                        value={formValues.YCoord}
                        onChange={handleChange}
                        placeholder="Coordinate"
                        isInvalid={yCoordError}
                    />
                    <Form.Control.Feedback type='invalid'>{yCoordError}</Form.Control.Feedback>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <Form.Label>Contact Person</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIContactPerson'
                        value={formValues.HIContactPerson}
                        onChange={handleChange}
                        placeholder="Name"
                        isInvalid={contactError}
                    />
                    <Form.Control.Feedback type='invalid'>{contactError}</Form.Control.Feedback>
                </div>
            </Row>
            <Row className="mb-3 justify-content-center">
                <div class="form-group col-md-6">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIContactNumber'
                        value={formValues.HIContactNumber}
                        onChange={handleChange}
                        placeholder="e.g. 09xx-xxx-xxxx"
                        isInvalid={contactNoError}
                    />
                    <Form.Control.Feedback type='invalid'>{contactNoError}</Form.Control.Feedback>
                </div>
                <div class="form-group col-md-6">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='HIEmailAddress'
                        value={formValues.HIEmailAddress}
                        onChange={handleChange}
                        placeholder="e.g. sample@sample.com"
                        isInvalid={emailError}
                    />
                    <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback>
                </div>
            </Row>
        </Form>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Add</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>
    </>
  );
}

export default CreateHIModal;