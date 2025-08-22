import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import authRouter from './routes/auth.route.js';
import chatRouter from './routes/chats.route.js';



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Use Routes
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);



export default app;


