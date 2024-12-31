import dotenv from 'dotenv';
dotenv.config();
const key = process.env.JWT_SECRET;
export const JWT_SECRET_KEY = key;