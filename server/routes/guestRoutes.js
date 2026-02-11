import express from 'express';
import { getGuests, addGuest, updateGuest, deleteGuest } from '../controllers/guestController.js';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyJWT, authorizeRoles('user'), getGuests);
router.post('/', verifyJWT, authorizeRoles('user'), addGuest);
router.put('/:id', verifyJWT, authorizeRoles('user'), updateGuest);
router.delete('/:id', verifyJWT, authorizeRoles('user'), deleteGuest);

export default router;
