import React, { useEffect } from 'react'
import { resetCurrentRoundResultsAction, useAppDispatch } from 'store'

export const Result: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(resetCurrentRoundResultsAction())
  }, [])

  return <h1>Result page</h1>
}
