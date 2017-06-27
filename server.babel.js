//  enable runtime transpilation to use ES6/7 in node

const fs = require('fs')

const babelrc = fs.readFileSync('./.babelrc')
let config = null

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

config.presets.pop();
// config.presets.unshift('stage-0');
config.presets.unshift('node6');
config.plugins.unshift('transform-async-to-generator');
config.plugins.unshift('transform-decorators-legacy');

/* mock render count */
console.count = () => {}
/* use bluebird as default promise */
require('babel-polyfill');
require('babel-runtime/core-js/promise').default = require('bluebird')
require('babel-register')(config);
