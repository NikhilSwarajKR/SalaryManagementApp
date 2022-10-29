import React from 'react';
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button'; 
import { useNavigate } from 'react-router-dom';
function Welcome() {
    const navigate = useNavigate();
   return (
      <div className="App">
         Hello World !

 
    <Stack spacing={20} direction="row">  

      <Button variant="contained"  onClick={() =>navigate('/login')}>Employee login</Button>  
      <Button variant="contained" onClick={() =>navigate('/adlogin')}>Admin login</Button> 
      <Button variant="contained" onClick={() =>navigate('/aclogin')}>Accountant login</Button>  
    </Stack> 
      </div>
   );
}
export default Welcome;