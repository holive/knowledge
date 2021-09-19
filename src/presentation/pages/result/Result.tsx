import React from 'react'

import { History, Summary } from './components'
import { UseResult } from './useResult'

export const Result: React.FC = () => {
  const {
    handleRestartQuiz,
    handleChangeLevel,
    difficulties,
    currentRoundDifficulty,
    correctAnswers,
    name,
    successRate,
    currentRoundResults,
    resultsHistory
  } = UseResult()

  return (
    <div>
      <Summary
        currentRoundDifficulty={currentRoundDifficulty}
        currentRoundResults={currentRoundResults}
        name={name}
        correctAnswers={correctAnswers}
        successRate={successRate}
      />

      <History
        resultsHistory={resultsHistory}
        currentRoundDifficulty={currentRoundDifficulty}
        difficulties={difficulties}
      />

      <button onClick={handleRestartQuiz}>Restart Quiz</button>
      <button onClick={handleChangeLevel}>Change Level</button>
    </div>
  )
}
