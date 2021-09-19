import { QUESTION_PAGE } from 'main/config/constants'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  saveCurrentRoundQuestionsAction,
  saveUserInfoAction,
  useAppDispatch,
  useAppSelector
} from 'store'

interface Model {
  handleSaveUserInfo: (e: React.MouseEvent<HTMLButtonElement>) => void
  setName: React.Dispatch<React.SetStateAction<string>>
  setLevel: React.Dispatch<React.SetStateAction<string>>
  name: string
  difficulties: string[]
  numberOfQuestions: number
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>
}

export const UseStart = (): Model => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { difficulties } = useAppSelector((state) => state.questions)
  const [name, setName] = useState('')
  const [level, setLevel] = useState<string>(
    () => (difficulties.length && difficulties[0]) || ''
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
    dispatch(saveCurrentRoundQuestionsAction({ level, shouldShuffle: true }))

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
    difficulties,
    numberOfQuestions,
    setNumberOfQuestions
  }
}
