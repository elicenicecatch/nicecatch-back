const { userService } = require('../services');

const userController = {
  async postSignUpInfo(req, res, next) {
    try {
      const { email, password, nickName, image } = req.body;
      const user = await userService.getUserByEmail(email);
      if (user) {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      await userService.postSignUpInfo(email, password, nickName, image);
      res.status(201).json();
    } catch (e) {
      next(e);
    }
  },

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  async getUser(req, res, next) {
    try {
      const user = await userService.getUserByEmail(req.user.userEmail);
      res.json(user);
    } catch (e) {
      next(e);
    }
  },

  async patchUser(req, res, next) {
    try {
      const { nickName, image } = req.body;
      const user = await userService.patchUserByEmail(req.user.userEmail, {
        nickName,
        image,
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = userController;
