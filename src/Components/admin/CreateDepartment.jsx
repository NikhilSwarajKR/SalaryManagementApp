import React,{useState,useEffect} from 'react'
import { db } from "../../firebase";
import { doc,setDoc,collection,getDocs,query} from "firebase/firestore";
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import AdminHeader from './AdminHeader';

function CreateDepartment() {
  const navigate = useNavigate();

  const [deptCat, setDeptCat] = useState([]);
  const [loader, setLoader] = useState(false);

  const deptCatRef = collection(db, "dept_category");
  const fetchDeptCat = async () => {
    const deptSnap = await getDocs(query(deptCatRef));
    var deptItems = [];
    deptSnap.forEach((doc) => {
      deptItems.push({
        deptCatID: doc.id,
        deptType: doc.data().type,
      });
    });
    setDeptCat(deptItems);
    setLoader(true);
  };

  useEffect(() => {
    fetchDeptCat();
  }, [loader]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dept_cat = document.getElementById("dept_cat").value;
        const dept_name = document.getElementById("dept_name").value;
        var dept_id = document.getElementById("dept_id").value;
        dept_id='sjcd'+dept_id
        try{
            await setDoc(doc(db, "departments", dept_id),{
                dept_cat:dept_cat,
                dept_name:dept_name,
            }

        )}
        catch(err){
            alert(err);
        }
        navigate('/Departments');
    }
  return (
    <div>
      <AdminHeader/>
      <div className='rendering'>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/AdminProfile" >Home</Link>
        <Link underline="hover" key="2" color="inherit" href="/Departments" >Departments</Link>
        <Link underline="hover" key="3" color="inherit" href="/CreateDepartment" >Create Department</Link>
    </Breadcrumbs>
    <div className='rendering'>
      {loader?(
        <form align="center" onSubmit={handleSubmit}>

          <div className="input-group mb-3">
            <span className="input-group-text" >Department ID &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="input-group-text" >SJCD</span>
            <input type="number" className="form-control" required id="dept_id"  label="Department ID" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" >Department Name</span>
            <input type="text" className="form-control" pattern="^[a-zA-Z_ ]*$" required id="dept_name" label="Department Name"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Department Category </span>
            <select required  className="form-select" name="dept_cat" id="dept_cat" defaultValue='def'>
            <option value="def" disabled hidden>
                Select the Category
              </option>
              {deptCat.map((depc) => (
                <option key={depc.deptCatID} value={depc.deptCatID}>
                  {depc.deptType}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" variant="contained">Create</Button>
        </form>
      ):(
        <h1>Loading</h1>
      )}
      </div>
         
    </div>
    </div>
  )
}
export default CreateDepartment;