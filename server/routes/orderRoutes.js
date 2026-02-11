import express from 'express';
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyJWT, authorizeRoles('user'), createOrder);
router.get('/user', verifyJWT, authorizeRoles('user'), getUserOrders);
router.get('/all', verifyJWT, authorizeRoles('admin', 'vendor'), getAllOrders);
router.patch('/:id/status', verifyJWT, authorizeRoles('admin', 'vendor'), updateOrderStatus);

export default router;
