import { Request, Response } from 'express';
import OrderModel from '../model/order.model';
import ProductModel from '../model/product.model';

const buyProduct = async (req: Request, res: Response) => {
  try {
    const { userId, products, totalAmount } = req.body;

    // Loop through products and check stock
    for (const item of products) {
      const product = await ProductModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: `Product with ID ${item.productId} not found.`,
        });
      }

      // Check if the requested quantity is available
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          status: 400,
          message: `Insufficient quantity for product: ${product.productTitle}. Available: ${product.quantity}, Requested: ${item.quantity}`,
        });
      }
    }

    // If all products are available in the required quantity, proceed with order creation
    const newOrder = new OrderModel({
      orderId: `order_${userId}_${Date.now()}`,
      userId,
      products,
      totalAmount,
    });

    await newOrder.save();

    // Reduce quantity in each product after the order is placed
    for (const item of products) {
      await ProductModel.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity }, // Decrement the quantity by the purchased amount
      });
    }

    return res.status(201).json({
      status: 201,
      message: 'Order placed successfully!',
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: 'Something went wrong. Please try again' });
  }
};

export { buyProduct };
