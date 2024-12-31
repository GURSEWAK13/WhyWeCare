import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 8081,
  dbConnection: process.env.DB_CONNECTION,
  jwtSecret: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
  nodeEnv: process.env.NODE_ENV || 'development'
}; 