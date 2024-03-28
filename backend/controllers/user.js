const UserModel = require('../models/User');

const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next({ status: 500, message: 'Internal Server Error', error });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return next({ status: 404, message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next({ status: 500, message: 'Internal Server Error', error });
  }
};

const addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next({ status: 400, message: 'Please complete all user details' });
  }

  try {
    const user = new UserModel({ username, email, password });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next({ status: 500, message: 'Internal Server Error', error });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await UserModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return next({ status: 404, message: 'User not found' });
    }
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    next({ status: 500, message: 'Internal Server Error', error });
  }
};

const updateUser = async (req, res, next) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return next({ status: 400, message: 'Please complete all required fields' });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
    if (!updatedUser) {
      return next({ status: 404, message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next({ status: 500, message: 'Internal Server Error', error });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
