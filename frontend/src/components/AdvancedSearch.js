import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import axios from 'axios';
import add from '../assets/add.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdvancedSearch(){
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const[resultsData, setResultsData]= useState([]);
    const [patientsData, setPatientsData] = useState({
        last_name: "_",
        first_name: "_",
        middle_initial: "_",
        age: "_",
        sex: "_",
        birthdate: "_",
        nationality: "_",
        per_houseno:"_",
        per_street: "_",
        per_barangay: "_",
        per_city: "_",
        per_region: "_",
        per_zipcode: "_",
        curr_houseno:"_",
        curr_street: "_",
        curr_barangay: "_",
        curr_city: "_",
        curr_region: "_",
        curr_zipcode: "_",
        admission_date: "_",
        mother_name: "_",
        m_birthdate: "_",
        m_contactno: "_",
        m_email: "_",
        father_name: "_",
        f_birthdate: "_",
        f_contactno: "_",
        f_email: "_",
        emergency_name: "_",
        e_birthdate: "_",
        e_contactno: "_",
        e_email: "_",
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setPatientsData(prev=>({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
     
        axios.get(`http://localhost:4000/api/advancedsearch/${patientsData.last_name}/${patientsData.first_name}/${patientsData.middle_initial}/${patientsData.age}/${patientsData.sex}/${patientsData.birthdate}/${patientsData.nationality}/${patientsData.per_houseno}/${patientsData.per_street}/${patientsData.per_barangay}/${patientsData.per_city}/${patientsData.per_region}/${patientsData.per_zipcode}/${patientsData.curr_houseno}/${patientsData.curr_street}/${patientsData.curr_barangay}/${patientsData.curr_city}/${patientsData.curr_region}/${patientsData.curr_zipcode}/${patientsData.admission_date}/${patientsData.mother_name}/${patientsData.m_birthdate}/${patientsData.m_contactno}/${patientsData.m_email}/${patientsData.father_name}/${patientsData.f_birthdate}/${patientsData.f_contactno}/${patientsData.f_email}/${patientsData.emergency_name}/${patientsData.e_birthdate}/${patientsData.e_contactno}/${patientsData.e_email}`)
        .then(response => {
          setResultsData(response.data);
        })
        .catch(error => {
          console.error('Error fetching patients:', error);
        });
    }

    console.log(resultsData)

  return (
        <>
        <Link to={"/allpatient"}>
        <button className="btn" onClick={handleShow} style={{ color: "white", backgroundColor: '#0077B6' }} type="submit">Advanced Search</button>
        </Link>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="xl">
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>Advanced Search</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form className="mt-4 justify-content-center">
    <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"17px"}}> Input a value to the corresponding text boxes to initiate advanced search. Leave unwanted fields blank. </p>
                </div>
            </Row>
            <hr/>
            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"20px"}}> <strong> Patient Information  </strong> </p>
                </div>
            </Row>
            
      
                <Row className="mb-3 justify-content-center">
                    <div className="form-group col-md-4">
                        <label for="inputFirstName">First Name</label>
                        <input type="text" class="form-control" id="inputFirstName" name='first_name' onChange={handleChange} placeholder="First Name"/>
                    </div>

                    <div className="form-group col-md-3">
                        <label for="inputMI">Middle Name</label>
                        <input type="text" class="form-control" id="inputMI" name='middle_initial' onChange={handleChange} placeholder="Middle Name"/>
                    </div>

                    <div className="form-group col-md-4">
                        <label for="inputLastName">Last Name</label>
                        <input type="text" class="form-control" id="inputLastName" name='last_name' onChange={handleChange} placeholder="Last Name"/>
                    </div>
              </Row>
              <Row className="mb-5 justify-content-center">
                <div className="form-group col-md-3">
                    <label for="inputBirthdate">Birthdate</label>
                    <input type="date" class="form-control" id="inputBirthdate" name='birthdate' onChange={handleChange} />
                </div>
                
                <div className="form-group col-md-3">
                <label for="inputSex">Sex</label>
                <select id="inputSex" class="form-control" name='sex' onChange={handleChange} >
                    <option selected>Select</option>
                    <option value="M" >Male</option>
                    <option value="F" >Female</option>
                </select>
                </div>

                <div className="form-group col-md-2">
                    <label for="inputAge">Age</label>
                    <input type="number" class="form-control" id="inputAge"  name='age' onChange={handleChange} placeholder="Age"/>
                </div>

                <div className="form-group col-md-3">
                    <label for="inputNationality">Nationality</label>
                    <input type="text" class="form-control" id="inputNationality"  name='nationality' onChange={handleChange} placeholder="Nationality"/>
                </div>
                
            </Row>
       

            <Row className="justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"20px"}}> <strong> Permanent Address  </strong> </p>
                </div>
            </Row>
            
            <Row className="mb-5 justify-content-center">
                <div class="form-group col-md-2">
                    <label for="inputPermHouseNo">House No.</label>
                    <input type="text" class="form-control" id="inputPermHouseNo" name='per_houseno' onChange={handleChange}  placeholder="House No."/>
                </div>
                
                <div class="form-group col-md-2">
                    <label for="inputPermStreet">Street</label>
                    <input type="text" class="form-control" id="inputPermStreet" name='per_street' onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermBarangay">Barangay</label>
                    <input type="text" class="form-control" id="inputPermBarangay" name='per_barangay' onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermCity">City</label>
                    <input type="text" class="form-control" id="inputPermCity" name='per_city' onChange={handleChange}  placeholder="City"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputPermRegion">Region</label>
                    <input type="text" class="form-control" id="inputPermRegion" name='per_region' onChange={handleChange}  placeholder="Region"/>
                </div>

                <div class="form-group col-md-1">
                    <label for="inputPermZip">Zip Code</label>
                    <input type="text" class="form-control" id="inputPermZip" name='per_zipcode' onChange={handleChange}  placeholder="Zip"/>
                </div>
                
            </Row>

            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"20px"}}> <strong> Current Address  </strong> </p>
                </div>
            </Row>

            <Row className="mb-5 justify-content-center">
            <div class="form-group col-md-2">
                    <label for="inputCurrHouseNo">House No.</label>
                    <input type="text" class="form-control" id="inputCurrHouseNo" name='curr_houseno' onChange={handleChange}  placeholder="House No."/>
                </div>
                
                <div class="form-group col-md-2">
                    <label for="inputCurrStreet">Street</label>
                    <input type="text" class="form-control" id="inputCurrStreet" name='curr_street' onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrBarangay">Barangay</label>
                    <input type="text" class="form-control" id="inputCurrBarangay" name='curr_barangay' onChange={handleChange}  placeholder="Street"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrCity">City</label>
                    <input type="text" class="form-control" id="inputCurrCity" name='curr_city' onChange={handleChange}  placeholder="City"/>
                </div>

                <div class="form-group col-md-2">
                    <label for="inputCurrRegion">Region</label>
                    <input type="text" class="form-control" id="inputCurrRegion" name='curr_region' onChange={handleChange}  placeholder="Region"/>
                </div>

                <div class="form-group col-md-1">
                    <label for="inputCurrZip">Zip Code</label>
                    <input type="text" class="form-control" id="inputCurrZip" name='curr_zipcode' onChange={handleChange}  placeholder="Zip"/>
                </div>
                
            </Row>
            

            <Row className="mb-2 justify-content-center">
                 <div className="form-group col-md-11">
                    <p style={{fontSize:"20px"}}> <strong> Contacts  </strong> </p>
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
           
  
            
            </form>
    </Modal.Body>
    <Modal.Footer >
        <Link to={`searchpatient/${patientsData.last_name}/${patientsData.first_name}/${patientsData.middle_initial}/${patientsData.age}/${patientsData.sex}/${patientsData.birthdate}/${patientsData.nationality}/${patientsData.per_houseno}/${patientsData.per_street}/${patientsData.per_barangay}/${patientsData.per_city}/${patientsData.per_region}/${patientsData.per_zipcode}/${patientsData.curr_houseno}/${patientsData.curr_street}/${patientsData.curr_barangay}/${patientsData.curr_city}/${patientsData.curr_region}/${patientsData.curr_zipcode}/${patientsData.admission_date}/${patientsData.mother_name}/${patientsData.m_birthdate}/${patientsData.m_contactno}/${patientsData.m_email}/${patientsData.father_name}/${patientsData.f_birthdate}/${patientsData.f_contactno}/${patientsData.f_email}/${patientsData.emergency_name}/${patientsData.e_birthdate}/${patientsData.e_contactno}/${patientsData.e_email}`}>
        <button className="btn" onClick={handleSubmit} style={{color:'white', backgroundColor: "#0077B6"}}>Search</button>
        </Link>
        <button type="submit" onClick={handleClose}  className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AdvancedSearch;

