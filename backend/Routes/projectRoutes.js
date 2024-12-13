const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController');

router.get('/', projectController.getAllProjects);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router; 