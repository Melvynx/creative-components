import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { QUERIES, WEIGHTS } from '~/styles/constants';
import { ArrowPopover } from './ArrowPopover';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Container>
      <Header>
        <Side>
          <MelvynxLogo>Melvynx</MelvynxLogo>
        </Side>
        <NavDesktop>
          <NavItems />
        </NavDesktop>
        <Side></Side>
        <NavMobile>
          <NavItems />
        </NavMobile>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <span>2022 - @Melvynx</span>
      </Footer>
    </Container>
  </>
);

const NavItems = () => {
  return (
    <>
      <Link href="/">
        <NavItem>Home</NavItem>
      </Link>

      <ArrowPopover
        items={
          <PopoverItemContainer>
            <Link href="/examples/notify_me">
              <NavItem>Notify me input</NavItem>
            </Link>
            <Divider style={{ alignSelf: 'stretch' }} />
            <Link href="/">
              <NavItem>Some other thing</NavItem>
            </Link>
          </PopoverItemContainer>
        }
      >
        <NavItem>Components</NavItem>
      </ArrowPopover>
    </>
  );
};

const Side = styled.div`
  flex: 1;
`;

const PopoverItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px;
`;

const NavDesktop = styled.nav`
  display: none;
  align-items: center;
  gap: clamp(1rem, 2vw + 1rem, 2rem);

  @media (${QUERIES.tabletAndUp}) {
    display: flex;
  }
`;

const NavMobile = styled.nav`
  display: none;
`;

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

const Footer = styled.footer`
  margin-top: auto;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.values.laptop}px;
  margin: auto;
  padding-left: 16px;
  padding-right: 16px;

  --sticky-header: 32px;
`;

const MelvynxLogo = styled.h1`
  font-size: 2rem;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: var(--font-family-sans-serif);
  font-weight: ${WEIGHTS.bold};
  display: inline-block;
`;

const Header = styled.div`
  display: flex;
  border-radius: 1000px;
  position: sticky;
  top: var(--sticky-header);
  display: flex;
  align-items: baseline;
  gap: 16px;
`;

const Content = styled.div`
  margin-top: var(--sticky-header);

  @media ${QUERIES.laptopAndUp} {
    margin-top: calc(var(--sticky-header) * 2);
  }
`;

export default Layout;
