import { Quiz } from '../../types/curriculum';

export const financeQuizzes: Quiz[] = [
  // Banking Operations Quizzes
  {
    id: 'fin-281-quiz-1',
    title: 'Core Banking Operations',
    questions: [
      {
        id: 'fin281-q1',
        question: 'Which of the following is a core banking system component?',
        options: [
          'Social media management',
          'Marketing automation',
          'Transaction processing',
          'Website development'
        ],
        correctAnswer: 2,
        explanation: 'Transaction processing is a fundamental component of core banking systems, handling all financial transactions within the bank.'
      },
      {
        id: 'fin281-q2',
        question: 'What is the primary purpose of a general ledger in banking operations?',
        options: [
          'Customer relationship management',
          'Financial record keeping and reporting',
          'Marketing campaign tracking',
          'Branch security management'
        ],
        correctAnswer: 1,
        explanation: 'The general ledger is crucial for financial record keeping and reporting, maintaining all financial transactions and accounts of the bank.'
      }
    ]
  },
  // ... more quizzes
];
