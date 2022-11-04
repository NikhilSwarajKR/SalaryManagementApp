import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db} from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {Routes, Route ,Link} from "react-router-dom";
import Button from '@mui/material/Button'; 

import {logout} from "./AdminAuth";


function Addashboard() {
  const [admin, loading, error] = useAuthState(auth);
  
 

  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "admin"), where("uid", "==", "admin?.uid"));
      //const q1 = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      
    
      
      
    } catch (err) {
      console.error(err);
      //alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!admin) return navigate("/");
    
    fetchUserName();
  }, [admin, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
       <u> Admin Page</u> <br></br>
    
    
        
        <br>
        
        </br>
        <Button variant="contained"  onClick={() =>navigate('/addemp')}>Add new Employee</Button> 

       
<br>

</br>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      
    </div>

    </div>
  );
}

export default Addashboard;
