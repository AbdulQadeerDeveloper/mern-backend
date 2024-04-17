const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
