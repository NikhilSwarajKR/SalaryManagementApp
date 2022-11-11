import React,{useState, useEffect} from 'react';
import {db,storage} from '../../firebase';
import {collection, query,where, getDocs,doc,deleteDoc} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import AdminHeader from './AdminHeader';


function Departments() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deptCatData, setCatData] = useState([]);

  const [loading,setLoading]= useState(false);
  const [deleteModal, setDelete] = useState(false);
  const deleteModalOpen = () => setDelete(true);
  const deleteModalClose= () => setDelete(false);

  const fetchDepartments=async()=>{
    const deptCatRef =query(collection(db,'dept_category'))
    const deptRef =query(collection(db,'departments')); 
    const deptCatSnap = await getDocs(deptCatRef);
    const deptSnap = await getDocs(deptRef);
    let deptStore=[],deptCatStore=[];
    let temp=[];
    
    deptCatSnap.forEach((dcat)=>{
      deptCatStore.push({
        catID:dcat.id,
        type:dcat.data().type,
      });
    });

    deptSnap.forEach((dept)=>{
      deptStore.push({
        deptID:dept.id,
        deptName:dept.data().dept_name,
        catID:dept.data().dept_cat
      });
    });

    deptCatStore.forEach((dcat) => {
      deptStore.forEach((dept) => {
        if (dept.catID === dcat.catID) 
            temp.push({...dept,...dcat})
      });
    });
    
    setLoading(true);
    setCatData(deptCatStore);
    setData(temp);
  }

  useEffect(()=>{
    fetchDepartments();
    localStorage.setItem("DeptData", JSON.stringify(data));
    localStorage.setItem("DeptCatData", JSON.stringify(deptCatData));
  },[loading]);

  const navigateEdit=(deptID)=>{
    let temp=[];
    data.forEach((dept)=>{
      if(dept.deptID===deptID){
        temp=dept;
      }
    });
    localStorage.setItem('RefDeptData',JSON.stringify(temp));
    navigate('/EditDepartment');
  }

  const handleDeleteModal=(deptID)=>{
    deleteModalOpen();
    localStorage.setItem("deptID",deptID);
  }
  const handleDelete=async()=>{
    let deptID=localStorage.getItem('deptID');
    localStorage.removeItem('deptID');
    await deleteDoc(doc(db, "departments",deptID));
    deleteModalClose();
    window.location.reload();
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
  const cols=[
    {
      name: 'Department ID',
      selector: row => row.deptID.toUpperCase(),
      sortable: true,
    },
    {
      name: 'Department Name',
      selector: row => row.deptName,
      sortable: true,
    },
    {
      name: 'Department Type',
      selector: row => row.type,
      sortable: true,
    },
    {
      cell: row => <Button variant="contained" color='success' onClick={()=>navigateEdit(row.deptID)}>Edit</Button>,
      allowOverflow: true,
      button: true,
    },
    {
      cell: row => <Button variant="contained" color='error' onClick={()=>handleDeleteModal(row.deptID)}>Delete</Button>,
      allowOverflow: true,
      button: true,
    }];
    
  return (
    <div>
      <AdminHeader/>
      <div className='rendering'>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/AdminProfile" >Home</Link>
        <Link underline="hover" key="2" color="inherit" href="/Departments" >Departments</Link>
    </Breadcrumbs>
    <div className='rendering'>
      <Modal
        open={deleteModal}
        onClose={deleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            <Alert severity="error">Confirm Delete Department &nbsp;&nbsp;<Button variant="contained" color="error" onClick={handleDelete}>Delete</Button></Alert>
          </Typography>
          
        </Box>
      </Modal>
        <div>
            <Button variant="contained" onClick={()=>navigate('/CreateDepartment')}>Create new Department</Button>
      </div>
      <div>
      {loading ?(
          <DataTable columns={cols} data={data} title="Departments List" pagination responsive fixedHeader/>
        ):(
          <h1>Loading</h1>
        )
      }
      </div>
    
    </div>
    </div>
    </div>
  )
}

export default Departments
