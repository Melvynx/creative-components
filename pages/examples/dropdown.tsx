import styled from "@emotion/styled";
import { DropdownMenu } from "~/components/dropdown/DropdownMenu";
import Layout from "~/components/layout/Layout";
import { DropdownItem } from "~/components/dropdown/DropdownItem";
import { DropdownItems } from "~/components/dropdown/DropdownWrapper";
import { DropdownManager } from "~/components/dropdown/DropdownManager";

const DropdownExample = () => (
  <Wrapper>
    <DropdownMenu mode="click">
      <DropdownItems>
        <DropdownItem href="/examples/notify_me">Notify me</DropdownItem>
        <DropdownItem href="/examples/dropdown">New Window</DropdownItem>
      </DropdownItems>
      <DropdownManager>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </DropdownManager>
    </DropdownMenu>
  </Wrapper>
);

const Wrapper = styled.div`
  background: linear-gradient(
    330deg,
    hsl(272 51% 54%) 0%,
    hsl(226 70% 55.5%) 100%
  );
  border-radius: 8px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  --size: 36px;
  width: var(--size);
  height: var(--size);
  border-radius: 1000px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.14) 0 2px 10px;
  cursor: pointer;

  transition: transform 250ms var(--ease-in-out);

  &:hover {
    transform: translateY(-4px);
    transition: transform 250ms var(--ease-out);
  }

  &:active {
    transform: translateY(0px);
    transition: transform 100ms var(--ease-out);
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 8px;
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export default DropdownExample;
