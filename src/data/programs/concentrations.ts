import { Concentration } from '../../types/curriculum';

export const concentrations: Concentration[] = [
  {
    id: 'general',
    name: 'General Finance',
    description: 'Build a broad foundation in finance principles covering investments, markets, and corporate finance.',
    requiredCourses: ['FIN 201', 'FIN 302', 'FIN 403'],
    electiveCourses: ['FIN 300-400 Level Elective']
  },
  {
    id: 'corporate',
    name: 'Corporate Finance',
    description: 'Specialize in financial management for corporations, focusing on capital structure and investment decisions.',
    requiredCourses: ['FIN 201', 'FIN 302', 'FIN 403', 'FIN 404'],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 405', 'FIN 406']
  },
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    description: 'Specialize in banking operations, financial services, and risk management.',
    requiredCourses: ['FIN 201', 'FIN 280', 'FIN 281', 'FIN 282', 'FIN 283'],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 480', 'FIN 481']
  }
  // ... more concentrations
];
