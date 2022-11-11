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

function PayScales() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deptCatData, setCatData] = useState([]);

  const [loading,setLoading]= useState(false);
  const [deleteModal, setDelete] = useState(false);
  const deleteModalOpen = () => setDelete(true);
  const deleteModalClose= () => setDelete(false);

  const fetchPayScales=async()=>{
    const BPSRef =query(collection(db,'basicpayscale'));
    const BPSSnap = await getDocs(BPSRef);
    let BPSStore=[];
    
    BPSSnap.forEach((bps)=>{
      BPSStore.push({
        bpsID:bps.id,
        basic:bps.data().basic,
        da:bps.data().da,
        hra:bps.data().hra,
        pf:bps.data().pf,
        pt:bps.data().pt,
        ta:bps.data().ta,
        gradePay:bps.data().grade_pay,
        designation:bps.data().designation,
      });
    });
    setLoading(true);
    setData(BPSStore);
  }

  useEffect(()=>{
    fetchPayScales();
    localStorage.setItem("BPSData", JSON.stringify(data));
  },[loading]);

  
  const navigateEdit=(bpsID)=>{
    let temp=[];
    data.forEach((bps)=>{
      if(bps.bpsID===bpsID){
        temp=bps;
      }
    });
    localStorage.setItem('RefBPSData',JSON.stringify(temp));
    navigate('/EditPayScale');
  }
  const handleDeleteModal=(bpsID)=>{
    deleteModalOpen();
    localStorage.setItem("BPSID",bpsID);
  }
  const handleDelete=async()=>{
    let bpsID=localStorage.getItem('BPSID');
    localStorage.removeItem('bpsID');
    await deleteDoc(doc(db, "basicpayscale",bpsID));
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
      name: 'PayScale ID',
      selector: row => row.bpsID.toUpperCase(),
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => row.designation,
      sortable: true,
    },
    {
      name: 'BasicPay',
      selector: row => row.basic,
      sortable: true,
    },
    {
      name: 'DA(%)',
      selector: row => row.da,
      sortable: true,
    },
    {
      name: 'HRA(%)',
      selector: row => row.hra,
      sortable: true,
    },
    {
      name: 'PF(%)',
      selector: row => row.pf,
      sortable: true,
    },
    {
      name: 'TA',
      selector: row => row.ta,
      sortable: true,
    },
    {
      name: 'Grade Pay',
      selector: row => row.gradePay,
      sortable: true,
    },
    {
      cell: row => <Button variant="contained" color='success' onClick={()=>navigateEdit(row.bpsID)}>Edit</Button>,
      allowOverflow: true,
      button: true,
    },
    {
      cell: row => <Button variant="contained" color='error' onClick={()=>handleDeleteModal(row.bpsID)} >Delete</Button>,
      allowOverflow: true,
      button: true,
    }];
    
  return (
   <div>
    <AdminHeader/>
     <div className='rendering'>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/AdminProfile">Home</Link>
        <Link underline="hover" key="2" color="inherit" href="/PayScales" >Pay Scales</Link>

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
            <Alert severity="error">Confirm Delete Pay Scale &nbsp;&nbsp;<Button variant="contained" color="error" onClick={handleDelete}>Delete</Button></Alert>
          </Typography>
          
        </Box>
      </Modal>
        <div>
            <Button variant="contained" onClick={()=>navigate('/CreatePayScale')}>Create new Pay Scale</Button>
      </div>
      <div>
      {loading ?(
          <DataTable columns={cols} data={data} title="Pay Scale List" pagination responsive fixedHeader/>
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

export default PayScales