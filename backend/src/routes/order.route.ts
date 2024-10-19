import { Router } from 'express';
import validator from '../validation';
import { orderSchema } from '../validation/order.validation';
import { buyProduct } from '../controller/order.controller';
import authorization from '../middleware/authorization';

const router = Router();

router.post('/', authorization, validator(orderSchema, 'body'), buyProduct);

export default router;
