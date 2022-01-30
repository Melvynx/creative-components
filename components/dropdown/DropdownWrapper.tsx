import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const DropdownMenuPopperLazy = dynamic(
  async () => import("./DropdownMenuPopper"),
  {
    ssr: false,
  }
);

export const DropdownItems = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <DropdownMenuPopperLazy>
      <Wrapper>{children}</Wrapper>
    </DropdownMenuPopperLazy>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;
