import * as React from 'react';
import Head from 'next/head';

type Props = {
  title?: string;
};

const SecondaryLayout: React.FunctionComponent<Props> = ({
  children,
  title = '!! Please change page title !!',
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </>
);

export default SecondaryLayout;
