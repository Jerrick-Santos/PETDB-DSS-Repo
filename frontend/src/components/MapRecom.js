import Modal from 'react-bootstrap/Modal';
import React, {useState, useRef, useEffect} from 'react';
import edit from '../assets/edit.png';
import map from '../assets/map.png';
import { Navbar, Nav, Card, Row, Col, Badge  } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import  MarkerClusterGroup  from "react-leaflet-markercluster";
import localforage from 'localforage';
import { MBTiles } from 'leaflet.offline';
import L, { Map } from "leaflet";
import axios from 'axios';


function MapRecom(props) {
    
    const mapRef = useRef()

    // Caching loaded tiles online to local storage (offline)
    useEffect(() => {
      if(mapRef.current){
        const map = mapRef.current.getLeafletElement();
        let mbtiles = new MBTiles('../assets/osm-2020-02-10-v3.11_asia_philippines.mbtiles', {});
        let tileLayer = L.tileLayer.offline(mbtiles);
        tileLayer.addTo(map)
        L.control.savetiles(tileLayer).addTo(map);
      }
    }, [mapRef])

    // Loading coordinate data
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


    const [center, setCenter] = useState({});
    const ZOOM_LEVEL = 15;
    const [locations, setLocations] = useState([])
    const [mapLoaded, setMapLoaded] = useState(false)
    

    // MODAL SETTERS
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
        <>

        <p className="clickable" onClick={handleShow} style={{color:"black", fontSize:"18px"}} ><strong><u>{props.test_name} Test</u></strong></p> 

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg">
            <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
                <Modal.Title> {props.test_name} Testing Recommendation </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                {locations && locations.map((hi, index) => {
                    if (hi.isClosest) {
                        return (
                            <>
                                <Row className="mt-2">
                                    <Col><Badge bg='secondary'> Name: </Badge> {hi.HIName} </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col><Badge bg='secondary'> Operating Hours: </Badge> {hi.HIOperatingHours} </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col><Badge bg='secondary'> Contact Number: </Badge> {hi.HIContactNumber} </Col>
                                </Row>
                                <Row className="mt-2">
                                    
                                    <Col><Badge bg='secondary'> Email Address: </Badge> {hi.HIEmailAddress} </Col>
                                </Row>
                            </>
                        )
                    }
                })}

                <Row className="mt-4">
                    {/* <img src={map} style={{width:"100%" , opacity:"1"}}/> */}

                    {mapLoaded && center && (
                        <MapContainer center={[center.XCoord, center.YCoord]} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
                            
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                
                            />

                            {locations.length > 0 && locations.map((hi, index) => {
                                
                                return (
                                    <Marker position = {[hi.XCoord, hi.YCoord]} key={index}>
                                        <Popup>
                                            {hi.HIName} <br />
                                            {hi.HIOperatingHours}
                                        </Popup>
                                    </Marker>
                                )

                            })}

                            <Marker style={{ opacity: 1 }} position={[center.XCoord, center.YCoord]}>
                                <Popup>
                                    <strong>{center.BGYName}</strong>
                                </Popup>
                            </Marker>

                        </MapContainer>
                    )}
                </Row>

            </Modal.Body>
            <Modal.Footer >
                <button className="btn" onClick={handleClose} style={{color:'white', backgroundColor: "#0077B6"}}>Confirm</button>
            </Modal.Footer>
        </Modal>


    </>
      
  );
}




export default MapRecom;

