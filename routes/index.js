const router = require('express').Router();
const { requireAuth, ensureGuest } = require('../middleware/auth');

// @desc  Login/Landing page
router.get('/', ensureGuest, (req, res) => {
  res.render('../views/login', { layout: 'layouts/login' });
});

router.get('/dashboard', requireAuth, (req, res) => {
  res.render('../views/dashboard');
});

module.exports = router;
