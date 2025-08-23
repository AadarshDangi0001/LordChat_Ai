import { Server } from "socket.io";
import { generateContent } from "../services/ai-service.js";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

function setupSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
    if (!cookies.token) {
      return next(new Error("Authentication error"));
    }
    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (error) {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      try {
        
        
        
        let parsedPayload;
        if (typeof messagePayload === 'string') {
          parsedPayload = JSON.parse(messagePayload);
        } else {
          parsedPayload = messagePayload;
        }
        
       
        const { content, chat } = parsedPayload;
      
        const result = await generateContent(content);
        
       
        socket.emit("ai-response", {
          message: result,
          chat: chat 
        });
        
      } catch (error) {
        console.error("Error processing AI message:", error);
        socket.emit("ai-error", {
          error: "Failed to generate AI response",
          chat: parsedPayload?.chat || messagePayload?.chat
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user?.email);
    });
  });

  return io;
}

export default setupSocketServer;