import { Router } from 'express';
import validator from '../validation';
import { orderSchema } from '../validation/order.validation';
import { buyProduct } from '../controller/order.controller';

const router = Router();

router.post('/', validator(orderSchema, 'body'), buyProduct)

export default router;
