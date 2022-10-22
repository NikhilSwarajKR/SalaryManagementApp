import React from 'react';
import {Routes, Route ,Link} from "react-router-dom";
import Teaching from './Teaching';
import NonTeaching from './NonTeaching';
import './Styles/NavSidebar.css';
import SalarySlipGeneration from './SalarySlipGeneration';


export default function NavSidebar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" >
                <div className="container-fluid">
                    <h4 className="navbar-brand text-primary">Salary Management App</h4>
                </div>
                <div className="btn-group dropdown ">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Account</button>
                    <ul className="dropdown-menu ">
                        <li><a className="dropdown-item" href="#">Acount Settings</a></li>
                        <li><a className="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </div>
            </nav>
            
                <div className="sidebar">
                <div className="options bg-dark">
                    <p className="side-item"><Link to="/n1"style={{ textDecoration: 'none' }}>Teaching</Link></p>
                    <p className="side-item"><Link to="/n2"style={{ textDecoration: 'none' }}>Non Teaching</Link></p>
                </div>
                </div>           
                <Routes>
                    <Route exact path='/n1' element={<Teaching/>}/>
                    <Route exact path='/n2' element={<NonTeaching/>}/>
                    <Route exact path='/GenerateSalarySlip/:user_id' element={<SalarySlipGeneration/>}/>
                </Routes>            
        </div>   
    )
}


