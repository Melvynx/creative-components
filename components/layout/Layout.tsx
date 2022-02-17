import styled from "@emotion/styled";
import Head from "next/head";
import React, { ReactNode } from "react";
import { QUERIES } from "~/styles/constants";
import { LayoutHeader } from "~/components/layout/LayoutHeader";

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
      <LayoutHeader />
      <Content>{children}</Content>
      <Footer>
        <span>2022 - @Melvynx</span>
      </Footer>
    </Container>
  </>
);

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

const Content = styled.main`
  // isolate the content to be behind the header
  isolation: isolate;
  z-index: 1;

  margin-top: var(--sticky-header);

  @media ${QUERIES.tabletAndUp} {
    margin-top: calc(var(--sticky-header) * 2);
  }
`;

export default Layout;
