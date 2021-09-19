import { QUESTION_PAGE, START_PAGE } from 'main/config/constants'
import { Loading } from 'presentation/pages/loading'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  loadHistoryFromStorageAction,
  ResultHistoryState,
  saveCurrentRoundQuestionsAction,
  useAppDispatch,
  useAppSelector
} from 'store'

import { formatDate, getCorrectAnswers, getScore } from '../utils'

export const Result: React.FC = () => {
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

  const ScoreEntries = ({
    entries
  }: {
    entries: ResultHistoryState[]
  }): JSX.Element => {
    const level = currentRoundDifficulty || difficulties[0]
    const newEntries = [...entries]
    newEntries.reverse()

    const filterResults = (item: ResultHistoryState): boolean => {
      if (!currentRoundDifficulty) return true
      return item.level === level
    }

    return (
      <>
        {newEntries.filter(filterResults).map((item, i) => (
          <tr key={i}>
            <td>{item.name}</td>
            <td>{formatDate(item.date)}</td>
            {!currentRoundDifficulty && <td>{item.level}</td>}
            <td>{item.score}%</td>
          </tr>
        ))}
      </>
    )
  }

  const Summary = (): JSX.Element | null => {
    if (successRate === undefined || correctAnswers === undefined)
      return <Loading />

    if (!currentRoundDifficulty && !currentRoundResults.length) return null

    return (
      <>
        <h1>Here is your score, {name || 'player'}:</h1>

        <p>Correct: {correctAnswers}</p>
        <p>Wrong: {currentRoundResults.length - correctAnswers}</p>
        <p>Questions Answered: {currentRoundResults.length}</p>
        <p>Final Score: {successRate}%</p>
        <p>
          Level:{' '}
          <span style={{ textTransform: 'capitalize' }}>
            {currentRoundDifficulty}
          </span>
        </p>
      </>
    )
  }

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

  return (
    <div>
      <Summary />

      <br />
      <br />

      <h2>Game history</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Time</th>
            {!currentRoundDifficulty && <th>Level</th>}
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          <ScoreEntries entries={resultsHistory} />
        </tbody>
      </table>

      <br />
      <br />
      <button onClick={handleRestartQuiz}>Restart Quiz</button>
      <br />
      <br />
      <button onClick={handleChangeLevel}>Change Level</button>
    </div>
  )
}
