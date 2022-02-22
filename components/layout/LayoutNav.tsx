import styled from "@emotion/styled";
import Link from "next/link";
import { WEIGHTS } from "~/styles/constants";
import {
  DropdownItem,
  DropdownItems,
  DropdownManager,
  DropdownMenu,
} from "~/components/dropdown";

export const LayoutNav = () => {
  return (
    <>
      <Link href="/">
        <NavItem>Home</NavItem>
      </Link>

      <DropdownMenu mode="click">
        <DropdownItems>
          <Item>Notify me</Item>
          <Item>Dropdown</Item>
          <Item>Slide Form</Item>
          <Item>Two FA</Item>
          <Item>Shadow button</Item>
          <Item>Gumroad Button</Item>
          <Item>Tooltip</Item>
          <Item>Notion</Item>
        </DropdownItems>
        <DropdownManager>
          <NavItem>Components</NavItem>
        </DropdownManager>
      </DropdownMenu>
    </>
  );
};

const Item = ({ children }: { children: string }) => {
  return (
    <DropdownItem
      href={`/examples/${children.replaceAll(" ", "_").toLocaleLowerCase()}`}
    >
      {children}
    </DropdownItem>
  );
};

const NavItem = styled.a`
  list-style-type: none;
  font-size: 1rem;
  font-family: var(--font-family-sans-serif);
  font-weight: ${WEIGHTS.bold};
  cursor: pointer;
  color: ${({ theme }) => theme.palette.neutral.light};

  &:hover {
    text-decoration: underline;
  }
`;
