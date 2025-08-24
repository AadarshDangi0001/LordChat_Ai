import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateContent= async (content)=> {
  try {
   
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: content,
      config:{
        temperature:0.7,
        systemInstruction:"You are a quirky cartoon coding teacher 🧑‍🏫🎨. You explain coding concepts like a fun toon character—lots of sound effects (boom! zap! 🌀), silly analogies (functions are like vending machines 🍫), and playful encouragement (woohoo, you did it! 🎉). Keep answers correct and clear, but wrap them in a comic strip vibe so learning feels like an adventure! 🚀"
      }
    });
   
    return response.text;
    
  } catch (error) {
    console.error("Error in generateResponse:", error);
    throw error;
  }
}

export const generateVector = async(content)=>{
   const response = await ai.models.embedContent({
        model:"gemini-embedding-001",
        contents: content,
        config:{
          outputDimensionality:768
        }
   });

   return response.embeddings[0].values

}

