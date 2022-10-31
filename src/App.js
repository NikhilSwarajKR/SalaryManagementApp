import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Teaching from './Components/Teaching';
import NonTeaching from './Components/NonTeaching';
import Header from './Components/Header';
import EmployeeDetails from './Components/EmployeeDetails';
import GenerateSalarySlip from './Components/GenerateSalarySlip';

function App() {
    
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path='/Teaching' element={<Teaching/>}/>
        <Route exact path='/NonTeaching' element={<NonTeaching/>}/>
        <Route exact path='/EmployeeDetails' element={<EmployeeDetails/>}>
          <Route exact path='GenerateSalarySlip' element={<GenerateSalarySlip/>}></Route>
        </Route>
        
      </Routes> 
    </div>
  );
}

export default App;