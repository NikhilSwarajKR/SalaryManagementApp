import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { db ,storage} from "../../firebase";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Grid} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import {ref,getDownloadURL} from "firebase/storage";
import {doc,getDoc} from 'firebase/firestore';
import Cookies from 'js-cookie';
import EmployeeHeader from './EmployeeHeader'
import { sendPasswordReset } from '../EmployeeAuth';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
function EmployeeProfile() {
  const navigate = useNavigate();
  const [data,setData]=useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setURL] = useState();
  const [imgID, setImgID] = useState(null);
  const [EmpEmail, setEmail] = useState("");
  const [loading,setLoading]= useState(false);

  const refData=JSON.parse(Cookies.get('employeeData'));
  const changePasssword=()=>{
      sendPasswordReset(data.empEmail);
  }
  const fetchImage=async(id)=>{
    const imageRef = ref(storage, `employee_images/${id}`)
    getDownloadURL(imageRef)
    .then((url) => {
      setURL(url)
      setLoading(true)
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  const fetchDetails= async()=>{
    const empRef = doc(db, "employees", refData.employeeID);
    const empDocSnap = await getDoc(empRef);
    const deptRef = doc(db, "departments", empDocSnap.data().department);
    const deptDocSnap = await getDoc(deptRef);
    const bpsRef = doc(db, "basicpayscale", empDocSnap.data().paygrade);
    const bpsDocSnap = await getDoc(bpsRef);
    const id=empDocSnap.data().img;
    var temp=[];
    temp={
      empID:refData.employeeID,
      empEmail:refData.userEmailID,
      firstName: empDocSnap.data().name.first,
      lastName: empDocSnap.data().name.last,
      deptID:empDocSnap.data().department,
      department:deptDocSnap.data().dept_name,
      pre_yoe: empDocSnap.data().pre_yoe,
      qualification: empDocSnap.data().qualification,
      doj: empDocSnap.data().doj,
      bpsID:empDocSnap.data().paygrade,
      designation:bpsDocSnap.data().designation,
      imageID:empDocSnap.data().img,
      usersDocID:empDocSnap.data().usersDocID
    };
   setData(temp);
   fetchImage(id);
  }
  useEffect(()=>{
    fetchDetails();
  },[loading])


  return (
    <div>
      <EmployeeHeader/>
      {loading ?(
      <div className='rendering'>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/EmployeeProfile" >Home</Link>
      </Breadcrumbs>
      <div className='rendering'>
          <div className="row">
              <div className="col col-6 col-md-2" >
                
                <img src={imageURL} className="rounded mx-auto d-block" height="200px"/>
              
              </div>
              <div className="col col-12 col-md-10">
                      <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 2 },
                  }}
                  
                  >
                  
                  <div>
                    <TextField
                        id="filled-read-only-input"
                        label="Employee ID"
                        defaultValue={data.empID.toUpperCase()}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    <TextField
                      id="filled-read-only-input"
                      label="Employee Name"
                      defaultValue={data.firstName+" "+data.lastName}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Employee Email ID"
                      defaultValue={data.empEmail}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Qualification"
                      defaultValue={data.qualification}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Designation"
                      defaultValue={data.designation}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Department"
                      defaultValue={data.department}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Date Of Joining"
                      defaultValue={new Date(data.doj.seconds*1000).toLocaleDateString('en-IN')}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  
                  <TextField
                      id="filled-read-only-input"
                      label="Previous Experince Period"
                      defaultValue={data.pre_yoe.years+" Years and "+data.pre_yoe.months+" months"}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="filled"
                    />
                  </div>
                </Box>
              </div>
          </div> 
              
      </div>
      
      
      <Box sx={{ '& .MuiTextField-root': { mt: 30,p:10 }}} >
            <div>
              <Button type='submit' variant='contained' className="rounded mx-auto d-block" onClick={changePasssword}>  <EditIcon style={{ color: "white" }}/>&nbsp;&nbsp;&nbsp;&nbsp;Click here to Change Password&nbsp;&nbsp;</Button>         
            </div>
        </Box>
    </div>
     ):(
      <div/>
    )}
    </div>
  )
}

export default EmployeeProfile