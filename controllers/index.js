const Story = require('../models/Story');
const { requireAuth, ensureGuest } = require('../middleware/auth');

// @desc  Login/Landing page
exports.renderLandingPage = (req, res) => {
  res.render('../views/login', { layout: 'layouts/login' });
};

// @desc  render dashboard page
exports.renderDashboardPage = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('../views/dashboard', { name: req.user.firstName, stories });
  } catch (e) {
    console.error(e.message);
    res.render('error/500');
  }
};

// @desc  Login/Landing page
// router.get('/', ensureGuest, (req, res) => {
//   res.render('../views/login', { layout: 'layouts/login' });
// });

// router.get('/dashboard', requireAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ user: req.user.id }).lean();
//     res.render('../views/dashboard', { name: req.user.firstName, stories });
//   } catch (e) {
//     console.error(e.message);
//     res.render('error/500');
//   }
// });

// module.exports = router;
