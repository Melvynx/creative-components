import { ThemeProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { AppProps } from "next/app";
import "~/styles/override.css";
import "~/styles/reset.css";
import "~/styles/styles.css";
import "~/styles/keyframes.css";
import { theme } from "~/styles/theme";
import { Global, css } from "@emotion/react";
import { COLORS } from "~/styles/constants";
import { flat } from "~/utils/object";

const themeVariables = Object.entries(flat(COLORS))
  .map(([key, value]) => `--color-${key}: ${String(value)};`)
  .join("\n");

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <CssBaseline />
        <Global
          styles={css`
            :root {
              ${themeVariables}
            }
          `}
        />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
