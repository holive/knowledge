import { QUESTION_PAGE } from 'config/constants'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  saveCurrentRoundQuestionsAction,
  saveUserInfoAction,
  useAppDispatch,
  useAppSelector
} from 'store'

export const UseStart = (): {
  handleSaveUserInfo: (e: React.MouseEvent<HTMLButtonElement>) => void
  setName: React.Dispatch<React.SetStateAction<string>>
  setLevel: React.Dispatch<React.SetStateAction<string>>
  name: string
  difficulty: string[]
  numberOfQuestions: number
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>
} => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { difficulty } = useAppSelector((state) => state.questions)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<string>(
    () => (difficulty.length && difficulty[0]) || ''
  )

  const { questionsPerRound } = useAppSelector((state) => state.user.value)

  const [numberOfQuestions, setNumberOfQuestions] = useState(
    () => questionsPerRound
  )

  const saveUserInfo = (): void => {
    dispatch(
      saveUserInfoAction({
        name,
        currentRoundDifficulty: level,
        questionsPerRound: numberOfQuestions
      })
    )
    dispatch(saveCurrentRoundQuestionsAction(level))

    history.replace(QUESTION_PAGE)
  }

  const handleSaveUserInfo = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    saveUserInfo()
  }

  return {
    handleSaveUserInfo,
    setName,
    setLevel,
    name,
    difficulty,
    numberOfQuestions,
    setNumberOfQuestions
  }
}
