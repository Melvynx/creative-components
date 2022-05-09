import { ThemeProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import { theme } from "~/styles/theme";
import { Global, css } from "@emotion/react";
import { COLORS } from "~/styles/constants";
import { flat } from "~/utils/object";

import "~/styles/override.css";
import "~/styles/reset.css";
import "~/styles/styles.css";
import "~/styles/keyframes.css";
import { NextJSRouterLoader } from "~/components/NextJSRouterLoader";
import Layout from "~/components/layout/Layout";

const themeVariables = Object.entries(flat(COLORS))
  .map(([key, value]) => `--color-${key}: ${String(value)};`)
  .join("\n");

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <CssBaseline />
        <Global
          styles={css`
            :root {
              ${themeVariables}
            }
          `}
        />
        <NextJSRouterLoader />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
