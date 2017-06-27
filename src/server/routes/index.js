const glob = require('glob')
const express = require('express')

/* eslint new-cap: 0 */
/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0*/
const router = express.Router()

/**
 * 基础信息
 * @version {} v1.0
 * @title {} 点我达骑手APP网关平台
 * @description {}
 */

exports = module.exports = function initModules(app) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err }
    matches.forEach((mod) => {
      const routes = require(`${mod}`)

      routes.forEach((config) => {
        const {
          method = '',
          route = '',
          handlers = []
        } = config
        const lastHandler = handlers.pop()
        if (route === '/*') {
          router[method.toLowerCase()](route, (req, res, next) => lastHandler(req, res, next))
        } else {
          router[method.toLowerCase()](route, ...handlers, (req, res) => lastHandler(req, res))
        }
      })
    })
    app.use('/', router)
    // catch 404 and forward to error handler
    // app.use(function(req, res, next) {
    //     var err = new Error('Not Found');
    //     err.status = 404;
    //     next(err);
    // });

    // app.use(function(err, req, res, next) {
    //     res.status(err.status || 500);
    //     res.render('404', {
    //       title: '网页丢失了...',
    //       message: '您访问的页面不存在了'
    //     });
    // })
  })
}
