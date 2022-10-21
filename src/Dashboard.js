import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { Link } from "react-router-dom";


function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
 // const [name, setName] = useState("");
 const[qualification,setqualification]=useState("");
 const[designation,setdesignation]=useState("");
 const[department,setdepartment]=useState("");
 const[yoep,setyoep]=useState("");
 const[doj,setdoj]=useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "employees"), where("uid", "==", user?.uid));
      //const q1 = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      //setName(data.name);
      setqualification(data.qualification);
      setdesignation(data.designation);
      setdepartment(data.department);
      setyoep(data.yoep);
      setdoj(data.doj.toDate().toDateString())
      
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
        Profile
       
        <div>Email: {user?.email}</div>
        <div> Qualification: {qualification}</div>
        <div>Designation: {designation}</div>
        <div>Department: {department}</div>
        
        <div>DOJ: {doj}</div>

        

      
        
    

        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      
    </div>

    </div>
  );
}

export default Dashboard;
