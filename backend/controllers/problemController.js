const Topic = require('../models/Topic');
const Problem = require('../models/Problem');

const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find().sort({ order: 1 });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getProblemsByTopic = async (req, res) => {
    try {
        const problems = await Problem.find({ topicId: req.params.topicId });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllTopicsWithProblems = async (req, res) => {
    try {
        const topics = await Topic.find().sort({ order: 1 });
        const result = await Promise.all(
            topics.map(async (topic) => {
                const problems = await Problem.find({ topicId: topic._id });
                return { ...topic.toObject(), problems };
            })
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllTopics, getProblemsByTopic, getAllTopicsWithProblems };
