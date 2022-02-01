import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { useSlideFormTabState } from "~/components/slide-form/useSlideFormTabState";

export const SlideFormTab = ({
  tab,
  children,
}: PropsWithChildren<{ tab: string }>) => {
  const { isActive, tabDelta, isIdle, isBack } = useSlideFormTabState(tab);

  const styles: Record<string, string> = {
    pointerEvents: isActive ? "auto" : "none",
    position: isActive ? "relative" : "absolute",
    left: isActive ? "unset" : "var(--padding)",
    right: isActive ? "unset" : "var(--padding)",
    bottom: isActive ? "unset" : "var(--padding)",
    // `>= 1` because we want to se the next or previous one
    display: (isIdle && !isActive) || tabDelta >= 1 ? "none" : undefined,
  };

  return (
    <ChildrenWrapper isActive={isActive} isBack={isBack} style={styles}>
      {children}
    </ChildrenWrapper>
  );
};

const getAnimation = (isActive: boolean, isBack: boolean) => {
  if (isBack) {
    return isActive ? "slideInRight" : "slideOutRight";
  } else {
    return isActive ? "slideInLeft" : "slideOutLeft";
  }
};

const ChildrenWrapper = styled.div<{ isActive: boolean; isBack: boolean }>`
  border-radius: inherit;
  animation-name: ${(props) => getAnimation(props.isActive, props.isBack)};
  animation-duration: ${(props) => (props.isActive ? "400ms" : "300ms")};
  animation-timing-function: var(--ease-out);
  animation-fill-mode: forwards;
`;
