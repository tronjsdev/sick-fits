import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '@libs';

import { DefaultLayout } from '../layouts';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;
  const { title, ...rest } = pageProps;
  return (
    <ThemeProvider theme={theme}>
      <Layout title={title}>
        <Component {...rest} />
      </Layout>
    </ThemeProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
