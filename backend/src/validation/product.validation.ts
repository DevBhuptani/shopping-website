import Joi from 'joi';

const productSchema = Joi.object({
  productId: Joi.string().min(2).max(20).trim().required().messages({
    'string.base': 'Product ID should be a string.',
    'string.empty': 'Product ID must contain a value.',
    'string.trim': 'Product ID may not contain spaces at the beginning or end.',
    'any.required': 'Product ID is a required field.',
  }),
  productPhoto: Joi.string().uri().required().messages({
    'string.base': 'Product photo URL should be a string.',
    'string.empty': 'Product photo URL must contain a value.',
    'string.uri': 'Product photo URL must be a valid URI.',
    'any.required': 'Product photo URL is a required field.',
  }),
  productPrice: Joi.number().positive().min(1).required().messages({
    'number.base': 'Product price should be a number.',
    'number.empty': 'Product price must contain a value.',
    'number.positive': 'Product price must be a positive number.',
    'number.min': 'Product price must be at least 1.',
    'any.required': 'Product price is a required field.',
  }),
  productTitle: Joi.string().min(2).max(100).trim().required().messages({
    'string.base': 'Product title should be a string.',
    'string.empty': 'Product title must contain a value.',
    'string.trim':
      'Product title may not contain spaces at the beginning or end.',
    'any.required': 'Product title is a required field.',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity should be a number.',
    'number.empty': 'Quantity must contain a value.',
    'number.integer': 'Quantity must be an integer.',
    'number.min': 'Quantity must be at least 1.',
    'any.required': 'Quantity is a required field.',
  }),
});

export { productSchema };
