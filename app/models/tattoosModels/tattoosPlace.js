const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const PlacementColor = mongoose.model('placements', placementSchema);

module.exports = PlacementColor;
