import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Teaching from './Components/admin/Teaching';
import NonTeaching from './Components/admin/NonTeaching';
import Header from './Components/admin/Header';
import EmployeeDetails from './Components/admin/EmployeeDetails';
import GenerateSalarySlip from './Components/admin/GenerateSalarySlip';
import EmployeeReports from './Components/admin/EmployeeReports';
import AllReports from './Components/admin/AllReports';
import ViewReport from './Components/admin/ViewReport';

function App() {
    
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path='/Teaching' element={<Teaching/>}/>
        <Route exact path='/NonTeaching' element={<NonTeaching/>}/>
        <Route exact path='/EmployeeDetails' element={<EmployeeDetails/>}>
            <Route exact path='GenerateSalarySlip' element={<GenerateSalarySlip/>}></Route>
            <Route exact path='EmployeeReports' element={<EmployeeReports/>}></Route>
        </Route>
        <Route exact path='Reports' element={<AllReports/>}></Route>
        <Route exact path='ViewReport' element={<ViewReport/>}></Route>
      </Routes>
    </div>
  );
}

export default App;