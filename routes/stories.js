const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const Story = require('../models/Story');

// @desc  Show add story page
// @route GET stories/add
router.get('/add', requireAuth, async (req, res) => {
  res.render('../views/stories/add');
});

module.exports = router;
