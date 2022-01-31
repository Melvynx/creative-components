import styled from "@emotion/styled";
import Link from "next/link";
import { WEIGHTS } from "~/styles/constants";
import {
  DropdownItem,
  DropdownItems,
  DropdownManager,
  DropdownMenu,
} from "~/components/dropdown";

export const NavItems = () => {
  return (
    <>
      <Link href="/">
        <NavItem>Home</NavItem>
      </Link>

      {/* Get this item using the nextjs static props */}
      <DropdownMenu mode="click">
        <DropdownItems>
          <Link href="/examples/notify_me">
            <DropdownItem>Notify me</DropdownItem>
          </Link>
          <Link href="/examples/dropdown">
            <DropdownItem>Dropdown</DropdownItem>
          </Link>
          <Link href="/examples/slide_form">
            <DropdownItem>Slide form</DropdownItem>
          </Link>
        </DropdownItems>
        <DropdownManager>
          <NavItem>Components</NavItem>
        </DropdownManager>
      </DropdownMenu>
    </>
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
