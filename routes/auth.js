const router = require('express').Router();
const passport = require('passport');

// @desc Auth with goog;e
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc google auth calback
// @route GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),

  (req, res) => {
    // Successful authentication, redirect dashboard.
    res.redirect('/dashboard');
  }
);

module.exports = router;
