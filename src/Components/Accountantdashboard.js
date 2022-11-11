import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db} from "../firebase";
import {logout} from "./EmployeeAuth";
import { query, collection, getDocs, where } from "firebase/firestore";
import "./Salary";
import {Routes, Route ,Link} from "react-router-dom";
import Button from '@mui/material/Button'; 
import { styled } from '@mui/material/styles';  
  
import IconButton from '@mui/material/IconButton';  
import PhotoCamera from '@mui/icons-material/PhotoCamera';  
import Stack from '@mui/material/Stack';  
  




function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
 const[qualification,setqualification]=useState("");
 const[designation,setdesignation]=useState("");
 const[department,setdepartment]=useState("");
 //const[yoep,setyoep]=useState("");
 const[doj,setdoj]=useState("");
 const Input = styled('input')({ display: 'none', }); 
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const empdata = query(collection(db, "accountant"), where("usersDocID", "==", user?.uid));
      //const q1 = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(empdata);
      const data = doc.docs[0].data();
      console.log(data);
      setName(data.name.first + " "+ data.name.last);
      setqualification(data.qualification);
      setdoj(data.doj.toDate().toDateString())
      
      //setdesignation(data.designation);
      const deptdata=query(collection(db, "departments"), where("id", "==", data.department));
      const dept = await getDocs(deptdata);
      const dep= dept.docs[0].data().dept_name;
      setdepartment(data.dep);   
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
       <u> Accontant Profile details</u> <br></br>
       
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

export default Dashboard;