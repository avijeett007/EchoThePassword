const User = require('../models/User');

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
  }
};

const updateUserById = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    console.log('User updated:', user);
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    console.log('User deleted:', user);
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail
};
