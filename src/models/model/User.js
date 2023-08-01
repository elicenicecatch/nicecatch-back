const mongoose = require('mongoose');
const { UserSchema } = require('../schemas');

const User = mongoose.model('User', UserSchema);

const userDAO = {
  async createUser(toCreate) {
    const user = await User.create(toCreate);
    return user;
  },

  async findAll() {
    const users = await User.find({}).lean();
    return users;
  },

  async findOneByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
  },

  async updateOneByEmail(email, toUpdate) {
    const user = await User.findOneAndUpdate({ email }, toUpdate, {
      new: true,
    }).lean();
    return user;
  },
};

module.exports = userDAO;
