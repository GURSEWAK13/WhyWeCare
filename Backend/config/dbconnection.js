import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb://localhost:27017/"
  );
  console.log("Db Connection success");
} catch (error) {
  console.error("DB connection failed with error: ", error);
}
