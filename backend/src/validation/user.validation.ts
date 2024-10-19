import Joi from 'joi';

const signUpSchema = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(20)
    .trim()
    .pattern(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      'string.base': 'Name should be a type of string',
      'string.empty': 'Name must contain a value',
      'string.trim': 'Name may not contain any spaces at the beginning or end',
      'any.required': 'Name is a required field',
      'string.pattern.base': 'Name is a required field',
    }),
  email: Joi.string().email().trim().required().messages({
    'string.base': 'E-mail should be a type of string',
    'string.trim': 'E-mail may not contain any spaces at the beginning or end',
    'string.empty': 'E-mail must contain a value',
    'any.required': 'E-mail is a required field',
  }),
  password: Joi.string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
    .required()
    .messages({
      'string.base': 'Password should be type of date in string',
      'string.trim':
        'Password may not contain any spaces at the beginning or end',
      'string.empty': 'Password must contain a value',
      'any.required': 'Password is a required field',
      'string.pattern.base': `Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.`,
    }),
});

const signInSchema = Joi.object().keys({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'E-mail should be a type of string',
    'string.trim': 'E-mail may not contain any spaces at the beginning or end',
    'string.empty': 'E-mail must contain a value',
    'any.required': 'E-mail is a required field',
  }),
  password: Joi.string().trim().min(8).required().messages({
    'string.base': 'Password should be type of date in string',
    'string.trim':
      'Password may not contain any spaces at the beginning or end',
    'string.empty': 'Password must contain a value',
    'any.required': 'Password is a required field',
  }),
});

export { signUpSchema, signInSchema };
