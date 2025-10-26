import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#666666', // neutral grey
    },
    secondary: {
      main: '#00bfff', // accent-blue
    },
    background: {
      default: '#1a1a1a', // dark-bg
      paper: '#2a2a2a', // dark-panel
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1a1a1a',
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#888888',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#888888',
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#cccccc',
          '&.Mui-checked': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          '& fieldset': {
            borderColor: '#666666',
          },
          '&:hover fieldset': {
            borderColor: '#888888',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#888888',
          },
        },
      },
    },
  },
});
