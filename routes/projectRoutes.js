const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// GET ALL PROJECTS - GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET SINGLE PROJECT - GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project illa' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE PROJECT - POST /api/projects
router.post('/', async (req, res) => {
  try {
    const { title, description, teamMembers, teamLead, guideName } = req.body;
    const project = await Project.create({
      title,
      description,
      teamMembers,
      teamLead,
      guideName
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE PROJECT - PUT /api/projects/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE PROJECT - DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;