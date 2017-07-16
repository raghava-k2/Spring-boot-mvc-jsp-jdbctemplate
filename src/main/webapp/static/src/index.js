import React from 'react'
import { render } from 'react-dom'
import configStore from './store'
import Root from './components/Root'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin';

let store = configStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
registerServiceWorker();
injectTapEventPlugin();