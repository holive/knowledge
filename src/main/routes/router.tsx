import { QUESTION_PAGE, START_PAGE } from 'config/constants'
import { Loading, Question, Start } from 'presentation/pages'
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
      </Switch>
    </BrowserRouter>
  )
}

export default Router
