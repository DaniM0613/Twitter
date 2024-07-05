import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getNotifications, deleteNotifications /*deleteNotification*/ } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotifications);
//router.delete('/:id', protectRouted, deleteNotification); We need to create a new endpoit for deleting an specific notification by using his ID. 

export default router; 