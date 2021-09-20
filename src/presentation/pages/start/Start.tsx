import React from 'react'

import styles from './Start.module.scss'
import { UseStart } from './useStart'

export const Start: React.FC = () => {
  const {
    setName,
    setLevel,
    handleSaveUserInfo,
    name,
    difficulties,
    numberOfQuestions,
    setNumberOfQuestions,
    maxNumberOfQuestions
  } = UseStart()

  return (
    <div className="min-h-screen bg-gray-800 font-mono">
      <div className="container mx-auto py-16 flex flex-col text-center">
        <h1
          className={['text-5xl text-gray-400 mb-16', styles.title].join(' ')}
        >
          <div data-text="Let's play!">{"Let's play!"}</div>
        </h1>

        <label htmlFor="username" className="text-gray-400 mb-5">
          Tell us your name:{' '}
          <input
            type="text"
            id="username"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input bg-gray-700"
          />
        </label>

        <label htmlFor="level" className="text-gray-400 mb-5">
          Select the difficulty level:{' '}
          <select
            name="level"
            id="level"
            onChange={(e) => setLevel(e.target.value)}
            className="form-select bg-gray-700 cursor-pointer"
          >
            {difficulties.map((value, i) => (
              <option key={i} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="questionsPerRound" className="text-gray-400 mb-5">
          Questions per round:{' '}
          <input
            type="number"
            id="questionsPerRound"
            name="questionsPerRound"
            value={numberOfQuestions}
            max={maxNumberOfQuestions}
            min={1}
            onChange={(e) => setNumberOfQuestions(+e.target.value)}
            className="form-input bg-gray-700"
          />
        </label>

        {name ? (
          <button onClick={handleSaveUserInfo} className="btn">
            Start the Game :)
          </button>
        ) : null}
      </div>
    </div>
  )
}
