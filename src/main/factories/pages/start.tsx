import { Loading, Start } from 'presentation/pages'
import React from 'react'
import { useFetchQuestionsQuery } from 'services'
import {
  saveDifficultiesAction,
  saveQuestionsAction,
  useAppDispatch
} from 'store'

export const makeStartPage = (): JSX.Element => {
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

  if (isLoading) return <Loading />
  return <Start />
}
