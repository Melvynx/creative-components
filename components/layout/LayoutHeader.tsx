import Link from "next/link";
import { LayoutNav } from "~/components/layout/LayoutNav";
import React from "react";
import styled from "@emotion/styled";
import { QUERIES, WEIGHTS } from "~/styles/constants";

export const LayoutHeader = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 32) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header isScrolled={isScrolled}>
      <Side>
        <Link href="/">
          <MelvynxLogo>Melvynx</MelvynxLogo>
        </Link>
      </Side>
      <NavDesktop>
        <LayoutNav />
      </NavDesktop>
      <Side></Side>
      {/* <NavMobile>
          <LayoutNav />
        </NavMobile> */}
    </Header>
  );
};

const Side = styled.div`
  flex: 1;
`;

const NavDesktop = styled.nav`
  display: none;
  align-items: center;
  gap: clamp(1rem, 2vw + 1rem, 2rem);

  @media ${QUERIES.tabletAndUp} {
    display: flex;
  }
`;

const MelvynxLogo = styled.span`
  font-size: 2rem;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-family-sans-serif);
  font-weight: ${WEIGHTS.bold};
  display: inline-block;
  cursor: pointer;
`;

const Header = styled.header<{ isScrolled: boolean }>`
  display: flex;
  position: sticky;
  border-radius: 0 0 16px 16px;
  padding: 8px 16px;
  top: -1px;
  margin-top: var(--sticky-header);
  align-items: baseline;
  gap: 16px;
  background: ${(props) => (props.isScrolled ? "#00000050" : "transparent")};

  // position: sticky => isolate the header
  z-index: 2;
`;
