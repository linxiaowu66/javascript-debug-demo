import React from 'react'
import ReactDOM from 'react-dom/server'
import { match } from 'react-router'
import routes from '../../common/routes.server'

import Html from '../helpers/html'

export default (req, res, next) => {
  if (global.IS_DEVELOPMENT) {
    global.webpackIsomorphicTools.refresh()
  }

  async function setContent() {
    res.send(`<!doctype html>
      ${ReactDOM.renderToString(
        <Html
          assets={global.webpackIsomorphicTools.assets()}
          source={['vendor', 'main']}
        />)}`);
  }

    // when ssr is disabled,
  function hydrateOnClient() {
    setContent()
  }

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      if (global.DISABLE_SSR) {
        hydrateOnClient();
      }
    } else {
      next('route')
    }
  })
  // const memoryHistory = createHistory(req.originalUrl)
  // const history = syncHistoryWithStore()

// match({ routes, location: req.originalUrl },
//  (error, redirectLocation, renderProps) => {
  //   if (redirectLocation) {
  //     res.redirect(redirectLocation.pathname + redirectLocation.search)
  //   } else if (error) {
  //     logger.error(error)
  //     res.staus(500)
  //     hydrateOnClient()
  //   } else if (renderProps) {
  //     const component = (
  //       <Provider store={store} >
  //         <RoutingContext {...renderProps} />
  //       </Provider>
  //     )
  //     const html = ReactDOM.renderToString(<Html
  //       assets={global.webpackIsomorphicTools.assets()}
  //       component={component}
  //       store={store}
  //     />)
  //     res.send(`<!doctype html>\n${html}`);
  //   } else {
  //     next()
  //   }
  // })
}
