import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {db,storage} from './../firebase';
import {collection, query, onSnapshot,where} from 'firebase/firestore';

export default function DataFetcher() {
    const navigate = useNavigate();
    let deptRef =query(collection(db,'departments'),where('dept_cat','==','dcat1'));
    let bpsRef =query(collection(db,'basicpayscale'));

    const [dept,setDept]=useState([]);
    const [salary,setSalary]=useState([]);
    const [employee,setEmployee]=useState([]);
    const [data, setData] = useState([]);
    const [loading,setLoading]= useState(false);

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

    useEffect(() => {
        let empRef = query(collection(db,'employees'));
        onSnapshot(empRef, (empQuerySnapshot) => {
        setEmployee(empQuerySnapshot.docs.map(emp => ({
            empID: emp.id,
            empData: emp.data()
        })))

        })
        setLoading(true);
    },[]);

    useEffect(()=>{
        let deptRef =query(collection(db,'departments'),where('dept_cat','==','dcat1'));
        onSnapshot(deptRef, (deptQuerySnapshot) => {
            setDept(deptQuerySnapshot.docs.map(dept => ({
            deptID: dept.id,
            deptData: dept.data()
            })))
        })
    },[]);
      
}
