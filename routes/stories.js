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
    res.render('error/500');
  }
});

// @desc  Show all stories
// @route GET /stories
router.get('/', requireAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/index', { stories });
  } catch (e) {
    console.error(e.message);
    res.render('error/500');
  }
});

// @desc  Show edit page
// @route GET /stories/edit/:id
router.get('/edit/:id', requireAuth, async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();

    if (!story) {
      return res.render('error/404');
    }

    if (story.user != req.user.id) {
      return res.redirect('stories/edit');
    }

    res.render('stories/edit', { story });
  } catch (e) {
    console.error(e.message);
    res.render('error/500');
  }
});

// @desc  Edit Story
// @route PUT /stories/:id
router.put('/:id', requireAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render('error/404');
    }

    if (story.user != req.user.id) {
      return res.redirect('stories/edit');
    }

    story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect('/dashboard');
  } catch (e) {
    console.error(e.message);
    res.render('error/500');
  }
});

module.exports = router;
