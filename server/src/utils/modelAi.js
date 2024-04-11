import { genAI } from "../server.js";

async function prompt(data, query) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `${data} \n ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export default prompt;
