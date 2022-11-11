import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import {Outlet } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import SummarizeIcon from '@mui/icons-material/Summarize';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';


export default function EmployeeDetails() {
  const navigate = useNavigate();
  const data=JSON.parse(localStorage.getItem('RefEmpData'));
  return (
    <div className='rendering'>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/" >Home</Link>
        <Link underline="hover" key="2" color="inherit" >Employees</Link>
        <Link underline="hover" key="3" color="inherit" href="/EmployeeDetails" >Employee Details</Link>
    </Breadcrumbs>
    <div className='rendering'>
       
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '30ch' },
        }}
        >
        
        <div>
          <TextField
              id="filled-read-only-input"
              label="Employee ID"
              defaultValue={data.empID.toUpperCase()}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
          <TextField
            id="filled-read-only-input"
            label="Employee Name"
            defaultValue={data.firstName+" "+data.lastName}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <TextField
            id="filled-read-only-input"
            label="Qualification"
            defaultValue={data.qualification}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
           <TextField
            id="filled-read-only-input"
            label="Designation"
            defaultValue={data.designation}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <TextField
            id="filled-read-only-input"
            label="Department"
            defaultValue={data.deptName}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <TextField
            id="filled-read-only-input"
            label="Date Of Joining"
            defaultValue={new Date(data.doj.seconds*1000).toLocaleDateString('en-IN')}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
         
         <TextField
            id="filled-read-only-input"
            label="Previous Experince Period"
            defaultValue={data.pre_yoe.years+" Years and "+data.pre_yoe.months+" months"}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
        </div>
      </Box>
     
      <BottomNavigation showLabels>
          <BottomNavigationAction label="Generate Salary Slip" onClick={()=> navigate('GenerateSalarySlip')} icon={<NoteAddIcon/>} />
          <BottomNavigationAction label="Reports"  onClick={()=> navigate('EmployeeReports')} icon={<SummarizeIcon/>} />
      </BottomNavigation>
      

      <Outlet/>
    </div>
    </div>
  )
}
