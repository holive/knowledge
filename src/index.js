import 'presentation/styles/globals.scss'

import Router from 'main/routes/router'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <StrictMode>
    <Router />
  </StrictMode>,
  document.getElementById('root')
)
