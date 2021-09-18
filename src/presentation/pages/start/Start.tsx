import { QUESTION_PAGE } from 'config/constants'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  saveCurrentRoundQuestionsAction,
  saveUserInfoAction,
  useAppDispatch,
  useAppSelector
} from 'store'

export const Start: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { difficulty } = useAppSelector((state) => state.questions)
  const { questionsPerRound } = useAppSelector((state) => state.user.value)

  const [name, setName] = useState('')
  const [level, setLevel] = useState<string>(
    () => (difficulty.length && difficulty[0]) || ''
  )
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
    dispatch(saveCurrentRoundQuestionsAction(level))

    history.replace(QUESTION_PAGE)
  }

  return (
    <>
      <h1>{"Let's play!"}</h1>
      <label htmlFor="username">Tell us your name: </label>
      <input
        type="text"
        id="username"
        name="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />
      <br />

      <label htmlFor="level">Select the difficulty level: </label>
      <select
        name="level"
        id="level"
        onChange={(e) => setLevel(e.target.value)}
      >
        {difficulty.map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </select>

      <br />
      <br />
      <br />

      <label htmlFor="questionsPerRound">Questions per round: </label>
      <input
        type="number"
        id="questionsPerRound"
        name="questionsPerRound"
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(+e.target.value)}
      />

      <br />
      <br />
      <br />

      {name ? (
        <button onClick={handleSaveUserInfo}>Start the Game :)</button>
      ) : null}
    </>
  )
}
