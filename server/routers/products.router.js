import express from 'express';
import {
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';

const router = express.Router();
router.route('/').get(readProduct).post(createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

export default router;
