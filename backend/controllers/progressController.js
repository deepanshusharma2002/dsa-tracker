const User = require('../models/User');
const Problem = require('../models/Problem');

const getProgress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('progress');
        res.json({ progress: user.progress });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const markComplete = async (req, res) => {
    try {
        const { problemId } = req.params;

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const user = await User.findById(req.user._id);

        if (!user.progress.includes(problemId)) {
            user.progress.push(problemId);
            await user.save();
        }

        res.json({ message: 'Problem marked as completed', progress: user.progress });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const unmarkComplete = async (req, res) => {
    try {
        const { problemId } = req.params;

        const user = await User.findById(req.user._id);
        user.progress = user.progress.filter(
            (id) => id.toString() !== problemId.toString()
        );
        await user.save();

        res.json({ message: 'Problem unmarked', progress: user.progress });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getProgress, markComplete, unmarkComplete };
