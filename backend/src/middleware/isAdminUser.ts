import { Request, Response, NextFunction } from 'express';

const isAdminUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.headers.tokenData;

    if (user?.role === 'admin') {
      return next();
    } else {
      return res
        .status(403)
        .json({ status: 403, message: 'Access denied. You are not an admin.' });
    }
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong. Please try again.',
    });
  }
};

export default isAdminUser;
