const { Router } = require('express');
const { userController } = require('../controllers');
const passport = require('passport');
const { setUserToken } = require('../utils/authUtils');

const authRouter = Router();

authRouter.post('/sign-up', userController.postSignUpInfo);

authRouter.post(
  '/sign-in',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const { email } = req.body;
      setUserToken(res, email);
      res.status(201).json();
    } catch (e) {
      next(e);
    }
  },
);

authRouter.post('/sign-out', (req, res, next) => {
  try {
    res.status(201).clearCookie('token').json();
  } catch (e) {
    next(e);
  }
});

module.exports = authRouter;
