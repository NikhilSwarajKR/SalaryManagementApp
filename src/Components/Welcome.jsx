import React from 'react';
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button'; 

import "./Welcome.css";
import { useNavigate } from 'react-router-dom';
function Welcome() {
    const navigate = useNavigate();
   return (
      
        <div className="App">
      <header>
        <h1>Salary Management System</h1>
        <hr className="Underline" />
        
      </header>
       
<br> 
</br>
 
    <Stack spacing={20} direction="row">  
 
      <Button variant="contained" onClick={() =>navigate('/AdminLogin')}>Admin login</Button> 
      <Button variant="contained" onClick={() =>navigate('/AccountantLogin')}>Accountant login</Button> 
      <Button variant="contained"  onClick={() =>navigate('/EmployeeLogin')}>Employee login</Button>  
    </Stack> 
    <div className="Film"></div>
      </div>
       
   );
}
export default Welcome;