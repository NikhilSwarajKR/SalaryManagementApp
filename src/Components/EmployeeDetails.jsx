import React, { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import {db,storage} from './../firebase';
import {collection, query, onSnapshot,where} from 'firebase/firestore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function EmployeeDetails() {
  const location= useLocation();
  const empID=location.state.empID;
  const [data,setData]=useState([]);
  const navigate = useNavigate();

  
  return (
    <div>
      <h1>{empID}</h1>
      <Button onClick={() => navigate('/GenerateSalarySlip',{state:{empID:location.state.empID,department:location.state.department,pre_yoe:location.state.pre_yoe,qualification:location.state.qualification,designation:location.state.designation,doj:location.state.doj,basic:location.state.basicPay}})}>Generate Salary Slip</Button>
     
    </div>

  )
}
