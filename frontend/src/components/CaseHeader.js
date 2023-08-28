import React from 'react'
import { Link } from 'react-router-dom'

const CaseHeader = (props) => {

    const [patientData, setPatientData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/getCasePatient/${props.caseNum}`)
        .then(res => {
            console.log(res)
            setPatientData(res.data[0])
        })
        .catch(err => {
            console.error(err)
        })
    }, [props.caseNum])


    return (
        <Row className="mt-5 justify-content-center" style={{ color:'black'}}>
            <Col className="ms-5" lg="12">
                <Row>
                    <Col><strong>Case No: {patientData.case_refno}</strong></Col>
                </Row>

                <Row>
                    <Col><strong>Patient Name: {patientData.patient_name}</strong></Col>
                </Row>

                <Row>
                    <Col><strong>Case Start Date: {patientData.start_date}</strong></Col>
                </Row>

                <Row>
                    <Col><strong>Case End Date: {patientData.end_date ? patientData.end_date : "Ongoing"}</strong></Col>
                </Row>

                <Row>
                    <Col><strong>Presumptive ID: {patientData.presumptive_id}</strong></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CaseHeader