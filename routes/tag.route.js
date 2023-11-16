const express = require('express');
const {
  getTags,
  createTag,
  getTagById,
  editTag,
  deleteTag,
} = require('../controllers/tag.controller');

const router = express.Router();

router.get('/', getTags);
router.get('/:tagId', getTagById);
router.post('/', createTag);
router.post('/:tagId', editTag);
router.delete('/:tagId', deleteTag);

module.exports = router;
