import express from 'express';
import { createMembership, getMembershipByNumber, getUserMembership, extendMembership, cancelMembership, getAllMemberships } from '../controllers/membershipController.js';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyJWT, authorizeRoles('user'), createMembership);
router.get('/user', verifyJWT, authorizeRoles('user'), getUserMembership);
router.get('/all', verifyJWT, authorizeRoles('admin'), getAllMemberships);
router.get('/:membershipNumber', verifyJWT, getMembershipByNumber);
router.put('/extend', verifyJWT, extendMembership);
router.put('/cancel', verifyJWT, cancelMembership);

export default router;
