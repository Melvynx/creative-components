import { Theme as MuiTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

declare module '@emotion/react' {
  // The emotion theme must be exactly the same as the mui theme.
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends MuiTheme {}
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export {};
