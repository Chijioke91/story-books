const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const Story = require('../models/Story');

// @desc  Show add story page
// @route GET stories/add
router.get('/add', requireAuth, async (req, res) => {
  res.render('../views/stories/add');
});

// @desc  add a story
// @route POST /stories
router.post('/', requireAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
