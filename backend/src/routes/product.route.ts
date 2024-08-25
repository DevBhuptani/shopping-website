import { Router } from 'express';
import authorization from '../middleware/authorization';
import {
  addProducts,
  getAllProducts,
  individualProducts,
} from '../controller/product.controller';
import validator from '../validation';
import { productSchema } from '../validation/product.validation';

const router = Router();

router.get('/', getAllProducts);
router.get('/:asin', authorization, individualProducts);
router.post('/', validator(productSchema, 'body'), addProducts);

export default router;
