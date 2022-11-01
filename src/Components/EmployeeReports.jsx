import React,{useState, useEffect} from 'react';
import {collection, query,where, getDocs,doc,deleteDoc} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import {db,storage} from './../firebase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

function EmployeeReports() {
  const [transactionsData, setData] = useState([]);
  const [loading,setLoading]= useState(false);
  const empData=JSON.parse(localStorage.getItem('RefEmpData'));
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchReports=async()=>{

    const empTransRef =query(collection(db,'transactions'),where('empID','==',empData.empID));
    const TransSnap = await getDocs(empTransRef);
    let transactionsStore=[];
    
    TransSnap.forEach((trans)=>{
      transactionsStore.push({
        transID:trans.id,
        empID:trans.data().empID,
        empName:trans.data().empName,
        deptName:trans.data().deptName,
        designation:trans.data().designation,
        fromDate:trans.data().fromDate,
        toDate:trans.data().toDate,
        transactionDate:trans.data().transactionDate,
        basicPay:trans.data().basicPay,
        HRA:trans.data().HRA,
        DA:trans.data().DA,
        GradePay:trans.data().GradePay,
        TA:trans.data().TA,
        totalWorkingDays:trans.data().totalWorkingDays,
        PT:trans.data().PT,
        leaves:trans.data().leaves,
        lossOfPay:trans.data().lossOfPay,
        PF:trans.data().PF,
        PFEC:trans.data().PFEC,
        grossSal:trans.data().grossSal,
        totalDeduction:trans.data().totalDeduction,
        netSal:trans.data().netSal
      });
    });
    setLoading(true);
    setData(transactionsStore);
  }

  useEffect(()=>{
    fetchReports();
  },[loading]);

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
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    alignItems:'center',
    p: 4,
  };
  const cols=[
    {
      name: 'Transaction ID',
      selector: row => row.transID,
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
      cell: row => <Button variant="contained">View</Button>,
      allowOverflow: true,
      button: true,
    },
    {
      cell: row => <Button variant="contained" color='error' onClick={()=>handleModal(row.transID)}>Delete</Button>,
      allowOverflow: true,
      button: true,
    }];
    
    return(
      <div className='Teaching rendering'>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Alert severity="error">Deleting Transaction: Confirm &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="contained" color="error" onClick={handleDelete}>Delete</Button></Alert>
          </Typography>
          
        </Box>
      </Modal>
          {loading ?(
            <DataTable columns={cols} data={transactionsData} title="Employee Pay Slips" pagination responsive fixedHeader fixedHeaderScrollHeight="400px"/>
          ):(
            <h1>Loading</h1>
          )}
      </div>
    );
}

export default EmployeeReports