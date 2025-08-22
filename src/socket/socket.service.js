import { Server } from "socket.io";
import {generateContent} from "../services/ai-service.js";

function setupSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
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