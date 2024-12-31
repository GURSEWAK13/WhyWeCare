import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const key = process.env.DB_CONNECTION;
const dbConnection = key;
try {
  await mongoose.connect(
    dbConnection
  );
  console.log("Db Connection success");
} catch (error) {
  console.error("DB connection failed with error: ", error);
}