import React,{useState, useEffect} from 'react';
import {collection, query,where, getDocs,doc,deleteDoc} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import {db,storage} from '../../firebase';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';


function AllReports() {
  const [transactionsData, setData] = useState([]);
  const [loading,setLoading]= useState(false);
  const empData=JSON.parse(localStorage.getItem('RefEmpData'));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchReports=async()=>{

    const empTransRef =query(collection(db,'transactions'));
    const TransSnap = await getDocs(empTransRef);
    let transactionsStore=[];
    
    TransSnap.forEach((trans)=>{
      transactionsStore.push({
        transID:trans.id,
        empID:trans.data().empID,
        empName:trans.data().empName,
        deptName:trans.data().deptName,
        designation:trans.data().designation,
        dateOfJoining:trans.data().dateOfJoining,
        fromDate:trans.data().fromDate,
        toDate:trans.data().toDate,
        transactionDate:trans.data().transactionDate,
        basicPay:trans.data().basicPay,
        HRA:trans.data().HRA,
        DA:trans.data().DA,
        gradePay:trans.data().gradePay,
        TA:trans.data().TA,
        noOfDays:trans.data().noOfDays,
        totalWorkingDays:trans.data().totalWorkingDays,
        unpaidLeavesTaken:trans.data().unpaidLeavesTaken, 
        PT:trans.data().PT,
        lossOfPay:trans.data().lossOfPay,
        PF:trans.data().PF,
        PFEC:trans.data().PFEC,
        grossSalary:trans.data().grossSalary,
        totalDeduction:trans.data().totalDeduction,
        netSalary:trans.data().netSalary
      });
    });
    setLoading(true);
    setData(transactionsStore);
  }
  const openViews=(transID)=>{
    let temp=[];
    transactionsData.forEach((trans)=>{
      if(trans.transID===transID){
        temp=trans;
      }
    });
    console.log(temp);
    localStorage.setItem("refTransData", JSON.stringify(temp));
    window.open('/ViewReport');
  }


  useEffect(()=>{
    fetchReports();
  },[loading]);
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
      name: 'Transaction ID',
      selector: row => row.transID,
      sortable: true,
    },
    {
      name: 'Employee ID',
      selector: row => row.empID.toUpperCase(),
      sortable: true,
    },
    {
      name: 'Employee Name',
      selector: row => row.empName,
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.deptName,
      sortable: true,
    },
    {
      name: 'Transaction Date',
      selector: row => row.transactionDate.toDate().toLocaleDateString('en-IN'),
      sortable: true,
    },
    {
      name: 'From Date',
      selector: row => row.fromDate.toDate().toLocaleDateString('en-IN'),
      sortable: true,
    },
    {
      name: 'To date',
      selector: row => row.toDate.toDate().toLocaleDateString('en-IN'),
      sortable: true,
    },
    {
      cell: row => <Button variant="outlined" onClick={()=>openViews(row.transID)}>View</Button>,
      allowOverflow: true,
      button: true,
    },
    {
      cell: row => <Button variant="outlined" color='error' onClick={()=>handleModal(row.transID)}>Delete</Button>,
      allowOverflow: true,
      button: true,
    }];
    const handleModal=(transID)=>{
      handleOpen();
      localStorage.setItem("transID",transID);
    }
    const handleDelete=async()=>{
      let transID=localStorage.getItem('transID');
      localStorage.removeItem('transID');
      await deleteDoc(doc(db, "transactions",transID));
      handleClose();
      window.location.reload();
    }
    
    return(
      <div className='rendering'>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            <Alert severity="error">Confirming Delete Transaction &nbsp;&nbsp;<Button variant="contained" color="error" onClick={handleDelete}>Delete</Button></Alert>
          </Typography>
          
        </Box>
      </Modal>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/" >Home</Link>
        <Link underline="hover" key="3" color="inherit" href="/Reports" >Reports</Link>
    </Breadcrumbs>
      <div className='AllReorts rendering'>
          {loading ?(
            <DataTable columns={cols} data={transactionsData} title="Reports" pagination responsive fixedHeader fixedHeaderScrollHeight="400px"/>
          ):(
            <h1>Loading</h1>
          )}
      </div></div>
    );
}

export default AllReports;