/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const strip = require('strip-loader');

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');
const pkg = require('../package.json')

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const babelrc = fs.readFileSync('./src/client/.babelrc');
let babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];

const babelLoaderQuery = Object.assign({}, babelrcObject, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
        './src/client/index.js',
    ],
    'vendor': [
        'babel-polyfill/dist/polyfill.min.js',
        'react',
        'react-dom',
        'react-router',
        'whatwg-fetch',
        'mobx',
        'mobx-react'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: [strip.loader('debug'), 'babel-loader?' + JSON.stringify(babelLoaderQuery)] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use:['css-loader', 'postcss-loader']})},
      { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?modules&importLoaders=2&sourceMap', 'postcss-loader', 'less-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'] }) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?modules&importLoaders=2&sourceMap', 'postcss-loader', 'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'] }) },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.json', '.web.js', '.js', '.jsx'],
    alias: {
      components: `${path.resolve(__dirname, '..')}/src/common/components`,
      actions: `${path.resolve(__dirname, '..')}/src/common/actions`,
      apis: `${path.resolve(__dirname, '..')}/src/common/services/api`,
      reducers: `${path.resolve(__dirname, '..')}/src/common/reducers`,
      utils: `${path.resolve(__dirname, '..')}/src/common/utils`,
      constants: `${path.resolve(__dirname, '..')}/src/common/constants`,
      static: path.resolve(__dirname, '..') + '/static',
    },
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({filename: '[name]-[chunkhash].css', allChunks: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },

      IS_CLIENT: true,
      IS_SERVER: false,
      IS_DEVELOPMENT: false,
      ENABLE_DEVTOOLS: false,
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
    }),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    webpackIsomorphicToolsPlugin,
  ],
};
/* eslint-enable */
