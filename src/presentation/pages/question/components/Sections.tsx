import React from 'react'
import { saveCurrentRoundResultsAction, useAppDispatch } from 'store'
import { shuffle } from 'utils'

import { MultipleType } from './MultipleType'
import { TextType } from './TextType'
import { AnswersParams, NextButtonParams, QuestionSectionParams } from './types'

export const Sections = (props: QuestionSectionParams): JSX.Element => {
  const dispatch = useAppDispatch()

  const Next = ({ rightAnswer, callback }: NextButtonParams): JSX.Element => {
    const goToTheNextQuestion = (): void => {
      props.incrementQuestionsAnswered()
      dispatch(saveCurrentRoundResultsAction(rightAnswer))
      callback?.()
    }

    return <button onClick={goToTheNextQuestion}>Next</button>
  }

  const args: AnswersParams = {
    NextButton: Next,
    correctAnswer: props.correctAnswer,
    answers: shuffle([props.correctAnswer, ...(props.incorrectAnswers ?? [])])
  }

  if (props.type === 'text') return <TextType {...args} />
  return <MultipleType {...args} />
}
