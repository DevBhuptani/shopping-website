import { Router } from 'express';
import authorization from '../middleware/authorization';
import {
  addProducts,
  getAllProducts,
  individualProducts,
} from '../controller/product.controller';
import validator from '../validation';
import { productSchema } from '../validation/product.validation';
import isAdminUser from '../middleware/isAdminUser';

const router = Router();

router.get('/', getAllProducts);
router.get('/:productId', authorization, individualProducts);
router.post(
  '/',
  authorization,
  isAdminUser,
  validator(productSchema, 'body'),
  addProducts
);

export default router;
