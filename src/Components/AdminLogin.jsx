import React, { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { auth} from "../firebase";
import {logout,logInWithEmailAndPassword, signInWithGoogle} from "./AdminAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar";
import "./Login.css";
import Button from '@mui/material/Button'; 
import Stack from '@mui/material/Stack';  
import Container from '@mui/material/Container';
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  

  return (
    <div>
      <NavBar/>
    <div className="root">
      
   
<Container maxWidth="x1">
    <div className="login">
    < div className="login__container">
    
    <h3> Admin login </h3>
   
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          required
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
            
    <Stack spacing={3} direction="column">  
         <Button variant="contained" size="medium" onClick={() =>logInWithEmailAndPassword(email, password)}
        > <b>Login </b></Button> 
         <Button variant="contained" size="medium" onClick={signInWithGoogle}> <b> Login with google </b></Button> 
         </Stack> 
        <div>
          <Link to="/Adminreset"> <b>Forgot Password ? </b></Link>
        </div>
  </div>
    </div>
    </Container>
    </div>
    
    </div>
  );
}

export default AdminLogin;
