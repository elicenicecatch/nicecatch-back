module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(400).json({ error: '로그인 하세요.' });
  }
  next();
};
