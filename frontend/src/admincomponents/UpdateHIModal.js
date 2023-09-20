import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import axios from 'axios';
import edit from '../assets/edit.png'
import Spinner from "react-bootstrap/Spinner";
function UpdateHIModal(props) {
   
    const[show,setShow] = useState(false)
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");
    const [isLoading, setIsLoading] = useState(true);
   
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

          axios.get(`http://localhost:4000/api/provinces/${props.HIRegion}`)
          .then((response) => {
              setProvinceData(response.data);
          })
          .catch((error) => {
              console.error('Error fetching provinces:', error);
          });

          axios.get(`http://localhost:4000/api/cities/${props.HIProvince}`)
          .then((response) => {
              setCityData(response.data);
          })
          .catch((error) => {
              console.error('Error fetching cities:', error);
          });

          axios.get(`http://localhost:4000/api/barangays/${props.HICity}`)
            .then((response) => {
                setBarangayData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching barangays:', error);
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
        HIName: props.HIName,
        HIOperatingHours:props.HIOperatingHours,
        HIContactNumber:props.HIContactNumber,
        HIEmailAddress:props.HIEmailAddress,
        HIUnitNo:props.HIUnitNo,
        HIStreet:props.HIStreet,
        HIRegion:props.HIRegion,
        HIProvince:props.HIProvince,
        HICity:props.HICity,
        HIBarangay:props.HIBarangay,
        HIZipCode:props.HIZipCode,
        XCoord:props.XCoord,
        YCoord:props.YCoord,
        HIContactPerson: props.HIContactPerson,
        HINo: props.HINo
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:4000/api/updatehi", formValues)
        }catch(err){
            console.log(err)
        }
        window.location.reload()
    }
  return (
        <>

{props.isActive === 1 ? (
     
   <img
          src={edit}
          onClick={handleShow}
          className="mt-1 me-2 clickable"
          style={{ height: "30px" }}
     />
        
      ) : null}
      
      
        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size='lg'>
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Update Health Institution</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {props.HIName === "" ? (
                <div
                  className="text-center"
                  style={{ marginTop: "10vh", marginBottom: "10vh" }}
                >
                  <Spinner
                    animation="border"
                    variant="primary"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginTop: "1rem",
                      color: "#0077B6",
                    }}
                  >
                    Loading...
                  </p>
                </div>
              ) : (
                <>
    <form className="mt-3 justify-content-center">
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputFirstName">Health Institution Name</label>
                    <input type="text" class="form-control"  name="HIName"  value={formValues.HIName} onChange={handleChange} placeholder="HI Name"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-12">
                    <label for="inputOperatingHours">Operating Hours</label>
                    <input type="text" class="form-control" name="HIOperatingHours" value={formValues.HIOperatingHours} onChange={handleChange} placeholder="Operating Hours"/>
                </div>
            </Row>
           
            <Row className="mb-3 justify-content-center">
                <div className="form-group col-md-3">
                    <label for="inputCurrHouseNo">Unit No.</label>
                    <input type="text" class="form-control"  name='HIUnitNo' value={formValues.HIUnitNo} onChange={handleChange} placeholder="House No."/>
                </div>
                
                <div className="form-group col-md-3">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" name='HIStreet' value={formValues.HIStreet} onChange={handleChange}  placeholder="Street"/>
                </div>

                <div className="form-group col-md-3">
                    <label for="inputCurrRegion">Region</label>
                    <select className="form-select" name="HIRegion" value={formValues.HIRegion} onChange={(e)=>{
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

                <div className="form-group col-md-3">
                    <label for="inputCurrRegion">Province</label>
                    <select className="form-select" name="HIProvince" disabled={formValues.HIRegion === ""} value={formValues.HIProvince} onChange={(e)=>{
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

             
            </Row>

            <Row className="mb-3 justify-content-center">
           
            <div className="form-group col-md-4">
                    <label for="inputCurrCity">City</label>
                    <select className="form-select" name="HICity" value={formValues.HICity} disabled={formValues.HIProvince === ""} onChange={(e)=>{
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
                
               
            <div class="form-group col-md-4">
                    <label for="inputCurrBarangay">Barangay</label>
                    <select className="form-select" name="HIBarangay" value={formValues.HIBarangay} disabled={formValues.HICity === ""}  onChange={handleChange}>
                        <option value="">Select</option>
                    
                    {barangayData.map((hi, index) => (
                    <>
                    <option value={hi.barangay_id}>{hi.barangay_name}</option>
                    
                        </>
                            ))}
        

                    </select>
                </div>
                

               

                <div className="form-group col-md-4">
                    <label for="inputCurrZip">Zip Code</label>
                    <input type="text" class="form-control"  name='HIZipCode' value={formValues.HIZipCode} onChange={handleChange}  placeholder="Zip"/>
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
                <div className="form-group col-md-12">
                    <label for="inputOperatingHours">Contact Person</label>
                    <input type="text" class="form-control" name="HIContactPerson" value={formValues.HIContactPerson} onChange={handleChange} placeholder="Name"/>
                </div>
            </Row>

            <Row className="mb-3 justify-content-center">
            <div class="form-group col-md-6">
                    <label for="inputContactNumber">Contact #</label>
                    <input type="text" class="form-control" name="HIContactNumber" value={formValues.HIContactNumber} onChange={handleChange} placeholder="e.g. 09xx-xxx-xxxx"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputContactEmail">Email Address</label>
                    <input type="text" class="form-control" name="HIEmailAddress" value={formValues.HIEmailAddress} onChange={handleChange} placeholder="e.g. sample@sample.com"/>
                </div>
            </Row>

          

            
            </form>
            </>
              )}
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Update</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default UpdateHIModal;

