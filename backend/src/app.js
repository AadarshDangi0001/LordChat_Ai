import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import authRouter from './routes/auth.route.js';
import chatRouter from './routes/chats.route.js';



const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",   // frontend origin
  credentials: true                  // allow cookies/credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Use Routes
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);



export default app;


