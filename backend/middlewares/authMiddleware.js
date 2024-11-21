// middlewares/authMiddleware.js
const passport = require('passport');

const authMiddleware = {
  authorize(roles = []) {
    return [
      passport.authenticate('jwt', { session: false }),
      (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      }
    ];
  }
};

module.exports = authMiddleware;
