import { Loading, Start } from 'presentation/pages'
import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useFetchQuestionsQuery } from 'services'
import { saveDifficultiesAction, useAppDispatch } from 'store'
import { saveQuestionsAction } from 'store/reducers'

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
        <Route path="/" exact component={isLoading ? Loading : Start} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
