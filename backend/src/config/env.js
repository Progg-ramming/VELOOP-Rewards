import 'dotenv/config';

const required = ['MONGODB_URI', 'JWT_SECRET'];
if (process.env.NODE_ENV === 'production') {
  for (const key of required) if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/veloop_rewards',
  jwtSecret: process.env.JWT_SECRET || 'development-only-change-me',
  jwtIssuer: process.env.JWT_ISSUER || 'veloop-rewards',
  corsOrigin: process.env.CORS_ORIGIN || 'http://127.0.0.1:5173',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 100),
  joinRateLimitMax: Number(process.env.JOIN_RATE_LIMIT_MAX || 10),
  devAuthBypass: process.env.DEV_AUTH_BYPASS === 'true',
};
