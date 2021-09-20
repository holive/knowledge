import 'jest-localstorage-mock'

import React from 'react'

import { render, screen } from '../../../main/config/test-utils'
import { Result } from './Result'

const preloadedState = {
  user: {
    value: {
      name: 'hbliveira',
      currentRoundDifficulty: 'easy',
      questionsPerRound: 4
    }
  },
  questions: {
    questions: [
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'Which game did &quot;Sonic The Hedgehog&quot; make his first appearance in?',
        correct_answer: 'Rad Mobile',
        incorrect_answers: ['Sonic The Hedgehog', 'Super Mario 64', 'Mega Man']
      },
      {
        category: 'Science & Nature',
        type: 'boolean',
        difficulty: 'easy',
        question: 'Igneous rocks are formed by excessive heat and pressure.',
        correct_answer: 'False',
        incorrect_answers: ['True']
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'Which company did Valve cooperate with in the creation of the Vive?',
        correct_answer: 'HTC',
        incorrect_answers: ['Oculus', 'Google', 'Razer']
      },
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'easy',
        question: 'The idea of Socialism was articulated and advanced by whom?',
        correct_answer: 'Karl Marx',
        incorrect_answers: ['Vladimir Lenin', 'Joseph Stalin', 'Vladimir Putin']
      },
      {
        category: 'Animals',
        type: 'text',
        difficulty: 'medium',
        question: 'What color/colour is a polar bear&#039;s skin?',
        correct_answer: 'Black'
      },
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'If a &quot;360 no-scope&quot; is one full rotation before shooting, how many rotations would a &quot;1080 no-scope&quot; be?',
        correct_answer: '3',
        incorrect_answers: ['4', '2', '5']
      },
      {
        category: 'Science: Mathematics',
        type: 'multiple',
        difficulty: 'hard',
        question: 'How many zeptometres are inside one femtometre?',
        correct_answer: '1,000,000',
        incorrect_answers: ['10', '1,000,000,000', '1000']
      },
      {
        category: 'Science: Mathematics',
        type: 'boolean',
        difficulty: 'easy',
        question: 'The &#039;Squaring the Circle&#039; problem is solvable.',
        correct_answer: 'False',
        incorrect_answers: ['True']
      }
    ],
    difficulties: ['easy', 'medium', 'hard'],
    currentRoundQuestions: [
      {
        category: 'Science & Nature',
        type: 'boolean',
        difficulty: 'easy',
        question:
          'An Astronomical Unit is the distance between Earth and the Moon.',
        correct_answer: 'False',
        incorrect_answers: ['True'],
        correctAnswer: 'False',
        incorrectAnswers: ['True']
      },
      {
        category: 'General Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'Which company did Valve cooperate with in the creation of the Vive?',
        correct_answer: 'HTC',
        incorrect_answers: ['Oculus', 'Google', 'Razer'],
        correctAnswer: 'HTC',
        incorrectAnswers: ['Oculus', 'Google', 'Razer']
      },
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'easy',
        question:
          'Solid Snake is actually a clone from the DNA of Big Boss in the Metal Gear Solid series&#039; history.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        correctAnswer: 'True',
        incorrectAnswers: ['False']
      },
      {
        category: 'Entertainment: Television',
        type: 'multiple',
        difficulty: 'easy',
        question: 'How many seasons did &quot;Stargate SG-1&quot; have?',
        correct_answer: '10',
        incorrect_answers: ['3', '7', '12'],
        correctAnswer: '10',
        incorrectAnswers: ['3', '7', '12']
      }
    ],
    currentRoundResults: [true, true, false, false],
    resultsHistory: [
      {
        name: 'hbliveira',
        date: 'Mon Sep 20 2021 02:22:48 GMT-0300 (Horário Padrão de Brasília)',
        score: '50',
        level: 'easy'
      }
    ]
  }
}

describe('Result', () => {
  test('Should render the expected information.', async () => {
    render(<Result />, { preloadedState })

    expect(screen.queryByTestId('username')).toHaveTextContent('hbliveira')
    expect(screen.queryByTestId('correct-answers')).toHaveTextContent('2')
    expect(screen.queryByTestId('wrong-answers')).toHaveTextContent('2')
    expect(screen.queryByTestId('questions-answered')).toHaveTextContent('4')
    expect(screen.queryByTestId('final-score')).toHaveTextContent('50%')
    expect(screen.queryByTestId('level')).toHaveTextContent('easy')

    expect(screen.queryByTestId('table-body')?.children.length).toBe(1)
    expect(screen.queryByTestId('history-0-name')).toHaveTextContent(
      'hbliveira'
    )
    expect(screen.queryByTestId('history-0-date')).toHaveTextContent(
      '2:22:48 AM'
    )
    expect(screen.queryByTestId('history-0-score')).toHaveTextContent('50%')
  })
})
