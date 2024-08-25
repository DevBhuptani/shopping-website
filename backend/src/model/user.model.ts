const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, allowNull: false },
  email: { type: String, allowNull: false },
  password: { type: String, allowNull: false },
  isAdmin: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
