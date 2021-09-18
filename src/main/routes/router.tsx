import { Home } from 'presentation/pages/home'
import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
