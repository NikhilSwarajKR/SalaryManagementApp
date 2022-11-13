import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { db,storage,auth } from "../../firebase";
import {collection,doc,setDoc,query,Timestamp,getDocs} from "firebase/firestore";
import {ref,uploadBytes} from "firebase/storage";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import { v4 } from "uuid";
import AdminHeader from "./AdminHeader";
import { registerWithEmailAndPassword } from "../AdminAuth";
import { sendPasswordResetEmail } from "firebase/auth";
function CreateEmployee() {
    const navigate = useNavigate();
    
    const [imageUpload, setImageUpload] = useState(null);
    const [imageURL, setURL] = useState();
    const uploadImage= ()=> {
      var imageURL=v4().replaceAll('-', '');
      if (imageUpload == null) 
        return;
      else{
        const imageRef = ref(storage, `employee_images/${imageURL}`)
        uploadBytes(imageRef, imageUpload)
        return imageURL
       }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      var emp_id = document.getElementById("emp_id").value;
      const first = document.getElementById("first").value;
      const last = document.getElementById("last").value;
      const email = document.getElementById("email").value;
      const qual = document.getElementById("qual").value;
      const dept = document.getElementById("dept").value;
      const months = document.getElementById("months").value;
      const years = document.getElementById("years").value;
      const DOJ = new Date(document.getElementById("DOJ").value);
      const paygrade = document.getElementById("paygrade").value;
      var imgID=uploadImage();
      emp_id='sjce'+emp_id
      var docID;
      try{
        docID= await registerWithEmailAndPassword(email,v4().replaceAll('-', '').substring(0,8));
        await sendPasswordResetEmail(auth, email);
        try {
          await setDoc(doc(db, "employees", emp_id), {
            name: {first:first,last:last},
            img:imgID,
            qualification: qual,
            department: dept,
            pre_yoe: {months:months,years:years},
            paygrade: paygrade,
            doj: Timestamp.fromDate(DOJ),
            usersDocID:docID.id
          });
        } catch (error) {
          console.log(error);
        }
      }
      catch(error){
        console.log(error)
        return
      }
      
      navigate('/Employees');
    };

  const [dept, setDept] = useState([]);
  const [bps, setBps] = useState([]);
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(false);
  const deptCollectionRef = collection(db, "departments");
  const bpsCollectionRef = collection(db, "basicpayscale");

  const fetchDept = async () => {
    const deptSnap = await getDocs(query(deptCollectionRef));
    var deptItems = [];
    deptSnap.forEach((doc) => {
      deptItems.push({
        deptID: doc.id,
        deptName: doc.data().dept_name,
      });
    });
    setDept(deptItems);
  };
  const fetchBps = async () => {
    const bpsSnap = await getDocs(query(bpsCollectionRef));
    var bpsItems = [];
    bpsSnap.forEach((doc) => {
      bpsItems.push({
        bpsID: doc.id,
        designation: doc.data().designation,
      });
    });
    setBps(bpsItems);
    setloader(true);
  };

  useEffect(() => {
    fetchDept();
    fetchBps();
  }, [loader]);

  return (
    <div>
      <AdminHeader/>
      <div className='rendering'>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/AdminProfile" >Home</Link>
        <Link underline="hover" key="2" color="inherit" href="/Employees" >Employees</Link>
        <Link underline="hover" key="3" color="inherit" href="/CreateEmployee" >Create Employee</Link>
    </Breadcrumbs>
    <div className="rendering">
      {loader ? (
        <form action="" onSubmit={handleSubmit} className="addEmp"  name="addEmp">
          <div className="input-group mb-3">
            <span className="input-group-text" >Employee ID &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="input-group-text" >SJCE</span>
            <input type="number" className="form-control" required id="emp_id" min="0"  label="Employee ID" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Employee Photo &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="file" required accept="image/png, image/jpeg" className="form-control" onChange={(event) => {setImageUpload(event.target.files[0]);}} />
          </div>
     
          <div className="input-group mb-3">
            <span className="input-group-text" >Employee Name</span>
            <span className="input-group-text" >First Name</span>
            <input type="text" className="form-control" pattern="^[a-zA-Z_ ]*$"required id="first"  />
            <span className="input-group-text" >Last Name</span>
            <input type="text" className="form-control" pattern="^[a-zA-Z_ ]*$" required id="last"  />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Email ID&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="email" className="form-control" required id="email"  />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Qualification &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="text" className="form-control" pattern="^[a-zA-Z_ ]*$" required id="qual"  />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Previous Period Of Experince &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="input-group-text" >Years</span>
            <input type="number" className="form-control" required  id="years" min="0" />
            <span className="input-group-text" >Months</span>
            <input type="number" className="form-control" required  id="months"  min="0"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Date Of Joining &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input  type="date" placeholder="DOJ" id="DOJ"  className="form-control" required/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" >Department &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <select name="dept" id="dept" className="form-control" defaultValue='def'>
            <option value="def" disabled hidden>
              Select the department
            </option>
            {dept.map((dep) => (
              <option key={dep.deptID} value={dep.deptID}>
                {dep.deptName}
              </option>
            ))}
          </select>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" >Designation &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <select name="designation" id="paygrade"  className="form-control" defaultValue='def'>
            <option value="def" disabled hidden>
              Select the Designation
            </option>
            {bps.map((pays) => (
              <option key={pays.bpsID} value={pays.bpsID}>
                {pays.designation}
              </option>
            ))}
          </select>
          </div>
        <Button type="submit" className="rounded mx-auto d-block" variant="contained">Create</Button>
        </form>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
    </div>
    </div>
  );
}

export default CreateEmployee;