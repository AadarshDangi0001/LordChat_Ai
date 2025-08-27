 import chatModel from "../models/chat.model.js";
 import messageModel from "../models/message.model.js";

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

export  const getChats = async(req, res)=> {
    const user = req.user;

    const chats = await chatModel.find({ user: user._id });

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats: chats.map(chat => ({
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }))
    });
}

export  const getMessages= async (req, res)=> {

    const chatId = req.params.id;

    const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages: messages
    })

}
