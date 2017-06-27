import { render } from 'react-dom'
import app from '../common/app'
import clientStores from './stores'
import autorun from './autorun'

autorun(clientStores)

render(app({ stores: clientStores }), document.getElementById('content'))
