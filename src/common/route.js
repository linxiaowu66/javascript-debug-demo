/* 商家路由 */
import React from 'react'
import { Route } from 'react-router'
import App from './components/containers/app'
import Test from './components/test'

const routes = (
  <Route path="/" component={App}>
    <Route path="index" component={Test}/>
  </Route>
)

export default routes
