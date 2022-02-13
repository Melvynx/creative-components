import styled from "@emotion/styled";
import React, { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import { Popper } from "react-popper";
import { keyframes } from "@emotion/react";
import { useDropdownMenuContext } from "~/components/dropdown/DropdownMenu";

export default function DropdownMenuPopper({
  children,
}: PropsWithChildren<unknown>) {
  const { isOpen, setIsOpen } = useDropdownMenuContext();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e) => {
      if (e.key == "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <BackgroundBlur onClick={() => setIsOpen(false)} />
      <Popper>
        {(props) => (
          <PopperContainer style={props.style} ref={props.ref}>
            <PopperCard>
              <PopperArrowWrapper>
                <PopperArrow />
              </PopperArrowWrapper>
              {children}
            </PopperCard>
          </PopperContainer>
        )}
      </Popper>
    </>,
    document.querySelector("#portal")
  );
}

const BackgroundBlur = styled.div`
  background: rgba(0, 0, 0, 0.01);
  position: absolute;
  inset: 0;
`;

const sideUp = keyframes({
  from: {
    transform: "translateY(16px)",
    opacity: 0.2,
  },
  to: {
    transform: "translateY(8px)",
    opacity: 1,
  },
});

const PopperArrowWrapper = styled.div`
  --arrow-size: 16px;
  position: absolute;
  right: 0;
  left: 0;
  height: var(--arrow-size);
  top: calc(-0.95 * var(--arrow-size));

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopperContainer = styled.div`
  filter: drop-shadow(0px 0px 16px hsl(0 0% 0% / 0.5));
`;

const PopperArrow = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  clip-path: polygon(50% 55%, 0% 100%, 100% 100%);
  background: var(--color-white);
`;

const PopperCard = styled.div`
  position: relative;
  background-color: var(--color-white);
  padding: 6px;
  border-radius: 4px;
  color: #393ee3;
  animation: ${sideUp} 250ms var(--ease-in-out) forwards;
`;
