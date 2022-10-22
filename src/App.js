import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Teaching from './Components/Teaching';
import NonTeaching from './Components/NonTeaching';
import Header from './Components/Header';
import SalarySlipGeneration from './Components/SalarySlipGeneration';

function App() {
    
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path='/Teaching' element={<Teaching/>}/>
        <Route exact path='/NonTeaching' element={<NonTeaching/>}/>
        <Route exact path='/SalarySlipGeneration/' element={<SalarySlipGeneration/>}></Route>
      </Routes> 
    </div>
  );
}

export default App;