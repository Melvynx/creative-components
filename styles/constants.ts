export const COLORS = {
  main: "#7f5af0",
  secondary: "#2cb67d",
  primary: "#7f5af0",
  error: "#F24336",
  success: "#66BA6A",
  bg: {
    default: "#16161a",
    paper: "#242629",
  },
  white: "#ffffff",
  gray: {
    100: "hsl(185deg 5% 95%)",
    300: "hsl(190deg 5% 80%)",
    500: "hsl(196deg 4% 60%)",
    700: "hsl(220deg 5% 40%)",
    900: "hsl(220deg 3% 20%)",
  },
  purple: {
    dark: "#6e56cf",
    main: "#6e56cf",
  },
  dark: "#000000",
};

export const WEIGHTS = {
  normal: 500,
  medium: 600,
  bold: 800,
};

export const BREAKPOINTS = {
  tablet: 550,
  laptop: 1100,
  desktop: 1500,
};

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptop / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktop / 16}rem)`,
};
