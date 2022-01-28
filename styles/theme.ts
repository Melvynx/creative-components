import { createTheme } from '@mui/material';
import { BREAKPOINTS } from './constants';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7f5af0',
    },
    secondary: {
      main: '#2cb67d',
    },
    neutral: {
      main: '#ffffff',
    },
    background: {
      default: '#16161a',
      paper: '#242629',
    },
  },
  breakpoints: {
    values: BREAKPOINTS,
  },
});
