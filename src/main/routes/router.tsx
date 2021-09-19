import { QUESTION_PAGE, RESULT_PAGE, START_PAGE } from 'main/config/constants'
import { Loading, Question, Result, Start } from 'presentation/pages'
import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useFetchQuestionsQuery } from 'services'
import {
  saveDifficultiesAction,
  saveQuestionsAction,
  useAppDispatch
} from 'store'

const Router: FC = () => {
  const dispatch = useAppDispatch()
  const {
    data = { results: [] },
    isSuccess,
    isLoading
  } = useFetchQuestionsQuery(null)

  if (isSuccess) {
    dispatch(saveQuestionsAction(data.results))
    dispatch(saveDifficultiesAction(data.results))
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={START_PAGE}
          exact
          component={isLoading ? Loading : Start}
        />
        <Route path={QUESTION_PAGE} component={Question} />
        <Route path={RESULT_PAGE} component={Result} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
