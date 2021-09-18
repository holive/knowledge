import 'presentation/styles/globals.scss'

import Router from 'main/routes/router'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
