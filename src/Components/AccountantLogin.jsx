import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {logInWithEmailAndPassword, signInWithGoogle} from "./AccountantAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import NavBar from "./NavBar";
import Button from '@mui/material/Button'; 
import Stack from '@mui/material/Stack';  
import Container from '@mui/material/Container';
function AccountantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  

  return (
    <div>
    <NavBar/>
  <div className="loginpage">
    
 
<Container maxWidth="x1">
  <div className="login">
  < div className="login__container">
  
  <h3> ACCOUNTANT LOGIN </h3>
 
      <input
        type="email"
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
       <Button variant="contained"  size="medium" onClick={() =>logInWithEmailAndPassword(email, password)}
      > <b>Login </b></Button> 
       <Button variant="contained" size="medium"  onClick={signInWithGoogle}> <b> Login with google </b></Button> 
       </Stack> 
      <div>
        <br />
        <Link to="/AccountantReset" className="link"> <b>Forgot Password ? </b></Link>
      </div>
</div>
  </div>
  </Container>
  </div>
  
  </div>
  );
}
export {auth};
export default AccountantLogin;
