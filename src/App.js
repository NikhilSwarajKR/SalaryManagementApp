import React, {useState, useEffect} from 'react';
import ReactDOM  from 'react-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavSidebar from './Components/NavSidebar';
import Teaching from './Components/Teaching';
import Non_Teaching from './Components/Non_Teaching';
import Header from './Components/Header';

function App() {
    
  return (
    <div className="App">
      <NavSidebar/>
    </div>
  );
}

export default App;