import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import edit from '../assets/edit.png';
import xray from '../assets/xray.png';


function AddXrayModal() {
   
    const[show,setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
        <>

        <button className="btn" onClick={handleShow}> Add XRay </button>

        <Modal show={show} onHide={handleClose} backdrop={ 'static' } >
    <Modal.Header  style={{color:'white', backgroundColor: "#0077B6"}}>
        <Modal.Title>  Add Xray Results  </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div>
            <label><strong> Upload Xray File Attachment:</strong></label>
            <input type="file" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Issued by: </strong></label>
            <select className="form-select">
                <option value="">Select</option>
                <option value="positive">DLSHSI</option>
                <option value="negative">Hospital 1</option>
                <option value="inconclusive">Hospital 2</option>
            </select>
        </div>
        <div className="mt-3">
            <label><strong>Issued on:</strong></label>
            <input type="date" className="form-control" />
        </div>
        <div className="mt-3">
            <label><strong>Reference Number:</strong></label>
            <input type="text" className="form-control" />
        </div>
        <div className="mt-3"> 
            <label> <strong>Xray Results: </strong></label>
            <select className="form-select">
                <option value="">Select</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="inconclusive">Inconclusive</option>
            </select>
        </div>
    </Modal.Body>
    <Modal.Footer >
        <button className="btn" style={{color:'white', backgroundColor: "#0077B6"}}>Save</button>
        <button type="submit" onClick={handleClose} className="btn btn-secondary">Close</button>
    </Modal.Footer>
</Modal>


    </>
      
  );
}




export default AddXrayModal;

