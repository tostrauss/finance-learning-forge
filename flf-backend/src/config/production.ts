export const productionConfig = {
  database: {
    // Production database often requires SSL connections
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This may be needed depending on the provider
      },
    },
  },
  cors: {
    // Ensure this matches your frontend's production URL
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
};