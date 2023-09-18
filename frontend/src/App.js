import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PatientSummary from './pages/Home/PatientSummary';
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
import AdvanceViewPatient from './pages/AdvanceViewPatient';

import AddPatientContact from './pages/AddPatientContact';
import PatientSummaryPTB from './pages/Home/PatientSummaryPTB';
import PatientSummaryEPTB from './pages/Home/PatientSummaryEPTB';
import PatientSummaryClosed from './pages/Home/PatientSummaryClosed';
import SimilarCases from './pages/SimilarCases';
import UserList from './adminpages/UserList';


function App() {
  return (
      <>
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    
                    <Route path="/adminlabtest" element={<AdminLabTest/>}/>
                    <Route path="/adminhi" element={<AdminHI/>}/>
                    <Route path="/adminbhc" element={<AdminBHC/>}/>
                    <Route path="/bhw/:id" element={<UserList/>}/>
                    <Route path="/hi/:id" element={<HIInfo/>}/>
                    <Route path="/bhc/:id" element={<BHCInfo/>}/>
                    
                    
                    <Route path="/home" element={<PatientSummary/>}/>
                    <Route path="/home1" element={<PatientSummaryPTB/>}/>
                    <Route path="/home2" element={<PatientSummaryEPTB/>}/>
                    <Route path="/home3" element={<PatientSummaryClosed/>}/>



                    <Route path="/patient/:id" element={<PatientInfo/>}/>
                    <Route path="/closecontacts/:id" element={<CloseContacts/>}/>
                    <Route path="/assessment/:id" element={<Assessment/>}/>
                    <Route path="/labtest/:id" element={<LaboratoryTest/>}/>
                    <Route path="/diagnosis/:id" element={<Diagnosis/>}/>
                    <Route path="/treatments/:id" element={<Treatments/>}/>
                    <Route path="/similarcases/:id" element={<SimilarCases/>}/>
                    <Route path="/addpatient" element={<AddPatient/>}/>
                    <Route path="/allpatient" element={<ViewPatient/>}/>
                    
                    <Route path="/case/:id" element={<Case/>}/>
                    <Route path="/allpatient/searchpatient/:lnm/:fnm/:mnm/:age/:sex/:bd/:nt/:phn/:ps/:pb/:pc/:pr/:pz/:chn/:cs/:cb/:cc/:cr/:cz/:ad/:mn/:mb/:mc/:me/:fn/:fb/:fc/:fe/:en/:eb/:ec/:ee" element={<AdvanceViewPatient/>}/>
                    <Route path="/addpatient/:id" element={<AddPatientContact/>}/>
                    
                </Routes>
            </BrowserRouter>
      </>
  );
}

export default App;
