import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AccountantHeader from './Components/accountant/AccountantHeader';
import AdminHeader from './Components/admin/AdminHeader';


function App() {
    
  return (
    <div className="App">
      <AdminHeader/>
    </div>
  );
}

export default App;