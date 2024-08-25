import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  DATABASE: process.env.DB,
  SALT_ROUND: parseInt(`${process.env.SALT_ROUND}`),
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_EXPIRE: process.env.JWT_EXPIRE
};
