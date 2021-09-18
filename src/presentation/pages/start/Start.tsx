import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store'
import { saveUserInfoAction } from 'store/reducers'

export const Start: React.FC = () => {
  const dispatch = useAppDispatch()
  const { difficulty } = useAppSelector((state) => state.questions)
  const { questionsPerRound } = useAppSelector((state) => state.user.value)

  const [name, setName] = useState('')
  const [level, setLevel] = useState('')
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

      <button onClick={handleSaveUserInfo}>Start the Game :)</button>
    </>
  )
}
