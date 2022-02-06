import { PropsWithChildren } from "react";
import { useRainbowGradient } from "~/hooks/useRainbowGradient";
import styled from "@emotion/styled";

const rainbowColors = [
  "#00bef6",
  "#3ca1fb",
  "#9479e0",
  "#c447a4",
  "#cc0856",
  "#c447a4",
  "#9479e0",
  "#3ca1fb",
  "#00bef6",
  "#23d5e0",
];
// Some sets of colors to use for the rainbow gradient
// "#28f1fe"," #00e3ff"," #00d4ff"," #00c3ff"," #55b1ff"," #809cff"," #a285ea"," #ba6dcd"
// "#d528a7", "#c822ab", "#ba1dae", "#aa1bb2", "#991cb5", "#851eb8", "#6f21bb", "#5325bd", "#2828bf"
// "#38bdf8", "#00c4f7", "#00caf2", "#00d0e8", "#00d4da", "#00d8c7", "#00dbb2", "#00dd9a", "#4ade80"
// "#28f1fe", "#00e2ff", "#00d1ff", "#00bfff", "#00abff", "#0095ff", "#377cff", "#765eed"
// "#23d5e0", "#00c6f1", "#00b3fb", "#4d9cf9", "#8b7fe6", "#b45ec1", "#cb378f", "#cc0856"
// "#23d5e0", "#00bef6, "#3ca1fb, "#9479e0, "#c447a4, "#cc0856"

const transitionDelay = 2000;

export const RainbowButton = ({ children }: PropsWithChildren<unknown>) => {
  const colors = useRainbowGradient(rainbowColors, transitionDelay);
  const colorKeys = Object.keys(colors);

  const buttonStyle =
    colorKeys.length > 0
      ? {
          ...colors,
          transition: `
          ${colorKeys[0]} ${transitionDelay}ms linear,
          ${colorKeys[1]} ${transitionDelay}ms linear,
          ${colorKeys[2]} ${transitionDelay}ms linear,
          filter 200ms var(--ease-in-out)
        `,
          backgroundImage: `
          radial-gradient(
            circle at top left,
            var(${colorKeys[2]}),
            var(${colorKeys[1]}),
            var(${colorKeys[0]})
          )
        `,
        }
      : {
          background: rainbowColors[0],
        };

  return (
    <Button style={buttonStyle}>
      <Content>{children}</Content>
    </Button>
  );
};

const Button = styled.button`
  padding: 16px 24px;
  border-radius: 12px;
  position: relative;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  display: grid;
  place-content: center;
  font-family: var(--font-family-sans-serif);

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 16px;
    background-image: linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.0004) 13.2%,
      hsla(0, 0%, 0%, 0.0016) 24.4%,
      hsla(0, 0%, 0%, 0.0034) 34%,
      hsla(0, 0%, 0%, 0.0059) 42.1%,
      hsla(0, 0%, 0%, 0.0089) 49%,
      hsla(0, 0%, 0%, 0.023) 54.9%,
      hsla(0, 0%, 0%, 0.062) 60%,
      hsla(0, 0%, 0%, 0.103) 64.6%,
      hsla(0, 0%, 0%, 0.147) 68.8%,
      hsla(0, 0%, 0%, 0.193) 73%,
      hsla(0, 0%, 0%, 0.239) 77.2%,
      hsla(0, 0%, 0%, 0.286) 81.8%,
      hsla(0, 0%, 0%, 0.332) 87%,
      hsla(0, 0%, 0%, 0.377) 93%,
      hsla(0, 0%, 0%, 0.4) 100%
    );
  }

  &:before {
    --breathing-room: 4px;
    content: "";
    position: absolute;
    top: var(--breathing-room);
    left: 6px;
    right: 6px;
    height: 8px;
    border-radius: 20px 20px 100px 100px / 10px 10px 20px 20px;

    background-image: linear-gradient(
      to top,
      hsla(0, 0%, 100%, 0) 0%,
      hsla(0, 0%, 100%, 0.04) 6.6%,
      hsla(0, 0%, 100%, 0.074) 13.7%,
      hsla(0, 0%, 100%, 0.102) 21.1%,
      hsla(0, 0%, 100%, 0.126) 28.6%,
      hsla(0, 0%, 100%, 0.147) 36.4%,
      hsla(0, 0%, 100%, 0.164) 44.1%,
      hsla(0, 0%, 100%, 0.178) 51.8%,
      hsla(0, 0%, 100%, 0.192) 59.4%,
      hsla(0, 0%, 100%, 0.204) 66.7%,
      hsla(0, 0%, 100%, 0.217) 73.6%,
      hsla(0, 0%, 100%, 0.231) 80.2%,
      hsla(0, 0%, 100%, 0.246) 86.1%,
      hsla(0, 0%, 100%, 0.264) 91.5%,
      hsla(0, 0%, 100%, 0.285) 96.2%,
      hsla(0, 0%, 100%, 0.31) 100%
    );
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    &:before {
      background-image: linear-gradient(
        to top,
        hsla(0, 0%, 0%, 0) 0 0%,
        hsla(0, 0%, 0%, 0.004) 6.6%,
        hsla(0, 0%, 0%, 0.0074) 13.7%,
        hsla(0, 0%, 0%, 0.0102) 21.1%,
        hsla(0, 0%, 0%, 0.0126) 28.6%,
        hsla(0, 0%, 0%, 0.0147) 36.4%,
        hsla(0, 0%, 0%, 0.0164) 44.1%,
        hsla(0, 0%, 0%, 0.0178) 51.8%,
        hsla(0, 0%, 0%, 0.0192) 59.4%,
        hsla(0, 0%, 0%, 0.0204) 66.7%,
        hsla(0, 0%, 0%, 0.0217) 73.6%,
        hsla(0, 0%, 0%, 0.0231) 80.2%,
        hsla(0, 0%, 0%, 0.0246) 86.1%,
        hsla(0, 0%, 0%, 0.0264) 91.5%,
        hsla(0, 0%, 0%, 0.0285) 96.2%,
        hsla(0, 0%, 0%, 0.031) 100%
      );
    }

    &:after {
      background-image: linear-gradient(
        to bottom,
        hsla(0, 0%, 100%, 0) 0%,
        hsla(0, 0%, 100%, 0.0004) 13.2%,
        hsla(0, 0%, 100%, 0.0016) 24.4%,
        hsla(0, 0%, 100%, 0.0034) 34%,
        hsla(0, 0%, 100%, 0.0059) 42.1%,
        hsla(0, 0%, 100%, 0.0089) 49%,
        hsla(0, 0%, 100%, 0.023) 54.9%,
        hsla(0, 0%, 100%, 0.062) 60%,
        hsla(0, 0%, 100%, 0.103) 64.6%,
        hsla(0, 0%, 100%, 0.147) 68.8%,
        hsla(0, 0%, 100%, 0.193) 73%,
        hsla(0, 0%, 100%, 0.239) 77.2%,
        hsla(0, 0%, 100%, 0.286) 81.8%,
        hsla(0, 0%, 100%, 0.332) 87%,
        hsla(0, 0%, 100%, 0.377) 93%,
        hsla(0, 0%, 100%, 0.4) 100%
      );
    }

    & > span {
      transform: scale(0.9);
    }
  }
`;

const Content = styled.span`
  color: white;
  font-size: 1.2rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
`;
