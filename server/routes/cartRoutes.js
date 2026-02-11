import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartController.js';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyJWT, authorizeRoles('user'), getCart);
router.post('/', verifyJWT, authorizeRoles('user'), addToCart);
router.delete('/:productId', verifyJWT, authorizeRoles('user'), removeFromCart);
router.delete('/', verifyJWT, authorizeRoles('user'), clearCart);

export default router;
