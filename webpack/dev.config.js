/* eslint-disable */
// Webpack config for development
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const assetsPath = path.resolve(__dirname, '../static/dist');
const host = 'localhost';
const port = 3001

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const babelrc = fs.readFileSync('./src/client/.babelrc');
let babelrcObject = {};

const AntTheme = require(path.resolve(__dirname, '../package.json'))['ant-theme'];

try {
    babelrcObject = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}


const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
let combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

const babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

module.exports = {
    devtool: 'inline-source-map',
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
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'http://' + host + ':' + port + '/dist/',
    },
    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader?' + JSON.stringify(babelLoaderQuery)] },
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
            {
                //test:  /antd\/\/[a-z\/\_]+\.less$/,
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=2&sourceMap',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            modifyVars: AntTheme,
                        }
                    },
                ]
            },
            //{ test: /\.less$/, use: ['style-loader', 'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]','postcss-loader', 'less-loader?outputStyle=expanded&sourceMap']},
            { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]','postcss-loader', 'sass-loader?outputStyle=expanded&sourceMap']},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
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
            container: path.resolve(__dirname, '..') + '/src/common/container',
            components: path.resolve(__dirname, '..') + '/src/common/components',
            apis: path.resolve(__dirname, '..') + '/src/common/services/api',
            utils: path.resolve(__dirname, '..') + '/src/common/utils',
            constants: path.resolve(__dirname, '..') + '/src/common/constants',
            static: path.resolve(__dirname, '..') + '/static',
        },
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            IS_CLIENT: true,
            IS_SERVER: false,
            IS_DEVELOPMENT: true,
            ENABLE_DEVTOOLS: true,  // <-------- DISABLE redux-devtools HERE
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false,
        //   },
        // }),
        webpackIsomorphicToolsPlugin.development(),
    ],
};
/* eslint-enable */