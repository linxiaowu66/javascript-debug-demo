#!/usr/bin/env node
require('../server.babel') // babel registration (runtime transpilation for node)
const path = require('path')

const rootDir = path.resolve(__dirname, '..')

/**
 * Define isomorphic constants.
 */
global.IS_CLIENT = false;
global.IS_SERVER = true;
global.DISABLE_SSR = true;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
global.ROOTDIR = rootDir

if (global.IS_DEVELOPMENT) {
    /* eslint-disable global-require */
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss|\.less$)/i,
  })) {
    return;
  }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
    .server(rootDir, () => require('../src/server'));
