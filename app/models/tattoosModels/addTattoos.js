const mongoose = require('mongoose');

// Define schema for tattoos
const tattooSchema = new mongoose.Schema({
    tattoosTitle: { type: String, required: true },
    tattoosDis: { type: String, required: true },
    tattooImage: { type: String, required: true },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
    placement: { type: mongoose.Schema.Types.ObjectId, ref: 'placements', required: true },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    tagTattoos: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Approved', 'Pending', 'Rejected'] },
});

const addTattoo = mongoose.model('addTattoo', tattooSchema);

module.exports = addTattoo;
