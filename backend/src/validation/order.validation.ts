import Joi from 'joi';

const orderSchema = Joi.object({
  user: {},
  products: [
    {
      product: {},
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Cash on Delivery'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
});

export { orderSchema };
