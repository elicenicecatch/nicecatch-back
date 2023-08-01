const { userDAO } = require('../models/model');
const { hashPassword } = require('../utils/authUtils');

const userService = {
  async postSignUpInfo(email, password, nickName, image) {
    const hashedPassword = await hashPassword(password);
    const toPost = { email, password: hashedPassword, nickName, image };
    const user = await userDAO.createUser(toPost);
    return user;
  },

  async getUsers() {
    const users = await userDAO.findAll();
    return users;
  },

  async getUserByEmail(email) {
    const user = await userDAO.findOneByEmail(email);
    return user;
  },

  async patchUserByEmail(email, toUpdate) {
    const user = await userDAO.updateOneByEmail(email, toUpdate);
    return user;
  },
};

module.exports = userService;
