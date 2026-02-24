const express = require('express');
const router = express.Router();
const {
    getAllTopics,
    getProblemsByTopic,
    getAllTopicsWithProblems,
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/topics', getAllTopics);
router.get('/all', getAllTopicsWithProblems);
router.get('/topic/:topicId', getProblemsByTopic);

module.exports = router;
