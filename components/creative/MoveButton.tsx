import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const MoveButton = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <Wrapper>
      <Button {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #000000;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;

  &:hover > button {
    transform: translate(-4px, -4px);

    transition: transform 150ms var(--ease-in);
  }

  &:active > button {
    transform: translate(0px, 0px);
    transition: transform 50ms var(--ease-in);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #f4f4f0;
  border-radius: 4px;
  border: 1px solid #000000;
  cursor: inherit;

  will-change: transform;
  transition: transform 300ms var(--ease-in-out);
`;
