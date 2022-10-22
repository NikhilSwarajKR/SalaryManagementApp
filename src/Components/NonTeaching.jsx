import React,{useState, useEffect} from 'react'
import {db,storage} from './../firebase';
import {collection, query, onSnapshot,where} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import './Styles/Common.css';
import {Link} from 'react-router-dom';
import BreadCrumbs from './BreadCrumbs';

export default function NonTeaching() {
  function filterDeptById(jsonObject, id) {
      for (const obj of jsonObject) {
        if(obj.id === id) {
          return obj.dept_name;
      }  
    }
  }
  

  const deptRef =query(collection(db,'nonteaching_department'));
  const bSRef =query(collection(db,'basicpayscale'));
  //const empRef = query(collection(db,'employees'));
  const [Dept,setDeptData]=useState([]);
  //const [Salary,setSalaryData]=useState([]);
  const [eData, setEData] = useState([]);
  
  
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
    const items = []
    Dept.map((item)=>{
      const empRef = query(collection(db,'employees'),where('department','==',item.id));
      onSnapshot(empRef,(querySnapshot) => {
      ;
      querySnapshot.forEach((doc) => {
        var department= filterDeptById(Dept,doc.data().department);
        items.push({
          id: doc.id,
          name: doc.data().name,
          department: department,
          YOEP: doc.data().YOEP,
          Qualification: doc.data().Qualification,
          DOJ: doc.data().DOJ,
          designation:doc.data().Designation
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
      name: 'Qualification',
      selector: row => row.Qualification,
      sortable: true,
    },
    {
        name: 'Date Of Joining',
        selector: row => row.DOJ.toDate().toDateString(),
        sortable: true,
    },
    {
      name: 'Years Of Experience',
      selector: row => row.YOEP,
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
      cell: row => <button><Link to={`/GenerateSalarySlip/${row.id}`}>Generate Salary Slip</Link></button>,
      allowOverflow: true,
      button: true,
    }];

  return (
    <div className='Non_Teaching rendering'>
      <BreadCrumbs component='NON TEACHING'/>
    <DataTable columns={cols} data={eData} title="Non-Teaching Staffs"pagination responsive fixedHeader fixedHeaderScrollHeight="500px" />
 </div>
  
  );
}
