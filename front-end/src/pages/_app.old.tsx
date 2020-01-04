import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from '@apollo/react-hooks';
import { theme, withData } from '@libs';

import { DefaultLayout } from '../layouts';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  static async getInitialProps({ Component, ctx }) {
    const { req, res, query } = ctx;

    let pageProps: any = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (req) {
      const { userContext, serverData, isAuthenticated } = res.locals || {};

      pageProps.serverData = serverData;
      pageProps.isAuthenticated = isAuthenticated;
      pageProps.userInfo = userContext?.userInfo;
    } else {
      const {
        __NEXT_DATA__: { props },
      }: any = window || {};
      const { serverData, isAuthenticated, userInfo } = props;
      pageProps.serverData = serverData;
      pageProps.isAuthenticated = isAuthenticated;
      pageProps.userInfo = userInfo;
    }

    return { ...pageProps, query };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    // @ts-ignore
    const { Component, apollo, ...pageProps }: any = this.props;

    const Layout = Component.Layout || DefaultLayout;
    const { title } = Component;
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <Layout
            title={title}
            isAuthenticated={pageProps.isAuthenticated}
            userInfo={pageProps.userInfo}
          >
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withData(MyApp);
