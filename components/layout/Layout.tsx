import styled from "@emotion/styled";
import Head from "next/head";
import Link from "next/link";
import React, { ReactNode } from "react";
import { QUERIES, WEIGHTS } from "~/styles/constants";
import { LayoutNav } from "./LayoutNav";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Title" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container>
      <Header>
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
      <Content>{children}</Content>
      <Footer>
        <span>2022 - @Melvynx</span>
      </Footer>
    </Container>
  </>
);

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

/*const NavMobile = styled.nav`
  display: none;
`;*/

const Footer = styled.footer`
  margin-top: auto;
  padding-bottom: 16px;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.values.laptop}px;
  margin: auto;
  padding-left: 16px;
  padding-right: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;

  --sticky-header: 32px;
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

const Header = styled.header`
  display: flex;
  border-radius: 1000px;
  position: sticky;
  top: var(--sticky-header);
  align-items: baseline;
  gap: 16px;
`;

const Content = styled.main`
  margin-top: var(--sticky-header);

  @media ${QUERIES.tabletAndUp} {
    margin-top: calc(var(--sticky-header) * 2);
  }
`;

export default Layout;
