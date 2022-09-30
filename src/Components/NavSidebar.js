import React,{ Component } from 'react';
import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";
import Teaching from './Teaching';
import Non_Teaching from './Non_Teaching';
import './NavSidebar.css';

export default class NavSidebar extends Component{
  render() {
    return (
        <div>
        <nav className="navbar bg-light" >
            <div className="container-fluid">
                <h6 className="navbar-brand text-primary" href="#">Salary Management App</h6>
            </div>
            <div class="btn-group dropdown">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Account</button>
                <ul className="dropdown-menu ">
                    <li><a className="dropdown-item" href="#">Acount Settings</a></li>
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
            </div>
        </nav>
        <Router>
            <div className="sidebar">
            <div className="options bg-light">
                <p className="side-item text-primary"><Link to="/n1">Teaching</Link></p>
                <p className="side-item text-primary"><Link to="/n2">Non Teaching</Link></p>
            </div>
            </div>
            <Routes>
                <Route exact path='/n1' element={<Teaching/>}></Route>
                <Route exact path='/n2' element={<Non_Teaching/>}></Route>
            </Routes>
        </Router>   
    </div>   
    )
  }
}