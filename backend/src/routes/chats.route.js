import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import { createChat, getChats, getMessages } from '../controllers/chat.controller.js';


const router = express.Router();


router.post('/', authUser,createChat);

router.get('/', authUser, getChats)


/* GET /api/chat/messages/:id */
router.get('/messages/:id', authUser, getMessages)


export default router;