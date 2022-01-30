import styled from "@emotion/styled";
import {LiHTMLAttributes, PropsWithChildren} from "react";
import {WEIGHTS} from "~/styles/constants";

export const DropdownItem = ({
  children,
  ...props
}: PropsWithChildren<LiHTMLAttributes<HTMLLIElement>>) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

const Wrapper = styled.li`
  width: 100%;
  color: #6e56cf;
  font-size: 1rem;
  padding: 4px 8px;
  font-weight: ${WEIGHTS.normal};
  cursor: pointer;
  min-width: 128px;
  border-radius: 4px;
  font-family: var(--font-family-sans-serif);

  &:hover {
    background: #6e56cf;
    color: white;
  }
`;
