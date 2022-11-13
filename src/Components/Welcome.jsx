import React from 'react';
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button'; 

import "./Welcome.css";
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
function Welcome() {
    const navigate = useNavigate();
   return (
        <div className="welcomebody"> 
          <NavBar/>
          <div className="welcome">
            <Stack spacing={20} direction="row">  
              <Button variant="contained" onClick={() =>navigate('/AdminLogin')}>Admin login</Button> 
              <Button variant="contained" onClick={() =>navigate('/AccountantLogin')}>Accountant login</Button> 
              <Button variant="contained"  onClick={() =>navigate('/EmployeeLogin')}>Employee login</Button>  
            </Stack>
          </div>
        </div>
   );
}
export default Welcome;