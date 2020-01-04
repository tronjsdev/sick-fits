import React from 'react';
import NextLink from 'next/link';

const MenuItem = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <a css={{display: 'block', margin: '.4rem 0'}}>
        {children}
      </a>
    </NextLink>
  );
};

/* <MenuItem href="/signin">Signin</MenuItem>
<MenuItem href="/signin/oauth/.well-known/openid-configuration">.well-known</MenuItem> */

const LeftSidebar = ({ userInfo, isAuthenticated, ...props }) => {
  return (
    <div>
      <div>
        <div>Menu</div>
        <ul>
          {!isAuthenticated && <MenuItem href={'/auth/login'}>Login</MenuItem>}
          {isAuthenticated && (
            <>
              <MenuItem href={'/account/logout'}>Logout</MenuItem>
              <MenuItem href={'/account/profile'}>Profile</MenuItem>
            </>
          )}
          <MenuItem href={'/public'}>Public Page</MenuItem>
          <MenuItem href={'/private?param1=1&param2=2'}>Demo `nextUrl`</MenuItem>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
