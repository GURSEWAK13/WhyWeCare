import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const dbConnection = process.env.DB_CONNECTION;
try {
  await mongoose.connect(
    dbConnection
  );
  console.log("Db Connection success");
} catch (error) {
  console.error("DB connection failed with error: ", error);
}