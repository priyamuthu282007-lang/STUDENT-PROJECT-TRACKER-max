const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title venum'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  teamMembers: {
    type: [String], // ex: ["Arun", "Bala", "Karthik"]
    required: true
  },
  teamLead: {
    type: String,
    required: true
  },
  guideName: {
    type: String,
    default: 'Not Assigned'
  },
  department: {
    type: String,
    default: 'IT'
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
    default: 'Planning'
  },
  githubLink: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);