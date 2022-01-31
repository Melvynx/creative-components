import { createTheme } from '@mui/material';
import {BREAKPOINTS, COLORS} from './constants';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
    neutral: {
      main: COLORS.white,
    },
    background: {
      default: COLORS.bg.default,
      paper: COLORS.bg.paper,
    },
  },
  breakpoints: {
    values: BREAKPOINTS,
  },
});
