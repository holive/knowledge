import React, { ChangeEvent, useState } from 'react'

import { isTheRightAnswer } from './helpers'
import { AnswersParams } from './types'

export const TextType = (Props: AnswersParams): JSX.Element => {
  const [answer, setAnswer] = useState('')

  const resetInput = (): void => setAnswer('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setAnswer(e.target.value)

  return (
    <>
      <div>
        <input
          type="text"
          id="choice"
          name="choice"
          value={answer}
          onChange={handleChange}
          className="form-input bg-gray-700 text-gray-400"
        />
      </div>

      {answer !== '' && (
        <Props.NextButton
          rightAnswer={isTheRightAnswer(answer, Props.correctAnswer)}
          callback={resetInput}
        />
      )}
    </>
  )
}
