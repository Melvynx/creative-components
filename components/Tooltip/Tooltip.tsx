import {
  offset,
  Placement,
  shift,
  useFloating,
  arrow,
  flip,
} from "@floating-ui/react-dom";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { BasePlacement } from "@floating-ui/core/src/types";

type TooltipProps = {
  open?: boolean;
  placement?: Placement;
  duration?: number;
  title: string;
};
const sides: Record<BasePlacement, BasePlacement> = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};

export const Tooltip = ({
  open: defaultOpen = false,
  placement = "top",
  children,
  duration = 300,
  title,
}: PropsWithChildren<TooltipProps>) => {
  const [open, setOpen] = useState(defaultOpen);
  const arrowRef = useRef(null);

  const { x, y, reference, floating, strategy, middlewareData, update } =
    useFloating({
      placement: placement,
      middleware: [shift(), arrow({ element: arrowRef }), offset(10), flip()],
    });

  useEffect(() => {
    const handleChange = () => {
      update();
    };

    window.addEventListener("resize", handleChange);
    window.addEventListener("scroll", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
      window.removeEventListener("scroll", handleChange);
    };
  }, []);

  const staticSide = sides[placement.split("-")[0]];

  return (
    <>
      <div
        ref={reference}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
      <TooltipWrapper
        duration={duration}
        open={open}
        ref={floating}
        style={{
          position: strategy,
          top: y ?? "",
          left: x ?? "",
        }}
      >
        {title}
        <Arrow
          style={{
            position: strategy,
            left:
              middlewareData.arrow?.x != null
                ? `${middlewareData.arrow?.x}px`
                : "",
            top:
              middlewareData.arrow?.y != null
                ? `${middlewareData.arrow?.y}px`
                : "",
            right: "",
            bottom: "",
            [staticSide]: "calc(-0.5 * (var(--size)))",
          }}
          ref={arrowRef}
        />
      </TooltipWrapper>
    </>
  );
};

const tooltipAnimationOpen = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.5)",
  },
  "50%": {
    opacity: 0.5,
    transform: "scale(1.2)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});

const tooltipAnimationClose = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1)",
  },
  "100%": {
    opacity: 0,
    transform: "scale(0)",
  },
});

const TooltipWrapper = styled.div<{ open: boolean; duration: number }>`
  background: var(--color-white);
  padding: 4px;
  color: var(--color-purple-main);
  border-radius: 4px;
  pointer-events: none;

  animation: ${({ open }) =>
      open ? tooltipAnimationOpen : tooltipAnimationClose}
    ${({ duration }) => duration}ms var(--ease-out) forwards;
`;

const Arrow = styled.div`
  --size: 8px;
  position: absolute;
  background: var(--color-white);
  width: var(--size);
  height: var(--size);

  transform: rotate(45deg);
`;
