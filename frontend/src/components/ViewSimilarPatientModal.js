import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import add from '../assets/add.png';
import axios from 'axios';
import { Navbar, Nav, Card, Row, Col, ModalBody  } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';

function ViewSimilarPatientModal(props) {

    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function calculateAge(birthdate) {
        const birthDate = new Date(birthdate);
        const currentDate = new Date();
    
        const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
        const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
        const daysDiff = currentDate.getDate() - birthDate.getDate();
    
        let age = yearsDiff;
    
        if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
            age--;
        }
    
        return age;
    }
    
    return (
        <>
            {props.visible && (
                <button className="btn" style={{ color: "white", backgroundColor: 'red', width: "50%", marginRight: "25%", marginLeft: "25%"}} type="button" onClick={handleShow}>
                <img src={add} className="me-1 mb-1" style={{height:"20px"}}/> Possible existing patient detected…
                </button>
            )}
            
            <Modal show={show} onHide={handleClose} backdrop={ 'static' } size="lg" >
                <Modal.Header style={{color:'white', backgroundColor: "#0077B6"}}>
                    <Modal.Title>View Similar Patients</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <Form>
                    <table className="table caption-top bg-white rounded mt-4 ms-4 me-5" style={{width:"95%"}}>
                        <caption className=' fs-4' style={{ color:'#0077B6'}}>View Similar Patients</caption>
                        <thead>
                            <tr>
                                <th scope="col">Select</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Birthdate</th>
                                <th scope="col">Age</th>
                                <th scope="col">Sex</th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.patients.map((patient, index) => {
                                console.log("SIMILAR PATIENT[", index, "]", patient);
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Form.Check 
                                                name= {`select_${index}`}
                                                type= 'radio'
                                                id= {`select_${index}`}
                                                value= {index}
                                                onChange={() => props.setSelectedPatientIndex(index)}  
                                            />
                                        </td>
                                        <td>{`${patient.last_name}, ${patient.first_name} ${patient.middle_initial}`}</td>
                                        <td>{new Date(patient.birthdate).toLocaleDateString()}</td>
                                        <td>{calculateAge(patient.birthdate)}</td>
                                        <td>{patient.sex}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Form>

                <div style={{ height: '350px' }}/>

                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={handleClose} className="btn btn-secondary">Apply</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewSimilarPatientModal