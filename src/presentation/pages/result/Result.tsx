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
    <div className="min-h-screen bg-gray-800 font-mono">
      <div className="container mx-auto py-16 flex flex-col text-center">
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

        <div className="flex justify-center">
          <button onClick={handleRestartQuiz} className="btn border-r-0">
            Restart Quiz
          </button>
          <button onClick={handleChangeLevel} className="btn">
            Change Level
          </button>
        </div>
      </div>
    </div>
  )
}
