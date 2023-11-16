const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', editUser);
router.delete('/:userId', deleteUser);

module.exports = router;
