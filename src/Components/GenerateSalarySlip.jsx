import {TextField,Button} from '@mui/material';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {db} from './../firebase';
import uuid from 'react-uuid';


export default function GenerateSalarySlip() {
    const [loading,setLoading]= useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const empData=JSON.parse(localStorage.getItem('RefEmpData'));
      const errorHandleOpen= () => {
        setOpen(true);
      };

      const errorHandleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setOpen(false);
      };
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
        document.getElementById('basic').value=Math.round(basicPay);
        document.getElementById('hra').value=Math.round(hra);
        document.getElementById('da').value=Math.round(da);
        document.getElementById('pf').value=Math.round(pf);
        document.getElementById('pt').value=Math.round(pt);
        document.getElementById('agp').value=Math.round(gradePay);
        document.getElementById('ta').value=Math.round(ta);
        document.getElementById('submitButton').disabled = true;
        setLoading(true);
    }
    function handleChange(){
        var fromDate = new Date(document.getElementById('fromDate').value);
        var toDate = new Date(document.getElementById('toDate').value);
        if(fromDate>toDate){
          document.getElementById('submitButton').disabled = true;
          errorHandleOpen();
          return
        }
        else{
          document.getElementById('submitButton').disabled = false;
          errorHandleClose();
        }
        var leaves = parseFloat(document.getElementById('leaves').value);
        var pfec=parseFloat(document.getElementById('pfec').value);
        
        var pre_exp =Math.floor(((empData.pre_yoe.years*12)+empData.pre_yoe.months)/12)/2;
        var days=(toDate.getTime() - fromDate.getTime())/(1000 * 3600 * 24)+1;
        var doj=new Date(empData.doj.seconds*1000);
        var cur_exp=Math.floor((fromDate.getTime()-doj.getTime())/(1000 * 3600 * 24)/365);
        var basicPay=parseFloat(empData.bpsBasic);
        var gradePay=parseFloat(empData.bpsAGP);
        var ta=parseFloat(empData.bpsTA);
        var basicInc;
        var exp=pre_exp+cur_exp;
        for(let i=0;i<exp;i++){
            basicInc=basicPay*0.03;
            basicPay=basicPay+basicInc;
        }
        var hra= Math.round((basicPay*parseFloat(empData.bpsHRA)/100),2);
        var da= basicPay*parseFloat(empData.bpsDA)/100;
        var perDaySal=(basicPay+hra+da+gradePay+ta)/30;
        var lossOfPay=leaves*(perDaySal);
        var totDays=days-leaves;
        var pf= basicPay*parseFloat(empData.bpsPF)/100;
        var pt=parseFloat(empData.bpsPT);
        var grossSal=days*(perDaySal);
        var totDed=lossOfPay+pfec+pf;
        var netSal=grossSal-totDed;
        document.getElementById('basic').value=Math.round(basicPay);
        document.getElementById('hra').value=Math.round(hra);
        document.getElementById('da').value=Math.round(da);
        document.getElementById('salcut').value=Math.round(lossOfPay);
        document.getElementById('pf').value=Math.round(pf);
        document.getElementById('pt').value=Math.round(pt);
        document.getElementById('grossSal').value=Math.round(grossSal);
        document.getElementById('totDed').value=Math.round(totDed);
        document.getElementById('netSal').value=Math.round(netSal);
        document.getElementById('agp').value=Math.round(gradePay);
        document.getElementById('ta').value=Math.round(ta);
        document.getElementById('totDays').value=Math.round(totDays);
    }
    useEffect(()=>{
        loadData();
    },[loading]);

    const uploadTransaction=async(e)=>{
        e.preventDefault();
        var transID = uuid().replaceAll('-', '');
        const docData = {
          empID:empData.empID,
          empName:empData.firstName+" "+empData.lastName,
          deptName:empData.deptName,
          designation:empData.designation,
          fromDate: Timestamp.fromDate(new Date(document.getElementById('fromDate').value)),
          toDate: Timestamp.fromDate(new Date(document.getElementById('toDate').value)),
          transactionDate: Timestamp.fromDate(new Date()),
          basicPay:parseFloat(document.getElementById('basic').value),
          HRA:parseFloat(document.getElementById('hra').value), 
          DA:parseFloat(document.getElementById('da').value), 
          GradePay:parseFloat(document.getElementById('agp').value),
          TA:parseFloat(document.getElementById('ta').value),
          totalWorkingDays:parseInt(document.getElementById('totDays').value),
          PT:parseFloat(document.getElementById('pt').value),
          leaves:parseFloat(document.getElementById('leaves').value), 
          lossOfPay:parseFloat(document.getElementById('salcut').value), 
          PF:parseFloat(document.getElementById('pf').value),
          PFEC:parseFloat(document.getElementById('pf').value), 
          grossSal:parseFloat(document.getElementById('grossSal').value), 
          totalDeduction:parseFloat(document.getElementById('totDed').value), 
          netSal:parseFloat(document.getElementById('netSal').value), 
        };
       try{
          await setDoc(doc(db, "transactions", transID), docData);
          navigate('/EmployeeDetails/EmployeeReports');
        }
        catch(error){
          console.log(error);
        }
    }
    return (
        
       <div className="SalarySlip">
        <Snackbar open={open}  onClose={errorHandleClose}>
            <Alert severity="error" sx={{ width: '100%' }}>Invalid Date Range</Alert>
        </Snackbar>
         <Box  component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off">
            <div>
                <TextField id="fromDate" onChange={handleChange} type="date" InputProps={{startAdornment: <InputAdornment position="start">From Date</InputAdornment>}}required/>  
                <TextField id="toDate" onChange={handleChange} type="date" InputProps={{startAdornment: <InputAdornment position="start">To Date</InputAdornment>}}required/>
            </div>
            
            <div>            
                <TextField id="basic" label="Basic Salary" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="hra" label="House Rent Allowance(HRA)"  type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="da" label="Dearness Allowance(DA)" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="agp" label="Academic Grade Pay" type="number"InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="ta" label="Travel Allowance" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}required/>          
            </div>
              
            <div>
                <TextField id="totDays" label="No of Working Days" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}required/>
                <TextField id="pt" label="Profession Tax" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}required/>
                <TextField id="leaves" label="Number of Leaves Taken" onChange={handleChange} type="number" InputProps={{inputProps: { max: 30, min: 0,defaultValue:0}}}/>
                <TextField id="salcut" label="Loss of Pay" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}/>
                <TextField id="pf" label="Provident Fund(PF)" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="pfec" label="PF Employee Contribution" onChange={handleChange} type="number" InputProps={{inputProps: {min: 0,defaultValue:0}}}required/>
                <TextField id="grossSal" label="Gross Salary" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="totDed" label="Total Deduction" type="number"InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="netSal" label="Net Salary" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
            </div>
            <div>
                <Button variant="contained" id="submitButton" onClick={uploadTransaction}>Submit</Button>
            </div>
          
           </Box>       
       </div>
    )
}
