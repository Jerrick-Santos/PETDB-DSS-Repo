import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PatientSummary from './pages/PatientSummary';
import PatientInfo from './pages/PatientInfo'
import Assessment from './pages/Assessment';
import CloseContacts from './pages/CloseContacts'
import Treatments from './pages/Treatments'
import AddPatient from './pages/AddPatient';
import ViewPatient from './pages/ViewPatient';
import Case from './pages/Case';
import LaboratoryTest from './pages/LaboratoryTest';
import Diagnosis from './pages/Diagnosis';



function App() {
  return (
      <>
      <BrowserRouter>
                <Routes>
                    <Route path="/patient/:id" element={<PatientInfo/>}/>
                    <Route path="/" element={<PatientSummary/>} />
                    <Route path="/closecontacts/:id" element={<CloseContacts/>}/>
                    <Route path="/assessment/:id" element={<Assessment/>}/>
                    <Route path="/labtest/:id" element={<LaboratoryTest/>}/>
                    <Route path="/diagnosis/:id" element={<Diagnosis/>}/>
                    <Route path="/treatments/:id" element={<Treatments/>}/>
                    <Route path="/addpatient" element={<AddPatient/>}/>
                    <Route path="/allpatient" element={<ViewPatient/>}/>
                    <Route path="/case/:id" element={<Case/>}/>
                    
                </Routes>
            </BrowserRouter>
      </>
  );
}

export default App;
