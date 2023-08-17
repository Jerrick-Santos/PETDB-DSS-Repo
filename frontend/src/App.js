import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PatientSummary from './pages/PatientSummary';
import PatientInfo from './pages/PatientInfo'
import Assessment from './pages/Assessment';
import CloseContacts from './pages/CloseContacts'
import Treatments from './pages/Treatments'
import AddPatient from './pages/AddPatient';



function App() {
  return (
      <>
      <BrowserRouter>
                <Routes>
                    <Route path="/patientinfo" element={<PatientInfo/>}/>
                    <Route path="/" element={<PatientSummary/>} />
                    <Route path="/closecontacts" element={<CloseContacts/>}/>
                    <Route path="/assessment" element={<Assessment/>}/>
                    <Route path="/treatments" element={<Treatments/>}/>
                    <Route path="/addpatient" element={<AddPatient/>}/>
                    
                </Routes>
            </BrowserRouter>
      </>
  );
}

export default App;
