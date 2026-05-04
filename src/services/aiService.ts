import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const askAiTeacher = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: "You are a friendly and encouraging English teacher for Grade 3 Vietnamese students. Use simple English and explain in Vietnamese when necessary. Your name is Teacher Smarty. Keep your tone child-friendly, use emojis, and give simple examples.",
      },
    });
    return response.text || "I'm sorry, I couldn't understand that. Can you ask again?";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Oops! I'm having a little trouble thinking right now. Let's try again in a moment!";
  }
};
