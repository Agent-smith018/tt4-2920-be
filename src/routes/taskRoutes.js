const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');

// POST / - create a new task
router.post('/', createTask);

// GET / - get all tasks for the authenticated user
router.get('/', getTasks);

module.exports = router;
