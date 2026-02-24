const express = require('express');
const router = express.Router();
const {
    getProgress,
    markComplete,
    unmarkComplete,
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getProgress);
router.post('/complete/:problemId', markComplete);
router.delete('/complete/:problemId', unmarkComplete);

module.exports = router;
