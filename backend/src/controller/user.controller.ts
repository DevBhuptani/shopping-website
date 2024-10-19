import { Request, Response } from 'express';
import UserModel from '../model/user.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';

const signUp = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    // Check if user already exists
    const userExists = await UserModel.find({ email: body.email }).select(
      '-__v -_id'
    );
    if (userExists?.length > 0 && userExists) {
      return res.status(409).json({
        status: 409,
        message: 'User already registered. Please Login',
        data: {},
      });
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(
      body.password,
      config.SALT_ROUND
    );
    body.password = encryptedPassword;

    body.isLoggedIn = true;

    // Set isAdmin based on specific condition
    if (body.name === 'Devil' && body.email === 'devbhuptani20@gmail.com') {
      body.role = 'admin';
    }

    // Create new user
    const user = await UserModel.create(body);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Please enter valid credentials', data: {} });
    }

    // Generate a JWT token for the new user
    const token = jwt.sign(
      {
        userId: user?.userId,
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
      config.SECRET_KEY,
      {
        expiresIn: config.JWT_EXPIRE,
      }
    );
    res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 86400 });

    return res.status(200).json({
      status: 200,
      message: 'Account created Successfully',
      data: {
        userId: user?.userId,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        token,
      },
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong, Please try again',
    });
  }
};

const signIn = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'Please Sign In with registered email',
      });
    }

    // Check if the password matches
    const isPasswordMatched = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid credentials',
      });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        userId: user?.userId,
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
      config.SECRET_KEY,
      {
        expiresIn: config.JWT_EXPIRE,
      }
    );

    // Set the token in a cookie for the client
    res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 86400 });

    // Update user status to logged in
    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      status: 200,
      message: 'Login Successfully',
      data: {
        userId: user?.userId,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        token,
      },
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      status: 500,
      message: 'Something went wrong, Please try again',
    });
  }
};

const viewProfile = async (req: Request, res: Response) => {
  try {
    const token = req.body.tokenData;
    const user = await UserModel.findOne({ userId: token?.userId }).select(
      '-__v -_id'
    );
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'User not found',
        data: {},
      });
    }

    delete user?.password;

    return res.status(200).json({
      status: 200,
      message: 'User Profile',
      data: {
        personalDetails: user,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: 'Something went wrong. Please try again' });
  }
};

export { signUp, signIn, viewProfile };
