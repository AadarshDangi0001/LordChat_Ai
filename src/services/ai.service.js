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
      contents: content
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

