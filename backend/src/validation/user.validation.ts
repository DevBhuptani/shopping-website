import Joi from 'joi';

const signUpSchema = Joi.object().keys({
  name: Joi.string().min(2).max(20).trim().required().messages({
    'string.base': 'name should be a type of string',
    'string.empty': 'name must contain a value',
    'string.trim': 'name may not contain any spaces at the beginning or end',
    'any.required': 'name is a required field',
    'string.pattern.base': 'name is a required field',
  }),
  email: Joi.string().email().trim().required().messages({
    'string.base': 'email should be a type of string',
    'string.trim': 'email may not contain any spaces at the beginning or end',
    'string.empty': 'email must contain a value',
    'any.required': 'email is a required field',
  }),
  password: Joi.string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
    .required()
    .messages({
      'string.base': 'password should be type of date in string',
      'string.trim':
        'password may not contain any spaces at the beginning or end',
      'string.empty': 'password must contain a value',
      'any.required': 'password is a required field',
      'string.pattern.base': `password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character`,
    }),
});

const signInSchema = Joi.object().keys({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'email should be a type of string',
    'string.trim': 'email may not contain any spaces at the beginning or end',
    'string.empty': 'email must contain a value',
    'any.required': 'email is a required field',
  }),
  password: Joi.string().trim().min(8).required().messages({
    'string.base': 'password should be type of date in string',
    'string.trim':
      'password may not contain any spaces at the beginning or end',
    'string.empty': 'password must contain a value',
    'any.required': 'password is a required field',
  }),
});

export { signUpSchema, signInSchema };
