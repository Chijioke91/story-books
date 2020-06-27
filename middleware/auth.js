module.exports = {
  requireAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/');
    }
  },

  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/dashboard');
    } else {
      return next();
    }
  },
};
