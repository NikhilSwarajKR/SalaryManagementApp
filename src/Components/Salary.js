import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./Salary";
import {Routes, Route ,Link} from "react-router-dom";




function Salary() {
  const [user, loading, error] = useAuthState(auth);

 const[pf,setpf]=useState("");
 const[emp_id,setemp_id]=useState("");
 const[basic,setbasic]=useState("");
 const[da,setda]=useState("");
 const[ta,setta]=useState("");
 const[gross_sal,setgross_sal]=useState("");
 const[hra,sethra]=useState("");
 const[net_sal,setnet_sal]=useState("");


  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "transactions"), where("uid", "==", user?.uid));
      //const q1 = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setpf(data.pf);  
      setemp_id(data.emp_id); 
      setbasic(data.basic);
      setda(data.da);
      setta(data.ta);
      setgross_sal(data.gross_sal);
      sethra(data.hra);
      setnet_sal(data.net_sal);
      //setyoep(data.yoep);
      
      
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
       <u> Salary details</u>
       
        <br></br>
       
     <div> Employee ID:       {emp_id}</div>
     <div>Basic pay:           {basic}</div>
     <div>DA: {da} </div>
     <div>HRA: {hra}</div>
     <div>TA: {ta} </div>
     <div> PF:              {pf}</div>
     <div>Gross salary: {gross_sal} </div>
     
     <div>Net salary: {net_sal}</div>

       <br></br> 

        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      
    </div>

    </div>
  );
}

export default Salary;
