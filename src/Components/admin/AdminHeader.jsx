import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';
import {Route, Routes} from "react-router-dom";
import Departments from './Departments';
import Employees from './Employees'
import PayScales from './PayScales';
import EditDepartment from './EditDepartment';
import CreateDepartment from './CreateDepartment';
import CreatePayScale from './CreatePayScale';
import EditPayScale from './EditPayScale';
import CreateEmployee from './CreateEmployee';
import ManageEmployee from './ManageEmployee';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="Header">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CurrencyRupeeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SALAIRE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
              <MenuItem>
                <Typography textAlign="center"onClick={() => navigate('/Teaching')}>Teaching</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center"onClick={() => navigate('/NonTeaching')}>Non Teaching</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center"onClick={() => navigate('/Reports')}>Reports</Typography>
              </MenuItem>
              </Menu>
            </Box>
            <CurrencyRupeeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
             SALAIRE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/Departments')}>Departments</Button>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/Employees')}>Employees</Button>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/PayScales')}>Pay Scales</Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              <MenuItem>
                <Typography textAlign="center"onClick={() => navigate('/')}>Profile</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center"onClick={() => navigate('/')}>Change Password</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center"onClick={() => navigate('/')}>Logout</Typography>
              </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route exact path='/Departments' element={<Departments/>}/>
        <Route exact path='/EditDepartment' element={<EditDepartment/>}/>
        <Route exact path='/CreateDepartment' element={<CreateDepartment/>}></Route>
        
        <Route exact path='/Employees' element={<Employees/>}/>
        <Route exact path='/CreateEmployee' element={<CreateEmployee/>}></Route>
        <Route exact path='/ManageEmployee' element={<ManageEmployee/>}></Route>
        <Route exact path='/PayScales' element={<PayScales/>}/>     
        <Route exact path='/CreatePayScale' element={<CreatePayScale/>}></Route>
        <Route exact path='/EditPayScale' element={<EditPayScale/>}></Route>

      </Routes>
    </div>  
  );
};
export default AdminHeader;
