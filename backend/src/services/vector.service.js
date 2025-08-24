import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const lordAiIndex = pc.index('lord-ai');


export const createMemory = async ({vectors,metadata, messageId})=>{
      await lordAiIndex.upsert([{
        id: messageId,
        values: vectors,
        metadata
      }])
}



export const queryMemory= async ({queryVector,limit=5,metadata})=>{
    const data = await lordAiIndex.query({
        vector:queryVector,
        topK:limit,
        filter:metadata?metadata: undefined,
        includeMetadata:true
    });

    return data.matches
}