import Modal from 'react-bootstrap/Modal';
import React, {useState, useRef, useEffect} from 'react';
import edit from '../assets/edit.png';
import map from '../assets/map.png';
import { Navbar, Nav, Card, Row, Col  } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import  MarkerClusterGroup  from "react-leaflet-markercluster";
import localforage from 'localforage';
import { MBTiles } from 'leaflet.offline';
import L, { Map } from "leaflet";



function MapMTBRecom() {
   
    // Map Constructor
    // const position = [this.state.lat, this.state.lng];
    const mapRef = useRef()
    // OFFLINE MAP
    // useEffect(() => {
    //     if(mapRef.current){
            
    //         const map = mapRef.current.getLeafletElement();
    //       // @ts-ignore
    //       const tileLayerOffline = L.tileLayer.offline(
    //         "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //         {
    //           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    //           minZoom: 13,
    //         }
    //       );
      
    //       tileLayerOffline.addTo(map);
      
    //       // @ts-ignore
    //       const controlSaveTiles = L.control.savetiles(
    //         tileLayerOffline, 
    //         {
    //           zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
    //         }
    //       );
      
    //       controlSaveTiles.addTo(map);
    //       console.log("MAP SUCCESSFULLY OFFLINE")
    //     }
    // }, [mapRef]);

    useEffect(() => {
      if(mapRef.current){
        const map = mapRef.current.getLeafletElement();
        let mbtiles = new MBTiles('../assets/osm-2020-02-10-v3.11_asia_philippines.mbtiles', {});
        let tileLayer = L.tileLayer.offline(mbtiles);
        tileLayer.addTo(map)
        L.control.savetiles(tileLayer).addTo(map);
      }
    }, [mapRef])


    // MAP SETTERS
    const [center, setCenter] = useState({lat: 14.6091, lng: 121.0223});
    const ZOOM_LEVEL = 15;
    

    // MODAL SETTERS
    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
        <>

        <p className="clickable" onClick={handleShow} style={{color:"black", fontSize:"18px"}} ><strong><u>MTB Test</u></strong></p> 

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg">
            <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
                <Modal.Title> MTB Testing Recommendation </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row className="mt-2">
                    <Col>Recommended Site for Testing:<strong> DLSHSI</strong></Col>
                </Row>
                <Row className="mt-2">
                    <Col>Operating Hours:<strong> Everyday 7:00 AM - 4:00 PM</strong></Col>
                </Row>


                <Row className="mt-4">
                    {/* <img src={map} style={{width:"100%" , opacity:"1"}}/> */}

                    <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[center.lat, center.lng]}>
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Row>

            </Modal.Body>
            <Modal.Footer >
                <button className="btn" onClick={handleClose} style={{color:'white', backgroundColor: "#0077B6"}}>Confirm</button>
            </Modal.Footer>
        </Modal>


    </>
      
  );
}




export default MapMTBRecom;

