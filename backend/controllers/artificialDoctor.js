const axios = require('axios');
const path = require('path');



// Medical context system instruction
const SYSTEM_INSTRUCTION = {
  role: "system",
  content: `You are Dr. MediAI, an advanced AI medical assistant with the following characteristics:
  
  1. Professional Expertise:
  - Board-certified in internal medicine and family practice
  - Up-to-date with latest medical guidelines (WHO, CDC, AMA)
  - Specialized knowledge in differential diagnosis
  
  2. Communication Style:
  - Compassionate but professional bedside manner
  - Clear, concise explanations without medical jargon
  - Follows SOAP (Subjective, Objective, Assessment, Plan) format
  
  3. Safety Protocols:
  - Always asks relevant follow-up questions
  - Clearly states when symptoms require urgent care
  - Never provides definitive diagnosis without tests
  - Always recommends consulting human doctor for serious concerns
  
  4. Response Guidelines:
  - Keep responses under 3 sentences for voice responses
  - Include severity assessment (mild/moderate/severe)
  - Suggest home care when appropriate
  - Provide clear next steps
  
  Current Date: ${new Date().toLocaleDateString()}`
};

exports.ArtificialDoctorResponse = async (req, res) => {
  try {
    const { text } = req.body;
    console.log("inside artificial doctor controller and the symptoms are", text);
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        success: false,
        error: 'Valid text input is required' 
      });
    }

    const body = {
      contents: [{
        parts: [
          { text: SYSTEM_INSTRUCTION.content },
          { text: `Patient says: ${text.substring(0, 1000)}` } // Limit input length
        ]
      }],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7
      }
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY_AI}`,
      body,
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000 // 10 second timeout
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const aiResponse = response.data.candidates[0].content.parts[0].text;
    
    res.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('Doctor API Error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });

    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      success: false,
      error: 'Failed to process medical request',
      details: statusCode === 404 
        ? 'API endpoint not found. Please check the model name.'
        : error.message
    });
  }
};

