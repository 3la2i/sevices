const express = require('express');
const router = express.Router();
const contentController = require('../Controllers/contentController');

router.get('/', contentController.getAllContent);
router.get('/:section', contentController.getContentBySection);
router.put('/:section', contentController.updateContent);

module.exports = router;  