import express from "express";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./configs.env" });
const { PORT, MONGO_URL } = process.env;
import connectDB from "./utils/connect-db.js";
connectDB(MONGO_URL);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});
