import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" component="h1" color="primary" fontWeight="bold">
          CONNECT
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: 'black',
            fontWeight: 'medium',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          REQUIRED FEATURE
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
