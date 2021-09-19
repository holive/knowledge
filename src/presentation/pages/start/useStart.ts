import { QUESTION_PAGE } from 'main/config/constants'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  resetCurrentRoundResultsAction,
  saveCurrentRoundQuestionsAction,
  saveUserInfoAction,
  useAppDispatch,
  useAppSelector
} from 'store'

interface Model {
  handleSaveUserInfo: (e: React.MouseEvent<HTMLButtonElement>) => void
  setName: React.Dispatch<React.SetStateAction<string>>
  level: string
  setLevel: React.Dispatch<React.SetStateAction<string>>
  name: string
  difficulties: string[]
  numberOfQuestions: number
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>
  maxNumberOfQuestions: number
}

export const UseStart = (): Model => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { difficulties, questions } = useAppSelector((state) => state.questions)
  const { questionsPerRound } = useAppSelector((state) => state.user.value)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<string>(
    () => (difficulties.length && difficulties[0]) || ''
  )

  useEffect(() => {
    dispatch(resetCurrentRoundResultsAction())
  }, [])

  const [numberOfQuestions, setNumberOfQuestions] = useState(
    () => questionsPerRound
  )

  const handleSaveUserInfo = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    dispatch(
      saveUserInfoAction({
        name,
        currentRoundDifficulty: level,
        questionsPerRound: numberOfQuestions
      })
    )
    dispatch(saveCurrentRoundQuestionsAction({ level, shouldShuffle: true }))

    history.replace(QUESTION_PAGE)
  }

  const maxNumberOfQuestions = questions.filter(
    (item) => item.difficulty === level
  ).length

  return {
    handleSaveUserInfo,
    setName,
    level,
    setLevel,
    name,
    difficulties,
    numberOfQuestions,
    setNumberOfQuestions,
    maxNumberOfQuestions
  }
}
