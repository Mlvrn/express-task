const express = require('express');
const userRoute = require('./user.route');
const taskRoute = require('./task.route');
const tagRoute = require('./tag.route');
const router = express.Router();

router.use('/users', userRoute);
router.use('/tasks', taskRoute);
router.use('/tags', tagRoute);

module.exports = router;
