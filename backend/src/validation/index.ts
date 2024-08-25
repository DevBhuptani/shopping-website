import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

type ValidationFlag = 'body' | 'params' | 'query';

const validator = (schema: Schema, flag: ValidationFlag) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateDataLocation = {
        body: req.body,
        params: req.params,
        query: req.query,
      };
      const validateData = eval(validateDataLocation[flag]);
      const { error, value } = await schema.validate(validateData, {
        abortEarly: false,
      });

      if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ status: 400, message: errorMessage });
      } else {
        req[flag] = value;
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: `Validation Error try-catch ==${error}`,
        data: null,
      });
    }
  };
};

export default validator;
