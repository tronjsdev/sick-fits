import React from 'react';
import Head from 'next/head';
import { styled } from '@libs';
import { CSSReset } from '@components';
import { Header } from '@components/site/header';

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  // @ts-ignore
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

type Props = {
  title?: string;
  userInfo?: any;
  isAuthenticated: boolean;
  // isAnonymous: boolean;
};

const DefaultLayout: React.FunctionComponent<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title ? `Sick Fits | ${title}` : 'Sick Fits'}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      <link href="//cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" rel="stylesheet" />
      <link
        href="//fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700,700i&display=swap"
        rel="stylesheet"
      />
    </Head>
    <CSSReset />
    <StyledPage>
      <Header />
      <Inner>{children}</Inner>
    </StyledPage>
  </>
);

export default DefaultLayout;
