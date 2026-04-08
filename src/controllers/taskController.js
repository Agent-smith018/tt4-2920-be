// Task controller for creating and retrieving tasks
const Task = require('../models/Task');
const resolveAssignedUserId = require('../utils/resolveAssignedUserId');

// Create a new task
async function createTask(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { title, description, done, priority, assignedUserId } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
   
    const resolvedAssignedUserId = await resolveAssignedUserId(assignedUserId);
    if (resolvedAssignedUserId && resolvedAssignedUserId.error) {
      return res.status(400).json({ error: resolvedAssignedUserId.error });
    }
    const task = await Task.create({
      title,
      description,
      done,
      priority,
      assignedUserId: resolvedAssignedUserId,
      userId: req.user.id
    });
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

// Get all tasks for the authenticated user
async function getTasks(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.user.id;
    const tasks = await Task.find({
      $or: [
        { userId },
        { assignedUserId: userId }
      ]
    }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createTask, getTasks };
