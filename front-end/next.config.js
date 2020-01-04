delete process.env.TS_NODE_PROJECT;

//const withCSS = require('@zeit/next-css');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
  //Uncomment the bellow if would to use process.env in *.tsx file
  env: {
    SECOND_SECRET: process.env.SECOND_SECRET,
    PORT: process.env.PORT,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    MY_SERVER_VAR: 'You only see me on server',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    MY_PUBLIC_VAR: 'You can see me either on server or client',
  },
};
