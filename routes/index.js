const router = require('express').Router();

// @desc  Login/Landing page
router.get('/', (req, res) => {
  res.render('../views/login', { layout: 'layouts/login' });
});

router.get('/dashboard', (req, res) => {
  res.render('../views/dashboard');
});

module.exports = router;
