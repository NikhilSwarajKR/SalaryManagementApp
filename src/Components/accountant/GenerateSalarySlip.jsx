import {TextField,Button} from '@mui/material';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {db} from '../../firebase';
import { v4 } from "uuid";
import { Grid } from '@mui/material';

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
        document.getElementById('gp').value=Math.round(gradePay);
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
        var unpaidLeaves = parseFloat(document.getElementById('unpaidLeavesTaken').value);
        var pfec=parseFloat(document.getElementById('pfec').value);
        
        var pre_exp =Math.floor(((empData.pre_yoe.years*12)+empData.pre_yoe.months)/12)/2;
        var noOfDays=(toDate.getTime() - fromDate.getTime())/(1000 * 3600 * 24)+1;
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
        var perDaySalary=(basicPay+hra+da+gradePay+ta)/30;
        var lossOfPay=unpaidLeaves*(perDaySalary);
        var totalWorkingDays=noOfDays-unpaidLeaves;
        var pf= basicPay*parseFloat(empData.bpsPF)/100;
        var pt=parseFloat(empData.bpsPT);
        var grossSalary=totalWorkingDays*(perDaySalary);
        var totalDeduction=lossOfPay+pfec+pf+pt;
        var netSalary=grossSalary-totalDeduction;
        document.getElementById('basic').value=Math.round(basicPay);
        document.getElementById('hra').value=Math.round(hra);
        document.getElementById('da').value=Math.round(da);
        document.getElementById('lossOfPay').value=Math.round(lossOfPay);
        document.getElementById('pf').value=Math.round(pf);
        document.getElementById('pt').value=Math.round(pt);
        document.getElementById('grossSalary').value=Math.round(grossSalary);
        document.getElementById('totalDeduction').value=Math.round(totalDeduction);
        document.getElementById('netSalary').value=Math.round(netSalary);
        document.getElementById('gp').value=Math.round(gradePay);
        document.getElementById('ta').value=Math.round(ta);
        document.getElementById('noOfDays').value=Math.round(noOfDays);
        document.getElementById('totalWorkingDays').value=Math.round(totalWorkingDays);
    }
    useEffect(()=>{
        loadData();
    },[loading]);

    const uploadTransaction=async(e)=>{
        e.preventDefault();
        var transID =v4().replaceAll('-', '');
        const docData = {
          empID:empData.empID,
          empName:empData.firstName+" "+empData.lastName,
          deptName:empData.deptName,
          designation:empData.designation,
          dateOfJoining:new Timestamp(empData.doj.seconds,empData.doj.nanoseconds),
          fromDate: Timestamp.fromDate(new Date(document.getElementById('fromDate').value)),
          toDate: Timestamp.fromDate(new Date(document.getElementById('toDate').value)),
          transactionDate: Timestamp.fromDate(new Date()),
          basicPay:parseFloat(document.getElementById('basic').value),
          HRA:parseFloat(document.getElementById('hra').value), 
          DA:parseFloat(document.getElementById('da').value), 
          gradePay:parseFloat(document.getElementById('gp').value),
          TA:parseFloat(document.getElementById('ta').value),
          PT:parseFloat(document.getElementById('pt').value),
          noOfDays:parseFloat(document.getElementById('noOfDays').value), 
          totalWorkingDays:parseFloat(document.getElementById('totalWorkingDays').value), 
          unpaidLeavesTaken:parseFloat(document.getElementById('unpaidLeavesTaken').value), 
          lossOfPay:parseFloat(document.getElementById('lossOfPay').value), 
          PF:parseFloat(document.getElementById('pf').value),
          PFEC:parseFloat(document.getElementById('pfec').value), 
          grossSalary:parseFloat(document.getElementById('grossSalary').value), 
          totalDeduction:parseFloat(document.getElementById('totalDeduction').value), 
          netSalary:parseFloat(document.getElementById('netSalary').value), 
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
              <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                <div className=" mb-3 align-items-center">
                  <TextField id="fromDate" onChange={handleChange} type="date" InputProps={{startAdornment: <InputAdornment position="start">From Date</InputAdornment>}}required/>  
                  <TextField id="toDate" onChange={handleChange} type="date" InputProps={{startAdornment: <InputAdornment position="start">To Date</InputAdornment>}}required/>
                </div>
               </Grid> 
            <div>            
                <TextField id="basic" label="Basic Salary" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="hra" label="House Rent Allowance(HRA)"  type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="da" label="Dearness Allowance(DA)" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="gp" label="Grade Pay" type="number"InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="ta" label="Travel Allowance" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}required/>          
            </div>
              
            <div>
                <TextField id="pt" label="Profession Tax" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}required/>
                <TextField id="noOfDays" label="No of Days" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}required/>
                <TextField id="totalWorkingDays" label="No of Working Days" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}required/>
                <TextField id="unpaidLeavesTaken" label="Unpaid Leaves Taken" onChange={handleChange} type="number" InputProps={{inputProps: { max: 30, min: 0,defaultValue:0}}}/>
                <TextField id="lossOfPay" label="Loss of Pay" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}}/>
                <TextField id="pf" label="Provident Fund(PF)" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="pfec" label="PF Employee Contribution" onChange={handleChange} type="number" InputProps={{inputProps: {min: 0,defaultValue:0}}}required/>
                <TextField id="grossSalary" label="Gross Salary" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="totalDeduction" label="Total Deduction" type="number"InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
                <TextField id="netSalary" label="Net Salary" type="number" InputProps={{inputProps: {defaultValue:0,readOnly: true}}} required/>
            </div>
            <div>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Button variant="contained" id="submitButton" onClick={uploadTransaction}>Submit</Button>
            </Grid>
                
            </div>
          
           </Box>       
       </div>
    )
}
