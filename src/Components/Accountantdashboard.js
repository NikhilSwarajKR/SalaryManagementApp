import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db } from "../firebase";

import { query, collection, getDocs, where } from "firebase/firestore";
import {Routes, Route ,Link} from "react-router-dom";
import Button from '@mui/material/Button'; 
import {logout} from "./AccountantAuth";



function Acdashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
 const[qualification,setqualification]=useState("");

  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "accountant"), where("uid", "==", user?.uid));
      //const q1 = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
      setqualification(data.qualification);
      
      
    } catch (err) {
      console.error(err);
      //alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
       <u> Accontant Profile details</u> <br></br>
       <div>Name: {name}</div>
        <div>Email: {user?.email}</div>
        
        
        <br>
        
        </br>
        <Button variant="contained"  onClick={() =>navigate('/GenerateSalarySlip')}>proceed </Button> 

       
<br>

</br>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      
    </div>

    </div>
  );
}

export default Acdashboard;
