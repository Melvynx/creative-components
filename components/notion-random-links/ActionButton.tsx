import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";

export const ActionButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return <Button {...props} />;
};

const Button = styled.button`
  background: var(--color-dark);
  border: 2px solid var(--color-white);
  color: var(--color-white);
  padding: 8px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-family: var(--font-family-sans-serif);
  font-weight: 600;
  border-radius: 2px;

  will-change: transform;
  transition: transform 200ms var(--ease-in-out);

  &:hover {
    transform: scale(1.05);
    transition: transform 100ms var(--ease-out);
  }

  &:active {
    transform: scale(0.95);
    transition: transform 100ms var(--ease-in);
  }
`;
