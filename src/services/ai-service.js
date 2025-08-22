import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateContent= async (prompt)=> {
  try {
   
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        prompt
      ]
    });
   
    return response.text;
    
  } catch (error) {
    console.error("Error in generateResponse:", error);
    throw error;
  }
}