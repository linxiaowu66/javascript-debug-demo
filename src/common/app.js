import React from 'react'
import { Provider } from 'mobx-react'
import { Router, browserHistory } from 'react-router'

import routes from './route'

import './styles/app.css'

export default function app(props) {
  const stores = props.stores

  return (
    <Provider {...stores} >
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  )
}
