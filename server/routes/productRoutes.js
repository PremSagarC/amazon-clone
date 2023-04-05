import express from 'express';
import { getProducts, getSingleProduct } from '../controllers/productRoutes.js';

const router = express.Router();

// GET all products
router.get('/', getProducts)

// GET single product
router.get('/:id', getSingleProduct)

export default router;