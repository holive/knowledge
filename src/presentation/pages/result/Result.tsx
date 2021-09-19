import { Loading } from 'presentation/pages/loading'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'store'

import { formatDate, getCorrectAnswers, getScore } from '../utils'

export const Result: React.FC = () => {
  const { currentRoundResults, resultsHistory } = useAppSelector(
    (state) => state.questions
  )
  const { name, currentRoundDifficulty } = useAppSelector(
    (state) => state.user.value
  )
  const [successRate, setSuccessRate] = useState<string>()
  const [correctAnswers, setCorrectAnswers] = useState<number>()

  useEffect(() => {
    const correct = getCorrectAnswers(currentRoundResults)
    setSuccessRate(getScore(correct, currentRoundResults))
    setCorrectAnswers(correct)
  }, [])

  const ScoreEntries = (): JSX.Element => {
    return (
      <>
        {resultsHistory
          .filter((item) => item.level === currentRoundDifficulty)
          .map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{formatDate(item.date)}</td>
              <td>{item.score}%</td>
            </tr>
          ))}
      </>
    )
  }

  if (successRate === undefined || correctAnswers === undefined)
    return <Loading />

  return (
    <div>
      <h1>Here is your score, {name}:</h1>

      <p>Correct: {correctAnswers}</p>
      <p>Wrong: {currentRoundResults.length - correctAnswers}</p>
      <p>Questions answered: {currentRoundResults.length}</p>
      <p>Final Score: {successRate}%</p>

      <br />
      <br />
      <br />
      <br />

      <h2>Game history</h2>
      <table>
        <tr>
          <th>Player</th>
          <th>Time</th>
          <th>Score</th>
        </tr>

        <ScoreEntries />
      </table>
    </div>
  )
}
