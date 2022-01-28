import { ThemeProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import '~/styles/override.css';
import '~/styles/reset.css';
import '~/styles/styles.css';
import { theme } from '~/styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <CssBaseline />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
