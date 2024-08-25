import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  asin: { type: String, required: true },
  product_title: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_photo: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model('product', ProductSchema);

export default ProductModel;
