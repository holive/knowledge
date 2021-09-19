import React from 'react'

import { UseStart } from './useStart'

export const Start: React.FC = () => {
  const {
    setName,
    setLevel,
    handleSaveUserInfo,
    name,
    difficulties,
    numberOfQuestions,
    setNumberOfQuestions
  } = UseStart()

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
        {difficulties.map((value, i) => (
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
