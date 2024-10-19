import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';
import UserModel from '../model/user.model';

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeaders = req.headers.authorization;
    if (!bearerHeaders) {
      if (req.body.all) {
        next();
      } else {
        return res.status(404).json({ status: 404, message: `Token required` });
      }
    } else {
      const bearerToken = bearerHeaders.split('Bearer ')[1];
      jwt.verify(bearerToken, config.SECRET_KEY, async (error, token: any) => {
        if (error) {
          console.log(error);
          // Token has been expired
          return res
            .status(401)
            .json({ status: 401, message: 'Invalid auth token' });
        }
        if (!token) {
          return res
            .status(403)
            .json({ status: 403, message: 'Token not found' });
        }
        req.headers.tokenData = token;
        
        const presentUser = await UserModel.findOne({
          userId: token?.userId,
        }).select('-__v -_id');

        if (!presentUser) {
          return res
            .status(404)
            .json({ status: 404, message: 'User not found' });
        } else if (presentUser.isLoggedIn === false) {
          return res
            .status(403)
            .json({ status: 403, message: 'User is not logged in' });
        }

        next();
      });
    }
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({ status: 400, message: `Invalid token` });
  }
};

export default authorization;
