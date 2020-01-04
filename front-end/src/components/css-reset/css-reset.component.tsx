import React from 'react';
import { Global, css } from '@emotion/core';
import { theme } from '@libs';

const CSSReset: React.FunctionComponent = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'radnika_next';
        src: url('/radnikanext-medium-webfont.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
      }
      html {
        text-rendering: optimizeLegibility;
        overflow-x: hidden;
        box-sizing: border-box;
        -ms-overflow-style: scrollbar;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 10px;
      }

      html,
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
          'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      body {
        font-size: 1.5rem;
        line-height: 2;
        font-family: 'radnika_next';
      }

      a {
        text-decoration: none;
        color: ${theme.black};
      }
    `}
  />
);

export default CSSReset;
