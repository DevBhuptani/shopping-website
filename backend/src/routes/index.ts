import userRoutes from './user.route';
import productRoutes from './product.route';
import orderRoutes from './order.route';

const routes = (app: any) => {
  app.use('/auth', userRoutes);
  app.use('/products', productRoutes);
  app.use('/orders', orderRoutes);
};

export default routes;
