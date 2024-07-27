import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const router = express.Router();

//this middleware ensures that un authenticated users will not be able to call this function getUserForSidebar
router.get("/",protectRoute,getUsersForSidebar);

export default router;