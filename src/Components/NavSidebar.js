import React,{useState, useEffect} from 'react'
import db from '../firebase';
import {collection, query, getDocs} from 'firebase/firestore';
import './NavSidebar.css';
import ReactDOM  from 'react-dom';
export default function 
() { 
  ReactDOM.render('<table><th><tr>Name</tr><tr>Years Of Experience</tr><tr>Department-ID</tr></th>');
  const [Teachers,setTeachers]=useState([]);
  const fetchTeachers=async()=>{
  const data= await getDocs(collection(db, "employees"));
  data.forEach(item=>{
    console.log(item.id);
    console.log(item.data().name);
    console.log(item.data().YOE);
    console.log(item.data().DOJ);
    console.log(item.data().department.id);
    ReactDOM.render('<tr><td>{item.data().name}</td><td>{item.data().YOE}</td><td>{item.data().department.id}</td></tr>');
  })
  };
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light">
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
        <div className="sidebar bg-light">
          <div className="options">
              <button className="side-item text-primary">Teaching Staffs</button>
              <button className="side-item text-primary">Non-Teaching Staffs</button>
              <button className="side-item text-primary"> Generate Report</button>
          </div>

              

        </div>


        
    </div>
  )
}


