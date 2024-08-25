import Joi from 'joi';

const productSchema = Joi.object({
  asin: Joi.string().min(2).max(20).trim().required().messages({
    'string.base': 'ASIN should be a string.',
    'string.empty': 'ASIN must contain a value.',
    'string.trim': 'ASIN may not contain spaces at the beginning or end.',
    'any.required': 'ASIN is a required field.',
  }),
  product_photo: Joi.string().uri().required().messages({
    'string.base': 'Product photo URL should be a string.',
    'string.empty': 'Product photo URL must contain a value.',
    'string.uri': 'Product photo URL must be a valid URI.',
    'any.required': 'Product photo URL is a required field.',
  }),
  product_price: Joi.string().min(1).max(20).trim().required().messages({
    'string.base': 'Product price should be a string.',
    'string.empty': 'Product price must contain a value.',
    'string.trim':
      'Product price may not contain spaces at the beginning or end.',
    'any.required': 'Product price is a required field.',
  }),
  product_title: Joi.string().min(2).max(100).trim().required().messages({
    'string.base': 'Product title should be a string.',
    'string.empty': 'Product title must contain a value.',
    'string.trim':
      'Product title may not contain spaces at the beginning or end.',
    'any.required': 'Product title is a required field.',
  }),
  quantity: Joi.string().min(1).max(10).required().messages({
    'string.base': 'Quantity should be a string.',
    'string.empty': 'Quantity must contain a value.',
    'string.trim': 'Quantity may not contain spaces at the beginning or end.',
    'any.required': 'Quantity is a required field.',
  }),
});

export { productSchema };
