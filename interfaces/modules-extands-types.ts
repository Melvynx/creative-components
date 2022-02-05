/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface,@typescript-eslint/no-namespace */
import { Theme as MuiTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

declare module "@emotion/react" {
  // The emotion theme must be exactly the same as the mui theme.
  interface Theme extends MuiTheme {}
}

declare module "@mui/material/styles" {
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

// Chrome / Edge / Opera accept `registerProperty` https://caniuse.com/?search=registerProperty
declare namespace CSS {
  interface PropertyDefinition {
    name: string;
    syntax?: string;
    inherits: boolean;
    initialValue?: string;
  }
  function registerProperty(propertyDefinition: PropertyDefinition): undefined;
}

type CSSVariables = `--${string}`;

// Add CSSVariables to the type of CSSProperties for the `style={}` prop.
declare module "react" {
  interface CSSProperties extends Record<CSSVariables, number | string> {}
}

export {};
