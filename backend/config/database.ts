const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectToDataBase = async () => {
  try {
    mongoose.connect(process.env.DB);
    console.log('Connected to the database');
  } catch (error) {
    console.log('catch', error);
  }
};

export default connectToDataBase;
