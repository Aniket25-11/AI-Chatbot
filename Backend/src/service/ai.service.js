const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function generateResponse(chatHistory) {
  // normalize history → Gemini expects {role, parts:[{text}]} only
  const contents = chatHistory.map(msg => {
    if (msg.parts) return { role: msg.role, parts: msg.parts };
    if (msg.text) return { role: msg.role, parts: [{ text: msg.text }] };
    return msg;
  });

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const response = await model.generateContent({ contents });

  return response.response.text();
}

module.exports = generateResponse;
