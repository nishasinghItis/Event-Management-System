import express from 'express';
import { adminSignup, adminLogin, userSignup, userLogin, vendorSignup, vendorLogin, logout, getMe } from '../controllers/authController.js';
import { verifyJWT } from '../middleware/auth.js';

const router = express.Router();

router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);
router.post('/user/signup', userSignup);
router.post('/user/login', userLogin);
router.post('/vendor/signup', vendorSignup);
router.post('/vendor/login', vendorLogin);
router.post('/logout', logout);
router.get('/me', verifyJWT, getMe);

export default router;
