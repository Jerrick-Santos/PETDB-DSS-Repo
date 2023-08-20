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
import Login from './adminpages/Login';
import AdminLabTest from './adminpages/AdminLabTest';
import AdminHI from './adminpages/AdminHI';
import AdminBHC from './adminpages/AdminBHC';
import HIInfo from './adminpages/HIInfo';
import BHCInfo from './adminpages/BHCInfo';



function App() {
  return (
      <>
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    
                    <Route path="/adminlabtest" element={<AdminLabTest/>}/>
                    <Route path="/adminhi" element={<AdminHI/>}/>
                    <Route path="/adminbhc" element={<AdminBHC/>}/>
                    <Route path="/hi" element={<HIInfo/>}/>
                    <Route path="/bhc" element={<BHCInfo/>}/>
                    
                    
                    <Route path="/home" element={<PatientSummary/>}/>
                    <Route path="/patient/:id" element={<PatientInfo/>}/>
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
