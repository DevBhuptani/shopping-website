import userRoutes from './user.route';
import productRoutes from './product.route';
import orderRoutes from './order.route';
import { Router } from 'express-serve-static-core';

const routes = (app: { use: (arg0: string, arg1: Router) => void; }) => {
  app.use('/auth', userRoutes);
  app.use('/products', productRoutes);
  app.use('/orders', orderRoutes);
};

export default routes;
