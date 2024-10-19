const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.log('catch', error);
  }
};

export default connectToDataBase;
