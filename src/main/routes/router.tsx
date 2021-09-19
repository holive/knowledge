import { QUESTION_PAGE, RESULT_PAGE, START_PAGE } from 'main/config/constants'
import { makeStartPage } from 'main/factories'
import { Question, Result } from 'presentation/pages'
import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={START_PAGE} exact component={makeStartPage} />
        <Route path={QUESTION_PAGE} component={Question} />
        <Route path={RESULT_PAGE} component={Result} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
