import { QUESTION_PAGE, START_PAGE } from 'main/config/constants'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  loadHistoryFromStorageAction,
  ResultHistoryState,
  saveCurrentRoundQuestionsAction,
  useAppDispatch,
  useAppSelector
} from 'store'

import { getCorrectAnswers, getScore } from '../utils'

interface Model {
  currentRoundDifficulty: string
  difficulties: string[]
  handleRestartQuiz: () => void
  handleChangeLevel: () => void
  currentRoundResults: boolean[]
  resultsHistory: ResultHistoryState[]
  correctAnswers?: number
  successRate?: string
  name?: string
}

export const UseResult = (): Model => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const {
    currentRoundResults,
    resultsHistory,
    currentRoundQuestions,
    difficulties
  } = useAppSelector((state) => state.questions)
  const { name, currentRoundDifficulty, questionsPerRound } = useAppSelector(
    (state) => state.user.value
  )
  const [successRate, setSuccessRate] = useState<string>()
  const [correctAnswers, setCorrectAnswers] = useState<number>()

  useEffect(() => {
    const correct = getCorrectAnswers(currentRoundResults)
    setSuccessRate(getScore(correct, currentRoundResults))
    setCorrectAnswers(correct)
  }, [])

  useEffect(() => {
    const loadHistoryFromLocalStorageIfStoreIsEmpty = (): void => {
      if (resultsHistory.length) return
      const storageHistory: ResultHistoryState[] = JSON.parse(
        localStorage.getItem('resultsHistory') ?? ''
      )

      if (Array.isArray(storageHistory) && storageHistory.length) {
        dispatch(loadHistoryFromStorageAction(storageHistory))
      }
    }

    loadHistoryFromLocalStorageIfStoreIsEmpty()
  }, [])

  const handleRestartQuiz = (): void => {
    if (questionsPerRound > currentRoundQuestions.length) {
      dispatch(
        saveCurrentRoundQuestionsAction({
          level: currentRoundDifficulty,
          shouldShuffle: true
        })
      )
    }

    history.replace(QUESTION_PAGE)
  }

  const handleChangeLevel = (): void => {
    history.replace(START_PAGE)
  }

  return {
    currentRoundDifficulty,
    currentRoundResults,
    handleChangeLevel,
    handleRestartQuiz,
    correctAnswers,
    resultsHistory,
    difficulties,
    successRate,
    name
  }
}
