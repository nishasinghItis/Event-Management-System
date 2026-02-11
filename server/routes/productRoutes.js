import express from 'express';
import { createProduct, getProducts, getVendorProducts, getAllProducts, updateProduct, deleteProduct, updateProductStatus } from '../controllers/productController.js';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyJWT, authorizeRoles('vendor'), createProduct);
router.get('/', verifyJWT, getProducts);
router.get('/vendor', verifyJWT, authorizeRoles('vendor'), getVendorProducts);
router.get('/all', verifyJWT, authorizeRoles('admin'), getAllProducts);
router.put('/:id', verifyJWT, authorizeRoles('vendor'), updateProduct);
router.delete('/:id', verifyJWT, authorizeRoles('vendor'), deleteProduct);
router.patch('/:id/status', verifyJWT, authorizeRoles('admin', 'vendor'), updateProductStatus);

export default router;
