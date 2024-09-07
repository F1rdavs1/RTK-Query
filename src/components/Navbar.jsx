import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const navItems = ['User', 'Car', 'Product'];

function Navbar() {

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <div className='space-x-1'>
            <NavLink className={'text-[18px] font-normal px-[10px] py-[3px] rounded-md duration-300'} to={'/'}>Home</NavLink>
            <NavLink className={'text-[18px] font-normal px-[10px] py-[3px] rounded-md duration-300'} to={'/car'}>Car</NavLink>
            <NavLink className={'text-[18px] font-normal px-[10px] py-[3px] rounded-md duration-300'} to={'/products'}>About</NavLink>
          </div>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
