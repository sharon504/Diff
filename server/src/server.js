import express from "express";
import app from "./app.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: "./configs.env" });
const { PORT, MONGO_URL } = process.env;
import connectDB from "./utils/connect-db.js";
connectDB(MONGO_URL);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});

export { genAI };
