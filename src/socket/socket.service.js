import { Server } from "socket.io";
import {generateContent} from "../services/ai-service.js";
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

 io.use(  async  (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
    if(!cookies.token) {
      return next(new Error("Authentication error"));
    }
    try {
      
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user= user
      next();

    } catch (error) {
      return next(new Error("Authentication error"));
      
    }
    
    next();
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("ai-message", async (message) => {
       const result = await generateContent(message);
      
         socket.emit("ai-message-response", result);

      });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}

export default setupSocketServer;