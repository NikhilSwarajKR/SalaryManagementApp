import React,{useState, useEffect} from 'react'
import {db,storage} from '../firebase';
import {collection, query, onSnapshot,where} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import './Styles/Common.css'
import BreadCrumbs from './BreadCrumbs';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

export default function Teaching() {
  const navigate = useNavigate();
  function filterDeptById(jsonObject, id) {
      for (const obj of jsonObject) {
        if(obj.deptID === id) {
          return obj.deptName;
      }  
    }
  }
  function filterBPSById(jsonObject, id) {
    for (const obj of jsonObject) {
      if(obj.bpsID === id) {
        return {basicPay:obj.basic, designation:obj.designation};
    }  
  }
}

  const deptRef =query(collection(db,'departments'),where('dept_cat','==','dcat1')  );
  const bpsRef =query(collection(db,'basicpayscale'));
  const [dept,setDept]=useState([]);
  const [salary,setSalary]=useState([]);
  const [data, setData] = useState([]);
  const [loading,setLoading]= useState(true);
  useEffect(()=>{
    onSnapshot(bpsRef,(bpsSnap)=>{
      const bpsStore=[];
      bpsSnap.forEach((bSal)=>{
        bpsStore.push({
          bpsID: bSal.id,
          designation: bSal.data().designation, 
        });
        setSalary(bpsStore);
      });
    });
  });
  
  useEffect(()=>{
    onSnapshot(deptRef,(deptSnap)=>{
      const deptStore=[];
      deptSnap.forEach((dept)=>{
        deptStore.push({
          deptID:dept.id,
          deptName:dept.data().dept_name
        });
        setDept(deptStore);
      });
    });   
  });

  useEffect(()=>{
    var items = [];
    dept.map((item)=>{
      const empRef = query(collection(db,'employees'),where('department','==',item.deptID));
      onSnapshot(empRef,(querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var department= filterDeptById(dept,doc.data().department);
        let {basicPay,designation}= filterBPSById(salary,doc.data().paygrade);
        items.push({
          empID: doc.id,
          firstName: doc.data().name.first,
          lastName: doc.data().name.last,
          deptID:doc.data().department,
          department: department,
          pre_yoe: doc.data().pre_yoe.years+"years & "+doc.data().pre_yoe.months+"months",
          qualification: doc.data().qualification,
          doj: doc.data().doj.toDate().toDateString(),
          basicPay: basicPay,
          designation:designation,
        });
      });
      setData(items);
      setLoading(false);
    });
    });
  });

  
  const cols=[
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
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
      selector: row => row.pre_yoe,
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
      cell: row => <Button onClick={() => navigate('/EmployeeDetails',{state:{empID:row.empID,department:row.department,pre_yoe:row.pre_yoe,qualification:row.qualification,designation:row.designation,doj:row.doj,basic:row.basicPay}})}>View</Button>,
      allowOverflow: true,
      button: true,
    }];
  return (
    
    <div className='Teaching rendering'>
      <BreadCrumbs component='TEACHING'/>
      <DataTable columns={cols} data={data} title="Teaching Staffs" pagination responsive fixedHeader fixedHeaderScrollHeight="400px"/>
    </div>
  );
}
