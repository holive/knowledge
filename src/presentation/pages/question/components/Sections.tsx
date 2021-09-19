import React from 'react'
import {
  removeFirstQuestionFromCurrentRound,
  saveCurrentRoundResultsAction,
  useAppDispatch
} from 'store'
import { shuffle } from 'utils'

import { MultipleType } from './MultipleType'
import { TextType } from './TextType'
import { AnswersParams, NextButtonParams, QuestionSectionParams } from './types'

export const Sections = (props: QuestionSectionParams): JSX.Element => {
  const dispatch = useAppDispatch()

  const Next = ({ rightAnswer }: NextButtonParams): JSX.Element => {
    const goToTheNextQuestion = (): void => {
      dispatch(saveCurrentRoundResultsAction(rightAnswer))
      dispatch(removeFirstQuestionFromCurrentRound())
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
