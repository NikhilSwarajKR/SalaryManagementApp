import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "./../firebase";
import {sendPasswordReset} from "./AccountantAuth";
import "./Reset.css";
import Button from '@mui/material/Button'; 
import Stack from '@mui/material/Stack';  
import NavBar from "./NavBar";
function AccountantReset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  return (
    <div>
     <NavBar/>
    <div className="root">
      <div className="reset">
        <div className="reset__container">
          <input
            type="text"
            className="reset__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
        
          <Stack spacing={3} direction="column">  
          <Button variant="contained"  onClick={() => sendPasswordReset(email)}
          > Send password reset email</Button> 
          
          </Stack> 
        
        </div>
      </div>
    </div>
   </div>
  );
}

export default AccountantReset;