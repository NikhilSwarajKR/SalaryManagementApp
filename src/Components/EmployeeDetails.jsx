import React, { useState,useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Outlet } from "react-router-dom";


export default function EmployeeDetails() {
  const navigate = useNavigate();
  const data=JSON.parse(localStorage.getItem('RefEmpData'));
  const navigateGenerationSlip=()=>{
    navigate('GenerateSalarySlip');
  }
  return (
    <div className='rendering'>
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
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
        <div className="class">
          <Button onClick={navigateGenerationSlip}>Generate Salary Slip</Button>
          <Outlet />
        </div>
      </Box>
    </div>
  )
}
