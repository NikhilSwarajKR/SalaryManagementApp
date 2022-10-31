import { Input, Typography,TextField} from '@mui/material';
import { upload } from '@testing-library/user-event/dist/upload';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';


export default function GenerateSalarySlip() {
    const [loading,setLoading]= useState(false);
    
    const navigate = useNavigate();
    const empData=JSON.parse(localStorage.getItem('RefEmpData'));
    function loadData(){
        var pre_exp =Math.floor(((empData.pre_yoe.years*12)+empData.pre_yoe.months)/12)/2;
        var doj=new Date(empData.doj.seconds*1000);
        var cur=new Date();
        var cur_exp=Math.floor((cur.getTime()-doj.getTime())/(1000 * 3600 * 24)/365);
        var basicPay=empData.bpsBasic;
        var basicInc;
        var exp=pre_exp+cur_exp;
        for(let i=0;i<exp;i++){
            basicInc=basicPay*0.03;
            basicPay=basicPay+basicInc;
        }
        var hra= basicPay*empData.bpsHRA/100;
        var da= basicPay*empData.bpsDA/100;
        var pf= basicPay*empData.bpsPF/100;
        var gradePay=empData.bpsAGP;
        var ta=empData.bpsTA;
        var pt=empData.bpsPT;
        document.getElementById('basic').value=basicPay;
        document.getElementById('hra').value=hra;
        document.getElementById('da').value=da;
        document.getElementById('pf').value=pf;
        document.getElementById('pt').value=pt;
        document.getElementById('agp').value=gradePay;
        document.getElementById('ta').value=ta;
        setLoading(true);
    }
    function calculateSalary(){
        var fromDate = new Date(document.getElementById('fromDate').value);
        var toDate = new Date(document.getElementById('toDate').value);
        var leaves = document.getElementById('leaves').value;
        var pfec=document.getElementById('pfec').value;
        var pre_exp =Math.floor(((empData.pre_yoe.years*12)+empData.pre_yoe.months)/12)/2;
        var days=(toDate.getTime() - fromDate.getTime())/(1000 * 3600 * 24)+1;
        var doj=new Date(empData.doj.seconds*1000);
        var cur_exp=Math.floor((fromDate.getTime()-doj.getTime())/(1000 * 3600 * 24)/365);
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
        var perDayHRA=hra/30;
        var perDayDA=da/30;
        var lossofpay=leaves*(perDayBasic+perDayHRA+perDayDA);
        var pf= basicPay*empData.bpsPF/100;
        var gradePay=empData.bpsAGP;
        var ta=empData.bpsTA
        var pt=empData.bpsPT;
        var grossSal=days*(perDayBasic+perDayHRA+perDayDA)+gradePay+ta-lossofpay-pt;
        var totDed=pf+pfec
        var netSal=grossSal-totDed;
        document.getElementById('basic').value=basicPay;
        document.getElementById('hra').value=hra;
        document.getElementById('da').value=da;
        document.getElementById('salcut').value=lossofpay;
        document.getElementById('pf').value=pf;
        document.getElementById('pt').value=pt;
        document.getElementById('grossSal').value=grossSal;
        document.getElementById('totaldeduction').value=totDed;
        document.getElementById('netSal').value=netSal;
        document.getElementById('agp').value=gradePay;
        document.getElementById('ta').value=ta;
    }
    useEffect(()=>{
        loadData();
    },[loading])
    function uploadTransaction(){
        console.log('Done');
        
    }
    return (
        
       <div className="SalarySlip">
            <form onSubmit={uploadTransaction}>
            <Typography htmlFor="fromDate" >From Date:</Typography>  
            <Input type="date" name="fromDate" id="fromDate" onChange={calculateSalary}/>
            <br />
            <Typography htmlFor="toDate" >To Date:</Typography>  
            <Input type="date" name="toDate" id="toDate"onChange={calculateSalary}/>
            <br />
            <Typography htmlFor="basic">Basic: </Typography>   
            <Input type="text" id='basic' readOnly/>
            <br />
            <Typography htmlFor="hra">HRA: </Typography>   
            <Input type="text" id='hra' readOnly/>
            <br />
            <Typography htmlFor="da">DA: </Typography>   
            <Input type="text" id='da' readOnly/>
            <br />
            <Typography htmlFor="agp">Academic Grade Pay </Typography>   
            <Input type="text" id='agp' readOnly/>
            <br />
            <Typography htmlFor="pt">Profession Tax </Typography>   
            <Input type="text" id='pt' readOnly/>
            <br />
            <Typography htmlFor="ta">Travel Allowance </Typography>   
            <Input type="text" id='ta' readOnly/>
            <br />
            <Typography htmlFor="leaves">Leaves Taken</Typography>   
            <Input type="number" id="leaves" min="0" max="30" onChange={calculateSalary} defaultValue='0'/>
            <br />
            <Typography htmlFor="salcut">Loss Of Pay: </Typography>   
            <Input type="text" id='salcut' readOnly/>
            <br />
            <Typography htmlFor="pf">PF: </Typography>   
            <Input type="text" id='pf' readOnly/>
            <br />
            <Typography htmlFor="pfec">PF Employee Contribution: </Typography>   
            <Input type="number" id='pfec' onChange={calculateSalary} defaultValue='0'/>
            <br />
            <Typography htmlFor="grossSal">Gross Salary</Typography>   
            <Input type="number" id='grossSal'  defaultValue='0' readOnly/>
            <br />
            <Typography htmlFor="totaldeduction">Total Deduction</Typography>   
            <Input type="number" id='totaldeduction'  defaultValue='0' readOnly/>
            <br />
            <Typography htmlFor="netsal">Net Salary</Typography>   
            <Input type="number" id='netSal'  defaultValue='0' readOnly/>
            <button type="submit">Submit</button>
            </form>
       </div>
    )
}
