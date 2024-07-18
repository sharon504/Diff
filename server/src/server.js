import express from "express";
import app from "./app.js";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: "./.envrc" });
const { PORT, MONGO_URL } = process.env;
import { connect_db } from "./utils/utils.js";
connect_db(MONGO_URL);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});

export { genAI };
