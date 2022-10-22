import React,{useState, useEffect} from 'react'
import {db,storage} from './../firebase';
import {collection, query, onSnapshot,where} from 'firebase/firestore';
import {ref} from "firebase/storage";
import DataTable from 'react-data-table-component';
import './Styles/Common.css'
import BreadCrumbs from './BreadCrumbs';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

export default function Teaching() {
  const navigate = useNavigate();
  function filterDeptById(jsonObject, id) {
      for (const obj of jsonObject) {
        if(obj.id === id) {
          return obj.dept_name;
      }  
    }
  }
  function filterBasicPayById(jsonObject, id) {
    for (const obj of jsonObject) {
      if(obj.id === id) {
        return obj.basic;
    }  
  }
}
function filterDesigById(jsonObject, id) {
  for (const obj of jsonObject) {
    if(obj.id === id) {
      return obj.Designation;
  }  
}
}

  const deptRef =query(collection(db,'departments'),where('dept_cat','==','dcat1')  );
  const bSRef =query(collection(db,'basicpayscale'));
  const [Dept,setDeptData]=useState([]);
  const [Salary,setSalaryData]=useState([]);
  const [eData, setEData] = useState([]);
  useEffect(()=>{
    onSnapshot(bSRef,(bSSnap)=>{
      const bSStore=[];
      bSSnap.forEach((bSal)=>{
        bSStore.push({
          id: bSal.id,
          Designation: bSal.data().designation, 
          basic: bSal.data().basic
        });
        setSalaryData(bSStore);
      });
    });
  });
  
  useEffect(()=>{
    onSnapshot(deptRef,(deptSnap)=>{
      const deptStore=[];
      deptSnap.forEach((dept)=>{
        deptStore.push({
          id:dept.id,
          dept_name:dept.data().dept_name
        });
        setDeptData(deptStore);
      });
    });   
  });

  useEffect(()=>{
    var items = [];
    Dept.map((item)=>{
      const empRef = query(collection(db,'employees'),where('department','==',item.id));
      onSnapshot(empRef,(querySnapshot) => {
      ;
      querySnapshot.forEach((doc) => {
        var department= filterDeptById(Dept,doc.data().department);
        var basic= filterBasicPayById(Salary,doc.data().paygrade);
        var designation= filterDesigById(Salary,doc.data().paygrade);
        items.push({
          id: doc.id,
          name: doc.data().name.first+" "+doc.data().name.last,
          department: department,
          pyoe: doc.data().pre_yoe.years+"years & "+doc.data().pre_yoe.months+"months",
          qualification: doc.data().qualification,
          doj: doc.data().doj.toDate().toDateString(),
          basicpay: basic,
          designation:designation,
        });
      });
      setEData(items);
    });
    });
  });

  
  const cols=[
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Photo',
      selector: row => row.image,
      sortable: true,
    },
    {
      name: 'Qualification',
      selector: row => row.qualification,
      sortable: true,
    },
    {
        name: 'Date Of Joining',
        selector: row => row.doj,
        sortable: true,
    },
    {
      name: 'Previous Experience',
      selector: row => row.pyoe,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => row.designation,
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department,
      sortable: true,
    },
    {
      cell: row => <Button onClick={() => navigate(`/SalarySlipGeneration/${row.id}`)}>Generate Salary Slip</Button>,
      allowOverflow: true,
      button: true,
    }];
  return (
    <div className='Teaching rendering'>
      <BreadCrumbs component='TEACHING'/>
      <DataTable columns={cols} data={eData} title="Teaching Staffs" pagination responsive fixedHeader fixedHeaderScrollHeight="400px"/>
    </div>
  );
}
