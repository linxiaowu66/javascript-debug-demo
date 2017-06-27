/* eslint-disable */
var webpack = require('webpack');
module.exports = {
  plugins: [
    require('postcss-import')({
      path: './src/common/styles/*.css',
      addDependencyTo: webpack
    }),
    require('precss'),
    require('postcss-for'),
    require('cssnext'),
    require('autoprefixer')({ browsers:['Android >= 4.0', 'ios >= 6', 'last 2 versions'] }),
  ],
};
/* eslint-enable */
