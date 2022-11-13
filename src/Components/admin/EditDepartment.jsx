import React,{useState, useEffect} from 'react';
import {db,storage} from '../../firebase';
import {setDoc,doc} from 'firebase/firestore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useNavigate} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import AdminHeader from './AdminHeader';


function EditDepartment() {
  const navigate = useNavigate();
  var refDeptData=JSON.parse(localStorage.getItem('RefDeptData'));
  var deptCatData=JSON.parse(localStorage.getItem('DeptCatData'));
  
  const handleEdit=async()=>{
    var deptID=document.getElementById('deptID').value.toLowerCase();
    var deptName=document.getElementById('deptName').value;
    var deptCat=document.getElementById('deptCat').value;
    try{
      await setDoc(doc(db, "departments", deptID), {
        dept_name: deptName,
        dept_cat: deptCat,
      });
    }
    catch(err){
      alert(err)
    }
   
    navigate('/Departments');
  }
  return (
    <div>
      <AdminHeader/>
      <div className='rendering'>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/AdminProfile" >Home</Link>
        <Link underline="hover" key="2" color="inherit" href="/Departments" >Departments</Link>
        <Link underline="hover" key="3" color="inherit" href="/EditDepartment" >Edit Department</Link>
    </Breadcrumbs>
    <div className='rendering'>
      <Box  component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '30ch' },
        }}>
          
          <div className="input-group mb-3">
            <span className="input-group-text" >Department ID &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="text" className="form-control" disabled id="deptID" label="Department ID" defaultValue={refDeptData.deptID.toUpperCase()} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Department Name</span>
            <input type="text" className="form-control" pattern="^[a-zA-Z_ ]*$"required id="deptName" label="Department Name" defaultValue={refDeptData.deptName} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Department Category </span>
            <select required  className="form-select" id='deptCat' defaultValue={refDeptData.catID} >
              <option disabled>Select Category</option>
              {deptCatData.map((cat)=>(
                <option key={cat.catID} value={cat.catID}>{cat.type}</option>
              ))} 
            </select>
          </div>
          <div>
              <Button className="rounded mx-auto d-block"  onClick={handleEdit} variant="contained">Edit</Button>
          </div>
      </Box>
    
    </div>
  </div>
    </div>
  )
}

export default EditDepartment