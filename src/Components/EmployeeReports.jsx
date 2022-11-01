import React,{useState, useEffect} from 'react';
import {collection, query,where, getDocs} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import {db,storage} from './../firebase';


function EmployeeReports() {
  const [transactionsData, setData] = useState([]);
  const [loading,setLoading]= useState(false);
  const empData=JSON.parse(localStorage.getItem('RefEmpData'));

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

  const handleDelete=(transID)=>{
    
  }

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
      cell: row => <Button variant="outlined" onClick={()=>handleDelete(row.transID)}>View</Button>,
      allowOverflow: true,
      button: true,
    },
    {
      cell: row => <Button variant="outlined" >Delete</Button>,
      allowOverflow: true,
      button: true,
    }];
    
    return(
      <div className='Teaching rendering'>
          {loading ?(
            <DataTable columns={cols} data={transactionsData} title="Employee Pay Slips" pagination responsive fixedHeader fixedHeaderScrollHeight="400px"/>
          ):(
            <h1>Loading</h1>
          )}
      </div>
    );
}

export default EmployeeReports