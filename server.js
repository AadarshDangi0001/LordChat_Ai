import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/db/db.js';
import setupSocketServer from './src/socket/socket.service.js';
import http from 'http';


const httpServer = http.createServer(app);
connectDB();
setupSocketServer(httpServer);

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});