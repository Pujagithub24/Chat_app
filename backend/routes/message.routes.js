import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/:id",protectRoute,getMessages);

//before run this function sendMessage we check that user is loggedin or not for that we use middleware
//not every user in our app will able to sendmessage , but only those who will pass this function protectRoute
router.post("/send/:id",protectRoute,sendMessage);

export default router;

