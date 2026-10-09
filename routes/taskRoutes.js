const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET ALL TASKS (for MyTasks page) - GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET TASKS BY PROJECT ID - GET /api/tasks/:projectId
router.get('/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE TASK - POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { projectId, title, assignedTo, deadline, priority } = req.body;
    const task = await Task.create({
      projectId,
      title,
      assignedTo,
      deadline,
      priority
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE TASK STATUS - PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE TASK - DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;