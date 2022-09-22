import React, {useState, useEffect} from 'react';
import db from './firebase';
import ReactDOM  from 'react-dom';
import {collection, getDocs} from 'firebase/firestore';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavSidebar from './Components/NavSidebar';

function App() {
    
  return (
    <div className="App">
      <NavSidebar/>

    </div>
  );
}

export default App;