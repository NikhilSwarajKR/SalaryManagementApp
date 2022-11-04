import React from 'react';
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button'; 
import { useNavigate } from 'react-router-dom';
function Welcome() {
    const navigate = useNavigate();
   return (
      <div className="App">
        <h1>Payroll System!</h1> 

 
    <Stack spacing={20} direction="row">  

      <Button variant="contained"  onClick={() =>navigate('/EmployeeLogin')}>Employee login</Button>  
      <Button variant="contained" onClick={() =>navigate('/adminlogin')}>Admin login</Button> 
      <Button variant="contained" onClick={() =>navigate('/accountantlogin')}>Accountant login</Button>  
    </Stack> 
      </div>
   );
}
export default Welcome;