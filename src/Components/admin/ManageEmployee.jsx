import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { db ,storage} from "../../firebase";
import {collection, doc, setDoc, deleteDoc, query, Timestamp, getDocs} from "firebase/firestore";
import {ref,getDownloadURL,uploadBytes,deleteObject} from "firebase/storage";
import { v4 } from "uuid";
import AdminHeader from './AdminHeader';


function ManageEmployee() {
    const navigate = useNavigate();
    const RefEmpData=JSON.parse(localStorage.getItem('RefEmpData'));
    var doj=new Date(RefEmpData.doj.seconds*1000).toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})
    const [deleteModal, setDelete] = useState(false);
    const deleteModalOpen = () => setDelete(true);
    const deleteModalClose= () => setDelete(false);

    const [dept, setDept] = useState([]);
    const [bps, setBps] = useState([]);
    const [loader, setloader] = useState(false);
    const deptCollectionRef = collection(db, "departments");
    const bpsCollectionRef = collection(db, "basicpayscale");

    const [imageUpload, setImageUpload] = useState(null);
    const [imageURL, setURL] = useState();
    const [imgID, setImgID] = useState(null);

    const uploadImage= ()=> {
      const imageID=v4().replaceAll('-', '');
      if (imageUpload == null) {
        return;
      }
      else{
          const imageRef = ref(storage, `employee_images/${imageID}`)
          const deleteRef = ref(storage, `employee_images/${RefEmpData.imageID}`);
          deleteObject(deleteRef)
          uploadBytes(imageRef, imageUpload)
          return imageID
      }
    }

    const fetchImage=()=>{
      const imageRef = ref(storage, `employee_images/${RefEmpData.imageID}`)
      getDownloadURL(imageRef)
      .then((url) => {
        setURL(url)
        setImgID(RefEmpData.imageID)
      })
      .catch((error) => {
        console.log(error)
      });
    }

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
        fetchImage();
        fetchDept();
        fetchBps();
    }, [loader]);

    const handleEdit = async (e) => {
        e.preventDefault();
        var imageID=imgID;
        const emp_id = document.getElementById("emp_id").value.toLowerCase();
        const first = document.getElementById("first").value;
        const last = document.getElementById("last").value;
        const qual = document.getElementById("qual").value;
        const dept = document.getElementById("dept").value;
        const months = document.getElementById("months").value;
        const years = document.getElementById("years").value;
        const DOJ = new Date(document.getElementById("DOJ").value);
        const paygrade = document.getElementById("paygrade").value;
        if(imageUpload!=null){
           imageID=uploadImage();
        }
        try {
          await setDoc(doc(db, "employees", emp_id), {
            name: {first:first,last:last},
            img:imageID,
            qualification: qual,
            department: dept,
            pre_yoe: {months:months,years:years},
            paygrade: paygrade,
            doj: Timestamp.fromDate(DOJ),
            usersDocID:RefEmpData.usersDocID,
          });
        } catch (err) {
          alert(err);
        }
        navigate('/Employees');
      };

      const handleDeleteModal=()=>{
        deleteModalOpen();
      }
      const handleDelete=async()=>{
        let empID=RefEmpData.empID;
        await deleteDoc(doc(db, "employees",empID));
        const deleteRef = ref(storage, `employee_images/${RefEmpData.imageID}`);
        deleteObject(deleteRef)
        deleteModalClose();
        navigate('/Employees')
      }
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
      };
    return (
     <div>
      <AdminHeader/>
       <div className='rendering'>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit"href="/AdminProfile" >Home</Link>
          <Link underline="hover" key="2" color="inherit" href="/Employees">Employees</Link>
          <Link underline="hover" key="3" color="inherit" href="/ManageEmployee" >Manage Employee</Link>
      </Breadcrumbs>
      <Modal
        open={deleteModal}
        onClose={deleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            <Alert severity="error">Confirm Delete Employee &nbsp;&nbsp;<Button variant="contained" color="error" onClick={handleDelete}>Delete</Button></Alert>
          </Typography>
          
        </Box>
      </Modal>
      <div className='rendering'>
      {loader ? (
        <div>
            <form onSubmit={handleEdit}>
            <div className=" mb-3 align-items-center ">
              <img src={imageURL} className="rounded mx-auto d-block" height="200px"/>
            </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Employee ID &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="text" className="form-control" required id="emp_id" label="Employee ID" disabled defaultValue={RefEmpData.empID.toUpperCase()}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" >Employee Name</span>
            <span className="input-group-text" >First Name</span>
            <input type="text" className="form-control"pattern="^[a-zA-Z_ ]*$" required id="first" defaultValue={RefEmpData.firstName} />
            <span className="input-group-text" >Last Name</span>
            <input type="text" className="form-control"pattern="^[a-zA-Z_ ]*$" required id="last" defaultValue={RefEmpData.lastName} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Qualification &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="text" className="form-control"pattern="^[a-zA-Z_ ]*$" required id="qual" defaultValue={RefEmpData.qualification}/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Previous Period Of Experince &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="input-group-text" >Years</span>
            <input type="number" className="form-control" required  id="years" min="0" defaultValue={RefEmpData.pre_yoe.years}/>
            <span className="input-group-text" >Months</span>
            <input type="number" className="form-control" required  id="months"  min="0" defaultValue={RefEmpData.pre_yoe.months}/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" >Date Of Joining &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input  type="date" placeholder="DOJ" id="DOJ"  className="form-control" required defaultValue={doj}/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" >Department &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <select name="dept" id="dept" className="form-control" required defaultValue={RefEmpData.deptID}>
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
            <select name="designation" id="paygrade"  className="form-control" required defaultValue={RefEmpData.bpsID}>
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
          <div className="input-group mb-3">
            <span className="input-group-text" >Change Image &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="file" accept="image/png, image/jpeg" className="form-control" onChange={(event) => {setImageUpload(event.target.files[0]);}} />
          </div>
          
          <Button type='submit' variant='contained' className="rounded mx-auto d-block">  <EditIcon style={{ color: "white" }}/>&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
        
                
        </form>
        <br />
        <Button variant='contained' className="rounded mx-auto d-block" color='error' onClick={()=>handleDeleteModal()}><DeleteForeverIcon style={{ color: "white" }}/>&nbsp;Delete</Button>
        </div>
        ) : (
            <h1>Loading</h1>
        )}
        </div>
      </div>
     </div>
    )
}

export default ManageEmployee