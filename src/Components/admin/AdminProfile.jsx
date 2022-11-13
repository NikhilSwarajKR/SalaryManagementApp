import React from 'react'
import AdminHeader from './AdminHeader'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import {Container} from '@mui/material';
import { Button } from '@mui/material';
import AdminImage from '../image_sources/admin_image.webp'
import { sendPasswordReset } from '../AdminAuth';
import Cookies from 'js-cookie';

function AdminProfile() {
  const adminData=JSON.parse(Cookies.get('adminData'));
  const changePasssword=()=>{
      sendPasswordReset(adminData.userEmailID);
  }
  return (
    <div>
        <AdminHeader/>
        <div>
          <div className='rendering'>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}aria-label="breadcrumb">
                <Link underline="hover" key="1" color="inherit" href="/AdminProfile" >Home</Link>
            </Breadcrumbs>
          </div>
         
          <Container fixed sx={{ width: 500, height: 200 }}>
          <Box >
            <div>
              <div className=" mb-3 align-items-center ">
                  <img src={AdminImage} className="rounded mx-auto d-block" height="150px"/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" >Admin ID &nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="text" className="form-control" disabled defaultValue={adminData.adminID}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" >Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="text" className="form-control" disabled defaultValue={adminData.adminName}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" >Email ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="text" className="form-control" disabled defaultValue={adminData.userEmailID}/>
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

export default AdminProfile