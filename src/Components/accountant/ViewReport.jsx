import React,{useState, useEffect} from 'react';
import jsPDF from 'jspdf';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {collection, query,where, getDoc,doc,deleteDoc} from 'firebase/firestore';
import {db,storage} from '../../firebase';
import { renderToString } from "react-dom/server";
import ReactDOMServer from "react-dom/server";
 

function ViewReport() {
  const [loading,setLoading]= useState(false);
  let transData=JSON.parse(localStorage.getItem('refTransData'));
  
  const generatePDF = () => {
    const pdfElement = document.getElementById('Report') // HTML element to be converted to PDF
    var doc = new jsPDF();
    doc.fromHTML(ReactDOMServer.renderToStaticMarkup(pdfElement));
    doc.save("myDocument.pdf");

  ;
  }
return (
  <div>
    <div className="Report" id='Report'>
    <div class="container-fluid">
    
    <div class="row">
        <div class="col-12 text-center border m-0 font-weight-bold">Employee Details</div>
        <div class="col-2 border p-1  font-weight-bold">Employee ID</div>
        <div class="col-4 border p-1">{transData.empID.toUpperCase()}</div>
        <div class="col-2 border p-1  font-weight-bold">Employee Name</div>
        <div class="col-4 border p-1">{transData.empName}</div>
        <div class="col-2 border p-1  font-weight-bold">Department</div>
        <div class="col-4 border p-1">{transData.deptName}</div>
        <div class="col-2 border p-1 font-weight-bold">Designation</div>
        <div class="col-4 border p-1">{transData.designation}</div>
    </div>
    
    <div class="row">
        <div class="col-4 border p-1">Details</div>
        <div class="col-4 border p-1">Allowances</div>
        <div class="col-4 border p-1">Deduction</div>
        
        <div class="col-4 border p-1">
            <dl class="row">
                <dt class="col-7">Basic Salary</dt>
                <dd class="text-right col-5">{transData.basicPay}</dd>
                <dt class="col-7">HRA</dt>
                <dd class="text-right col-5">{transData.HRA}</dd>
                <dt class="col-7">Total Working Days</dt>
                <dd class="text-right col-5">{transData.totalWorkingDays}</dd>
                <dt class="col-7">Absences <small>(days)</small></dt>
                <dd class="text-right col-5"></dd>
                <dt class="col-7">Late/Undertime <small>(mins)</small></dt>
                <dd class="text-right col-5"></dd>
            </dl>
        </div>
        <div class="col-4 border p-1">
            <dl class="row">
               
                    <dt class="col-7"></dt>
                    <dd class="text-right col-5"></dd>
               
                <dt class="col-7">Total</dt>
                <dd class="text-right col-5"></dd>
            </dl>
        </div>
        <div class="col-4 border p-1">
            <dl class="row">
                
                    <dt class="col-7"></dt>
                    <dd class="text-right col-5"></dd>
               
                <dt class="col-7">Total</dt>
                <dd class="text-right col-5"></dd>
            </dl>
        </div>
    </div>
    <div class="d-flex w-100 mt-3">
        <div class="col-auto flex-shrink-1 flex-grow-1 text-right h4"><b>Net Income:</b></div>
        <div class="col-auto px-3 h4"><b></b></div>
    </div>
    <hr/>
    <div class="clear-fix mb-3"></div>
</div>
    </div>
    <div>
    <button onClick={generatePDF}>Download</button>
    </div>
  </div>
)
}


export default ViewReport