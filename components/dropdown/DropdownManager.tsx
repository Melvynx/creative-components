import { Reference } from "react-popper";
import React, { PropsWithChildren } from "react";
import { useDropdownMenuContext } from "~/components/dropdown/DropdownMenu";
import styled from "@emotion/styled";

export const DropdownManager = ({ children }: PropsWithChildren<unknown>) => {
  const { setIsOpen, mode } = useDropdownMenuContext();

  const isHover = mode === "hover";
  const isClick = mode === "click";

  const onOpen = () => {
    if (!isHover) return;
    setIsOpen(true);
  };

  const onClose = () => {
    if (!isHover) return;
    setIsOpen(false);
  };

  const onToggle = () => {
    if (!isClick) return;
    setIsOpen((p) => !p);
  };

  return (
    <Reference>
      {(props) => (
        <ReferenceWrapper
          onMouseOver={onOpen}
          onMouseLeave={onClose}
          onClick={onToggle}
          ref={props.ref}
        >
          {children}
        </ReferenceWrapper>
      )}
    </Reference>
  );
};

const ReferenceWrapper = styled.div`
  width: fit-content;
`;
