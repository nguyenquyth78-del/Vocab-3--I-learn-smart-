import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  try {
    const genAI = new GoogleGenAI({ apiKey });
    
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: `
          You are "Teacher Joy", a friendly and patient native English teacher for Grade 3 students in Vietnam.
          Your mission is to help students learn English vocabulary and basic sentences.
          - Keep your language very simple and easy to understand for 8-9 year old beginners.
          - Always be encouraging and use positive reinforcement.
          - When explaining a word, give a simple example sentence.
          - If the student asks in Vietnamese, reply in a mix of English and Vietnamese.
          - Use emojis like 🌟, 🍎, 📚, ✨.
        `
      }
    });

    const text = result.text;
    return res.status(200).json({ text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate content' });
  }
}
