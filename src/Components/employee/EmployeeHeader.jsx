import React, {useState,useEffect} from 'react';
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
import Cookies from 'js-cookie';
import {ref,getDownloadURL} from "firebase/storage";
import {doc,getDoc} from 'firebase/firestore';
import { db ,storage} from "../../firebase";

import {logout} from "./../AdminAuth";
  const EmployeeHeader = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loading,setLoading]= useState(false);
  const [imageURL, setURL] = useState();

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
  const navigateLogout=()=>{
    localStorage.clear();
    Cookies.remove('employeeData', { path: '' });
    logout();
    navigate('/');
  }
  
  const fetchImage=async(id)=>{
    const empRef = doc(db, "employees", id);
    const docSnap = await getDoc(empRef);
    const imageRef = ref(storage, `employee_images/${docSnap.data().img}`)
    getDownloadURL(imageRef)
    .then((url) => {
        setLoading(true);
        setURL(url)
    })
    .catch((error) => {
      console.log(error)
    });
  }
  const checkUser=()=>{
    const employeeData=JSON.parse(Cookies.get('employeeData'))
    if(employeeData){
        fetchImage(employeeData.employeeID)
      return
    }
    else{
      navigateLogout();
    }
  }
  useEffect(()=>{
    checkUser()
  },[loading])
  return (
    <div>
        {loading ?(
     <div className="Header">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CurrencyRupeeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/EmployeeProfile"
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
                <Typography textAlign="center"onClick={() => navigate('EmployeeProfile')}>Profile</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center"onClick={() => navigate('SalarySlips')}>Salary Slips</Typography>
              </MenuItem>
              </Menu>
            </Box>
            <CurrencyRupeeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/EmployeeProfile"
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
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/EmployeeProfile')}>Profile</Button>
              <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate('/SalarySlips')}>Salary Slips</Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Employee" src={imageURL} />
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
                <Typography textAlign="center"onClick={() => navigate('/EmployeeProfile')}>&nbsp;&nbsp;Profile&nbsp;&nbsp;</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center" onClick={navigateLogout}>&nbsp;&nbsp;Logout&nbsp;&nbsp;</Typography>
              </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
    ):(
        <div/>
      )}  
    </div>
    
  );
};
export default EmployeeHeader;
