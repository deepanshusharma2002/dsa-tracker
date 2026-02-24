const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        order: {
            type: Number,
            default: 0,
        },
        status: {
          type: Number,
          default: 1, // Suppose 1 active, 0 soft deleted, 2 is inactive
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Topic', topicSchema);
