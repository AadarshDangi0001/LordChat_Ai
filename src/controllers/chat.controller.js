 import chatModel from "../models/chat.model.js";

 export const createChat = async (req, res) => {
   try {
     const { title } = req.body;
     const userId = req.user._id;

     const newChat = await chatModel.create({
       user: userId,
       title,
     });

     res.status(201).json({
       message: "Chat created successfully",
       chat: newChat,
     });
   } catch (error) {
     console.error("Error creating chat:", error);
     res.status(500).json({ message: "Server error" });
   }
 }