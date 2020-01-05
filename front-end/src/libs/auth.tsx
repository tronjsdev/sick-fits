import React, { useEffect } from 'react';
import Router from 'next/router';

const LOGIN_URL = '/auth/login';

const auth = ctx => {
  // const { token } = nextCookie(ctx);
  const { req, res, asPath } = ctx;
  const initProps: any = {};
  if (typeof window === 'undefined') {
    const { userContext, isAuthenticated, serverData } = res.locals;
    initProps.isAuthenticated = isAuthenticated;
    initProps.serverData = serverData;
    initProps.userInfo = userContext?.userInfo;
  } else {
    const {
      __NEXT_DATA__: { props: winProps },
    }: any = window;
    const { serverData, isAuthenticated, userInfo } = winProps;
    initProps.isAuthenticated = isAuthenticated;
    initProps.serverData = serverData;
    initProps.userInfo = userInfo;
  }

  const nextUrl = encodeURIComponent(asPath);
  const loginUrl = nextUrl ? `${LOGIN_URL}?nextUrl=${nextUrl}` : LOGIN_URL;

  // If there's no token, it means the user is not logged in.
  if (!initProps.isAuthenticated) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: loginUrl });
      ctx.res.end();
    } else {
      Router.push(loginUrl);
    }
  }

  return initProps;
};

export const logout = () => {
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now() as any);
  Router.push(LOGIN_URL);
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push(LOGIN_URL);
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const initProps = auth(ctx);
    const { query } = ctx;
    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, initProps, query };
  };

  return Wrapper;
};
