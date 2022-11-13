import React from 'react'
import { db } from "../../firebase";
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';

import {
    doc,
    setDoc
  } from "firebase/firestore";
import AdminHeader from './AdminHeader';

function CreatePayScale() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        var bps_Id = document.getElementById("bps_Id").value;
        const basic = parseFloat(document.getElementById("basic").value);
        const da = parseFloat(document.getElementById("da").value);
        const designation = document.getElementById("designation").value;
        const grade_pay =parseFloat ( document.getElementById("grade_pay").value);
        const hra = parseFloat(document.getElementById("hra").value);
        const pf = parseFloat(document.getElementById("pf").value);
        const pt =parseFloat (document.getElementById("pt").value);
        const ta =parseFloat (document.getElementById("ta").value);
        bps_Id='bps'+bps_Id
        try {
            await setDoc(doc(db, "basicpayscale", bps_Id),{
               basic:basic,
               da:da,
               designation:designation,
               grade_pay:grade_pay,
               hra:hra,
               pf:pf,
               pt:pt,
               ta:ta, 
            }

       ) 
    }
    catch(err){
        alert(err);
    }
    navigate('/PayScales');
}

  return (
    <div>
        <AdminHeader/>
        <div className='rendering'>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
        <Link underline="hover" key="1" color="inherit" href="/AdminProfile">Home</Link>
        <Link underline="hover" key="2" color="inherit" href="/PayScales" >Pay Scales</Link>
        <Link underline="hover" key="3" color="inherit" href="/CreatePayScale" >Create Pay Scale</Link>
    </Breadcrumbs>
    <div className='rendering'>
        <form align="center">
            <div className="input-group mb-3">
                <span className="input-group-text" >PayScale ID &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >BPS</span>
                <input type="number" className="form-control" required id="bps_Id" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >Designation &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="text" className="form-control" pattern="^[a-zA-Z_ ]*$" required id="designation"   />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >Basic Pay &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >&#8377;</span>
                <input type="number" className="form-control" required id="basic" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >Dearness Allowance(DA) &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >%</span>
                <input type="number" className="form-control" required id="da"  />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >House Rent Allowance(HRA) &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >%</span>
                <input type="number" className="form-control" required id="hra"  />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >Provident Fund(PF) &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >%</span>
                <input type="number" className="form-control" required id="pf"  />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >Grade Pay &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >&#8377;</span>
                <input type="number" className="form-control" required id="grade_pay"  />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >Profession Tax &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >&#8377;</span>
                <input type="number" className="form-control" required id="pt"  />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" >Travel Allowance &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="input-group-text" >&#8377;</span>
                <input type="number" className="form-control" required  id="ta"  />
            </div>
            <Button type="submit" variant="contained" onClick={handleSubmit}>Create</Button>
        </form>
      
    </div>
    </div>
    </div>
  )
}

export default CreatePayScale;