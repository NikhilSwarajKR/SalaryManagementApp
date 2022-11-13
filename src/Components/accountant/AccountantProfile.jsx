import React from 'react'
import AccountantHeader from './AccountantHeader'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import {Container} from '@mui/material';
import { Button } from '@mui/material';
import AccountantImage from '../image_sources/accountant_image.png';
import { sendPasswordReset } from '../AccountantAuth';
import Cookies from 'js-cookie';

function AccountantProfile() {
  const accountantData=JSON.parse(Cookies.get('accountantData'));
  const changePasssword=()=>{
      sendPasswordReset(accountantData.userEmailID);
  }
  return (
    <div>
        <AccountantHeader/>
        <div>
          <div className='rendering'>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
                <Link underline="hover" key="1" color="inherit" href="/AccountantProfile" >Home</Link>
            </Breadcrumbs>
          </div>
         
          <Container fixed sx={{ width: 500, height: 200 }}>
          <Box >
            <div>
              <div className=" mb-3 align-items-center ">
                  <img src={AccountantImage} className="rounded mx-auto d-block" height="150px"/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" >Accountant ID </span>
                <input type="text" className="form-control" disabled defaultValue={accountantData.accountantID}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" >Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="text" className="form-control" disabled defaultValue={accountantData.accountantName}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" >Email ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="text" className="form-control" disabled defaultValue={accountantData.userEmailID}/>
              </div>
            </div>
        </Box>
        <Box >
            <div>
              <Button type='submit' variant='contained' className="rounded mx-auto d-block" onClick={changePasssword}>  <EditIcon style={{ color: "white" }}/>&nbsp;&nbsp;&nbsp;&nbsp;Click here to Change Password&nbsp;&nbsp;</Button>         
            </div>
        </Box>
        </Container>
        </div>
    </div>
  )
}

export default AccountantProfile