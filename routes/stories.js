const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const {
  renderAddStoryPage,
  addStory,
  getAllStories,
  getSingleStory,
  renderEditPage,
  editStory,
  deleteStory,
  renderUserStories,
} = require('../controllers/stories');

router.get('/add', requireAuth, renderAddStoryPage);

router.post('/', requireAuth, addStory);

router.get('/', requireAuth, getAllStories);

router.get('/:id', requireAuth, getSingleStory);

router.get('/edit/:id', requireAuth, renderEditPage);

router.put('/:id', requireAuth, editStory);

router.delete('/:id', requireAuth, deleteStory);

router.get('/user/:userId', requireAuth, renderUserStories);

module.exports = router;
