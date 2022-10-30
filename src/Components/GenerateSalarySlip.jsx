import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


export default function GenerateSalarySlip() {
    
    const navigate = useNavigate();
    const empData=JSON.parse(localStorage.getItem('RefEmpData'));
    console.log(empData);
    const calculateSalary=()=>{
        var fromDate = new Date(document.getElementById('fromDate').value);
        var toDate = new Date(document.getElementById('toDate').value);
        var pre_exp =Math.floor(((empData.pre_yoe.years*12)+empData.pre_yoe.months)/12)/2;
        var days=(toDate.getTime() - fromDate.getTime())/(1000 * 3600 * 24)+1;
        var doj=new Date(empData.doj.seconds*1000);
        var cur_exp=Math.floor((fromDate.getTime()-doj.getTime())/(1000 * 3600 * 24)/365)+1;
        var basicPay=empData.bpsBasic;
        var basicInc;
        var exp=pre_exp+cur_exp;
        for(let i=0;i<exp;i++){
            basicInc=basicPay*0.03;
            basicPay=basicPay+basicInc;
        }
        var hra= basicPay*empData.bpsHRA/100;
        var da= basicPay*empData.bpsDA/100;
        var perDayBasic=basicPay/30;
        
        document.getElementById('basic').value=basicPay;
        document.getElementById('hra').value=hra;
        document.getElementById('da').value=da;
    }
    
    return (
        
       <div className="SalarySlip">
            <label htmlFor="fromDate" >From Date:</label>  
            <input type="date" name="fromDate" id="fromDate"/>
            <br />
            <label htmlFor="toDate" >To Date:</label>  
            <input type="date" name="toDate" id="toDate"onChange={calculateSalary}/>
            <br />
            <label htmlFor="basic">Basic: </label>   
            <input type="text" id='basic' readOnly/>
            <br />
            <label htmlFor="hra">HRA: </label>   
            <input type="text" id='hra' readOnly/>
            <br />
            <label htmlFor="hra">DA: </label>   
            <input type="text" id='da' readOnly/>

       </div>
    )
}
