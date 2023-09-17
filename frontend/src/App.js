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


import PatientSummaryPTB from './pages/Home/PatientSummaryPTB';
import PatientSummaryEPTB from './pages/Home/PatientSummaryEPTB';
import PatientSummaryClosed from './pages/Home/PatientSummaryClosed';
import SimilarCases from './pages/SimilarCases';
import TestRoute from './pages/TestRoute';
import ProtectedRoute from './ProtectedRoute';
import withAccessControl from './withAccessControl';

{/* admin routes */}
const AdminLabTestwithAccess = withAccessControl(AdminLabTest, ['admin'])
const AdminHIWithAccess = withAccessControl(AdminHI, ['admin']);
const AdminBHCWithAccess = withAccessControl(AdminBHC, ['admin']);
const HIInfoWithAccess = withAccessControl(HIInfo, ['admin']);
const BHCInfowithAccess = withAccessControl(BHCInfo, ['admin'])

{/* BHW routes */}
const PatientSummaryWithAccess = withAccessControl(PatientSummary, ['BHW']);
const PatientSummaryPTBWithAccess = withAccessControl(PatientSummaryPTB, ['BHW']);
const PatientSummaryEPTBWithAccess = withAccessControl(PatientSummaryEPTB, ['BHW']);
const PatientSummaryClosedWithAccess = withAccessControl(PatientSummaryClosed, ['BHW']);

const PatientInfoWithAccess = withAccessControl(PatientInfo, ['BHW']);
const CloseContactsWithAccess = withAccessControl(CloseContacts, ['BHW']);
const AssessmentWithAccess = withAccessControl(Assessment, ['BHW']);
const LaboratoryTestWithAccess = withAccessControl(LaboratoryTest, ['BHW']);
const DiagnosisWithAccess = withAccessControl(Diagnosis, ['BHW']);
const TreatmentsWithAccess = withAccessControl(Treatments, ['BHW']);
const SimilarCasesWithAccess = withAccessControl(SimilarCases, ['BHW']);
const AddPatientWithAccess = withAccessControl(AddPatient, ['BHW']);
const ViewPatientWithAccess = withAccessControl(ViewPatient, ['BHW']);
const CaseWithAccess = withAccessControl(Case, ['BHW']);
const AdvanceViewPatientWithAccess = withAccessControl(AdvanceViewPatient, ['BHW']);


function App() {
  return (
      <>
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />

                    {/* admin routes */}
                    
                    <Route path="/adminlabtest" element={<AdminLabTestwithAccess/>}/>
                    <Route path="/adminhi" element={<AdminHIWithAccess/>}/>
                    <Route path="/adminbhc" element={<AdminBHCWithAccess/>}/>
                    <Route path="/hi/:id" element={<HIInfoWithAccess/>}/>
                    <Route path="/bhc/:id" element={<BHCInfowithAccess/>}/>


                    {/* BHW routes */}
                    <Route path="/home"  element={<PatientSummaryWithAccess/>}/>
                    <Route path="/home1" element={<PatientSummaryPTBWithAccess/>}/>
                    <Route path="/home2" element={<PatientSummaryEPTBWithAccess/>}/>
                    <Route path="/home3" element={<PatientSummaryClosedWithAccess/>}/>



                    <Route path="/patient/:id" element={<PatientInfoWithAccess/>}/>
                    <Route path="/closecontacts/:id" element={<CloseContactsWithAccess/>}/>
                    <Route path="/assessment/:id" element={<AssessmentWithAccess/>}/>
                    <Route path="/labtest/:id" element={<LaboratoryTestWithAccess/>}/>
                    <Route path="/diagnosis/:id" element={<DiagnosisWithAccess/>}/>
                    <Route path="/treatments/:id" element={<TreatmentsWithAccess/>}/>
                    <Route path="/similarcases/:id" element={<SimilarCasesWithAccess/>}/>
                    <Route path="/addpatient" element={<AddPatientWithAccess/>}/>
                    <Route path="/allpatient" element={<ViewPatientWithAccess/>}/>
                    
                    <Route path="/case/:id" element={<CaseWithAccess/>}/>
                    <Route path="/allpatient/searchpatient/:lnm/:fnm/:mnm/:age/:sex/:bd/:nt/:phn/:ps/:pb/:pc/:pr/:pz/:chn/:cs/:cb/:cc/:cr/:cz/:ad/:mn/:mb/:mc/:me/:fn/:fb/:fc/:fe/:en/:eb/:ec/:ee" element={<AdvanceViewPatientWithAccess/>}/>
                    <Route path="/addpatient/:id" element={<AddPatientWithAccess/>}/>

                    <Route path="/test" element={<TestRoute/>}/>
                    
                </Routes>
            </BrowserRouter>
      </>
  );
}

export default App;
