const express = require('express');
const {
  getTaskByUserId,
  createTask,
  editTask,
  deleteTask,
  getTaskById,
  editTaskProgress,
} = require('../controllers/task.controller');

const router = express.Router();

router.get('/:taskId', getTaskById);
router.get('/user/:userId', getTaskByUserId);
router.post('/user/:userId', createTask);
router.put('/user/:userId/:taskId', editTask);
router.put('/user/progress/:userId/:taskId', editTaskProgress);
router.delete('/user/:userId/:taskId', deleteTask);

module.exports = router;
