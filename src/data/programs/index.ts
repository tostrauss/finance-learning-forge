// src/data/programs/index.ts

// Re-exporting the consolidated courses data
export * from './courses';

// Re-exporting the consolidated quizzes data
export * from './quizzes';

// Re-exporting concentrations data
export * from './concentrations';

// Re-exporting program requirements data
export * from './requirements';

// The following exports are commented out because their source files
// (programInfo.ts, tools.ts, career.ts) were not available in the uploaded files.
// If you have these files in your src/data/programs/ directory, you can uncomment them.

// export { degreeProgram as program } from './programInfo';
// export { tradingTools } from './tools';
// export { careerResources } from './career';
