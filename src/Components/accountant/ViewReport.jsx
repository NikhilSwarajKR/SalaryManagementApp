import React,{useState, useEffect} from 'react';
import {jsPDF} from 'jspdf';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {collection, query,where, getDoc,doc,deleteDoc} from 'firebase/firestore';
import {db,storage} from '../../firebase';
import { renderToString } from "react-dom/server";
import ReactDOMServer from "react-dom/server";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import sjcLOGO from './../image_sources/sjc.png'
import { Button, Typography } from '@mui/material';
import numWords from 'num-words';
import html2canvas from 'html2canvas';
import {Grid} from '@mui/material';
function ViewReport() {
  const [loading,setLoading]= useState(false);
  let transData=JSON.parse(localStorage.getItem('refTransData'));
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  const generatePDF = async()=> {
    const input = document.getElementById('report')
    await html2canvas(input).then((canvas) => {
        const componentWidth = input.offsetWidth
        const componentHeight =input.offsetHeight
        const orientation = componentWidth >= componentHeight ? 'l' : 'p'
        const imgData = canvas.toDataURL('image/jpeg')
        const pdf = new jsPDF({
        orientation,
        unit: 'px'
      })
        pdf.internal.pageSize.width = componentWidth
        pdf.internal.pageSize.height = componentHeight
        pdf.addImage(imgData, 'JPEG', 0, 0, componentWidth, componentHeight)
        pdf.save(`${transData.transID}.pdf`)
      })

  }
return (
    <div>
        <div id="report">
        <Box sx={{ m: 8 }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        
        <TableHead>
          
          <TableRow>
            <TableCell align="center" colSpan={4}>
                <img src={sjcLOGO} height='60px'/>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell align="center" colSpan={4}>
                <Typography variant="body2" gutterBottom>Address: #36, Langford Rd, Langford Gardens, Bengaluru, Karnataka 560027</Typography>
            </TableCell>
          </TableRow>

        </TableHead>

        <TableBody>
        
            <TableRow>
                <TableCell colSpan={2} align="right" >
                    <Typography variant="subtitle1"><b>Pay Slip Of The Month</b></Typography>
                </TableCell>
                <TableCell colSpan={2} align="left" >
                    <Typography >{month[new Date(transData.fromDate.seconds*1000).getMonth()]} {new Date(transData.fromDate.seconds*1000).getFullYear()}</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom>Employee ID</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{transData.empID.toUpperCase()}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom>Department</Typography>
                </TableCell>
                <TableCell>
                    <Typography >{transData.deptName}</Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Employee Name</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{transData.empName}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Designation</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{transData.designation}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Date Of Joining</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{new Date(transData.dateOfJoining.seconds*1000).toLocaleDateString('en-IN')}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >No Of Days</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{transData.noOfDays}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Paid Days</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{transData.totalWorkingDays}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >LOP Days</Typography>
                </TableCell>
                <TableCell>
                    <Typography>{transData.unpaidLeavesTaken}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2} align="center" >
                    <Typography variant="subtitle1" gutterBottom ><b> Earnings</b></Typography>
                </TableCell>   
                <TableCell colSpan={2} align="center" >
                    <Typography variant="subtitle1" gutterBottom ><b> Deductions</b></Typography>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Basic Salary</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.basicPay}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Provident Fund</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.PF}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >House Rent Allowance (HRA)</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.HRA}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Loss Of Pay</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.lossOfPay}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle1" gutterBottom >Dearness Allowance (DA)</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.DA}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle2" gutterBottom >PF Employee Contribution</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.PFEC}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle2" gutterBottom >Grade Pay</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.gradePay}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle2" gutterBottom >Profession Tax</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.PT}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle2" gutterBottom >Travel Allowance (TA)</Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.TA}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle2" gutterBottom ></Typography>
                </TableCell>
                <TableCell>
                    <Typography></Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4}></TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Typography variant="subtitle2" gutterBottom ><b> Gross Salary</b></Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.grossSalary}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="subtitle2" gutterBottom ><b> Total Deduction</b></Typography>
                </TableCell>
                <TableCell>
                    <Typography>&#8377;{transData.totalDeduction}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell  align='right'>
                    <Typography variant="subtitle2" gutterBottom ><b> Net Salary</b></Typography>
                </TableCell>
                <TableCell>
                    <Typography  align='right'>&#8377;{transData.netSalary}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4} align='center'>
                    <Typography>RUPEES {numWords(transData.netSalary).toUpperCase()} ONLY</Typography>
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </div>
    <div>
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Box > <Button onClick={generatePDF} className="align-items-center">Download</Button></Box>   
    </Grid> 
   
    </div>
    </div>
)
}


export default ViewReport