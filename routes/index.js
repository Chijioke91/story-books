const router = require('express').Router();
const { requireAuth, ensureGuest } = require('../middleware/auth');
const {
  renderDashboardPage,
  renderLandingPage,
} = require('../controllers/index');

router.get('/', ensureGuest, renderLandingPage);

router.get('/dashboard', requireAuth, renderDashboardPage);

module.exports = router;
