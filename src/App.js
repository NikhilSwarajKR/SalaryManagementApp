import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Teaching from './Components/accountant/Teaching';
import NonTeaching from './Components/accountant/NonTeaching';
import AccountantHeader from './Components/accountant/AccountantHeader';
import EmployeeDetails from './Components/accountant/EmployeeDetails';
import GenerateSalarySlip from './Components/accountant/GenerateSalarySlip';
import EmployeeReports from './Components/accountant/EmployeeReports';
import AllReports from './Components/accountant/AllReports';
import ViewReport from './Components/accountant/ViewReport';

function App() {
    
  return (
    <div className="App">
      <AccountantHeader/>
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