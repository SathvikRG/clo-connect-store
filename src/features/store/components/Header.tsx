import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'primary.main',
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-start' }}>
        <Typography variant="h5" component="h1" color="primary" fontWeight="bold">
          CONNECT
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header
