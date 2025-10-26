import React from 'react'
import { AppBar, Toolbar, Box } from '@mui/material'
import connectLogo from '../assets/connect.png'

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#000000' }}>
      <Toolbar>
        <Box
          component="img"
          src={connectLogo}
          alt="CONNECT"
          sx={{
            height: 40,
            width: 'auto',
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header
