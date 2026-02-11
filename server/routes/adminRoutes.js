import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, getAllVendors, createVendor, updateVendor, deleteVendor, getReports, getAllTransactions } from '../controllers/adminController.js';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// User Management
router.get('/users', verifyJWT, authorizeRoles('admin'), getAllUsers);
router.post('/users', verifyJWT, authorizeRoles('admin'), createUser);
router.put('/users/:id', verifyJWT, authorizeRoles('admin'), updateUser);
router.delete('/users/:id', verifyJWT, authorizeRoles('admin'), deleteUser);

// Vendor Management
router.get('/vendors', verifyJWT, authorizeRoles('admin'), getAllVendors);
router.post('/vendors', verifyJWT, authorizeRoles('admin'), createVendor);
router.put('/vendors/:id', verifyJWT, authorizeRoles('admin'), updateVendor);
router.delete('/vendors/:id', verifyJWT, authorizeRoles('admin'), deleteVendor);

// Reports & Transactions
router.get('/reports', verifyJWT, authorizeRoles('admin', 'user'), getReports);
router.get('/transactions', verifyJWT, authorizeRoles('admin', 'user'), getAllTransactions);

export default router;
