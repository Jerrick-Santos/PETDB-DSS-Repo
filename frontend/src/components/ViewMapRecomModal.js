import Modal from 'react-bootstrap/Modal';
import React, {useState, useRef, useEffect} from 'react';
import { Row, Col, Accordion, Badge  } from 'react-bootstrap';
import axios from 'axios';
import MapRecom from './MapRecom';

function ViewMapRecomModal(props) {

    // MODAL SETTERS
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // state variables
    const [locations, setLocations] = useState([])
    const [mapLoaded, setMapLoaded] = useState(false)
    const [center, setCenter] = useState({});

    // load data
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage.');
            return;
        }

        // Define headers with the JWT token
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios.get(`http://localhost:4000/api/loadLocations/${props.test}`, { headers })
            .then(res => {
                const { res1, res2 } = res.data
                setLocations(res2)
                setCenter(res1)
                setMapLoaded(true)
                console.log("reached")
            })
            .catch(err => {
                console.error(err);
            })
    }, [props.test])

    useEffect(() => {
        console.log('lcoations successfully loaded')
        console.log(locations)
    }, [locations])

  return (
    <>

        <p className="clickable" onClick={handleShow} style={{color:"black", fontSize:"18px"}} ><strong><u>{props.test_name}</u></strong></p> 

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="xl">
            <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
                <Modal.Title>  Health Institute Recommendations </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <Col><p>** - Recommended health institution by distance</p></Col>
                    <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
                        <caption className=' fs-4' style={{ color:'#0077B6'}}>Nearby Health Institutions for {props.test_name} Test</caption>
                        
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Operating Hours</th>
                                <th scope="col">Address</th>
                                <th scope="col">Contact Information</th>
                                <th scope="col">Price</th>
                                <th scope="col">Accepts Vouchers?</th>
                                {/** address format: Unit x,  */}
                            </tr>
                        </thead>
                        <tbody>
                        {locations.map((hi, index) => (
                            <tr key={index}>
                                <td>{index == 0 ? `** ${hi.HIName}` : hi.HIName}</td>
                                <td>{hi.HIOperatingHours}</td>
                                <td>{`Unit ${hi.HIUnitNo}, ${hi.HIStreet}, ${hi.municipality_name}, ${hi.province_name}`}</td>

                                {hi.HIContactPerson || hi.HIContactNumber || hi.HIEmailAddress ? (
                                    <Accordion defaultActiveKey="0">
                                    <Accordion.Item>
                                        <Accordion.Header>Contact Details</Accordion.Header>
                                        <Accordion.Body>
                                            {hi.HIContactPerson ? (
                                            <Row>
                                                <Badge bg='secondary'>Name</Badge> {hi.HIContactPerson}
                                            </Row>
                                            ) : null}

                                            {hi.HIContactNumber ? (
                                            <Row>
                                                <Badge bg='secondary'>Number</Badge> {hi.HIContactNumber}
                                            </Row>
                                            ) : null}

                                            {hi.HIEmailAddress ? (
                                            <Row>
                                                <Badge bg='secondary'>Email</Badge> {hi.HIEmailAddress}
                                            </Row>
                                            ) : null}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    </Accordion>
                                ) : ( 
                                    "No Information Available"
                                )}

                                <td>{hi.Price}</td>
                                <td>{hi.AcceptingVoucher == 1 ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                

            </Modal.Body>
            <Modal.Footer >
            <MapRecom center={center} locations={locations} test_name={props.test_name}/>    
                
                <button className="btn" onClick={handleClose} style={{color:'white', backgroundColor: "#0077B6"}}>Confirm</button>
            </Modal.Footer>
        </Modal>


    </>
      
  );
}




export default ViewMapRecomModal;

