const router = require('express').Router();
const { requireAuth, ensureGuest } = require('../middleware/auth');
const Story = require('../models/Story');

// @desc  Login/Landing page
router.get('/', ensureGuest, (req, res) => {
  res.render('../views/login', { layout: 'layouts/login' });
});

router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('../views/dashboard', { name: req.user.firstName, stories });
  } catch (e) {
    console.error(e.message);
    res.render('error/500');
  }
});

module.exports = router;
