const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
];

const systemPrompt = `
You are Medibot, the AI healthcare assistant for Medisense. Your role is to assist users with:

1. Doctor appointments (online/offline)
2. Medicine ordering and delivery
3. Disease information and basic health advice
4. Hospital and pharmacy information
5. General healthcare queries

Important guidelines:
- Never provide medical diagnoses - always recommend consulting a doctor
- Avoid adult/sexual content - respond with "Sorry, I can't help with that"
- For emergencies, direct users to contact local emergency services
- Be friendly, professional, and empathetic
- Keep responses concise but informative
- For complex queries, suggest booking a consultation

Medisense contact info:
- Email: shahab@gmail.com
- Phone: 7325842656 (Founder: MD Shahab Uddin)

Current date: ${new Date().toLocaleDateString()}
`;

exports.chatWithBot = async (req, res) => {
    console.log("Inside chatbot controller");
  try {
    const { message, history } = req.body;
    
    // For model gemini-1.5-pro-latest
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest",
      generationConfig,
      safetySettings,
    });

    const chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I'm ready to assist as Medibot for Medisense." }],
        },
        ...history,
      ],
    });

    const result = await chatSession.sendMessage(message);
    const response = result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error in chatbot:', error);
    res.status(500).json({ error: "Sorry, I'm having trouble responding. Please try again later." });
  }
};