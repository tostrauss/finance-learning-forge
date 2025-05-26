import { ProgramRequirement } from '../../types/curriculum';

export const programRequirements: ProgramRequirement[] = [
  {
    id: 'core',
    name: 'Core Requirements',
    description: 'Foundational finance courses required for all concentrations',
    requiredCredits: 30,
    categories: [
      {
        name: 'Required Core Courses',
        requiredCredits: 30,
        courses: ['FIN 201', 'FIN 280', 'FIN 302', 'FIN 403']
      }
    ]
  },
  {
    id: 'concentration',
    name: 'Concentration Requirements',
    description: 'Specialized courses for your chosen concentration',
    requiredCredits: 18,
    categories: [
      {
        name: 'Required Concentration Courses',
        requiredCredits: 18,
        courses: [] // Varies by concentration
      }
    ]
  }
  // ... more requirements
];
