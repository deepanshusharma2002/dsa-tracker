const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
    {
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        youtubeLink: {
            type: String,
            default: '',
        },
        codingLink: {
            type: String,
            default: '',
        },
        articleLink: {
            type: String,
            default: '',
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Medium',
        },
        status: {
            type: Number,
            default: 1, // Suppose 1 active, 0 soft deleted, 2 is inactive
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);
