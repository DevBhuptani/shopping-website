import { Request, Response } from 'express';

const buyProduct = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: 'Something went wrong. Please try again' });
  }
};

export { buyProduct };
