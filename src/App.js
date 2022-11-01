import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Teaching from './Components/Teaching';
import NonTeaching from './Components/NonTeaching';
import Header from './Components/Header';
import EmployeeDetails from './Components/EmployeeDetails';
import GenerateSalarySlip from './Components/GenerateSalarySlip';
import EmployeeReports from './Components/EmployeeReports';
import AllReports from './Components/AllReports';

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
        <Route exact path='Reports'element={<AllReports/>}></Route>
      </Routes> 
    </div>
  );
}

export default App;