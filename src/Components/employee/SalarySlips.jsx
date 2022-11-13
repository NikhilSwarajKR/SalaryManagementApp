import React,{useState, useEffect} from 'react';
import {collection, query,where, getDocs,doc,deleteDoc} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import {db,storage} from '../../firebase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import EmployeeHeader from './EmployeeHeader'
import Cookies from 'js-cookie';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
function SalarySlips() {
  const [transactionsData, setData] = useState([]);
  const [loading,setLoading]= useState(false);
  const empData=JSON.parse(Cookies.get('employeeData'));

  const fetchReports=async()=>{
    const empTransRef =query(collection(db,'transactions'),where('empID','==',empData.employeeID));
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

  useEffect(()=>{
    fetchReports();
  },[loading]);
  
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
      cell: row => <Button variant="contained" onClick={()=>openViews(row.transID)}>View</Button>,
      allowOverflow: true,
      button: true,
    }];
    
    return(
      <div>
        <EmployeeHeader/>
        <div className='rendering'>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/EmployeeProfile" >Home</Link>
          <Link underline="hover" key="2" color="inherit" href="/Salary Slips" >Salary Slips</Link>
      </Breadcrumbs>
          <div className='rendering'>
          {loading ?(
            <DataTable columns={cols} data={transactionsData} title="Salary Slips" pagination responsive fixedHeader/>
          ):(
            <h1>Loading</h1>
          )}
      </div>
      </div>
      </div>
      
    );
}

export default SalarySlips