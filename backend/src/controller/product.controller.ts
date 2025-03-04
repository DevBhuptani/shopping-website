import { Request, Response } from 'express';
import ProductModel from '../model/product.model';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Fetch all products where quantity is greater than 0
    const products = await ProductModel.find({ quantity: { $gt: 0 } }).select(
      '-__v -_id'
    );

    return res.status(200).json({
      status: 200,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: 'Something went wrong. Please try again' });
  }
};

const individualProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findOne({ productId }).select(
      '-__v -_id'
    );

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      status: 200,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again.',
    });
  }
};

const addProducts = async (req: Request, res: Response) => {
  try {
    const { productId, ...otherProductDetails } = req.body;

    const existingProduct = await ProductModel.findOne({ productId }).select(
      '-__v -_id'
    );

    if (existingProduct) {
      return res.status(400).json({
        status: 400,
        message: 'Product is already added.',
      });
    }

    const newProduct = await ProductModel.create({
      productId,
      ...otherProductDetails,
    });

    return res.status(201).json({
      status: 201,
      message: 'Product added successfully!',
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: 'Something went wrong. Please try again' });
  }
};

export { getAllProducts, addProducts, individualProducts };
