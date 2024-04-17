// controllers/placementController.js
const asyncHandler = require('express-async-handler');
const PlacementColor = require('../../models/tattoosModels/tattoosPlace');


// Post Api Methed

exports.addPlacement = asyncHandler(async (req, res) => {
    try {
        const newPlacement = new PlacementColor(req.body);
        await newPlacement.save();
        res.status(201).json(newPlacement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Api Methed

exports.getPlacement = asyncHandler(async (req, res) => {
    try {
        const placements = await PlacementColor.find();
        res.json(placements);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Get Id Api Methed

exports.getIdPlacement = asyncHandler(async (req, res) => {
    let Placement = await PlacementColor.findOne({ _id: req.params.id });
    if (Placement) {
        res.json(Placement);
    } else {
        res.status(404).send("Category not found!");
    }
});



// Update Id Api Methed

exports.updatePlacement = asyncHandler(async (req, res) => {
    let Placement = await PlacementColor.updateOne(
        {_id: req.params.id, },
        {$set: req.body}
    );
    if (Placement) {
        res.json(Placement);
    } else {
        res.status(404).send("Category not found!");
    }
});





// Delete Api Methed

exports.deletePlacement = asyncHandler(async (req, res) => {
    try {
        const deletedPlacement = await PlacementColor.findByIdAndDelete(req.params.id);
        if (!deletedPlacement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        res.status(204).send(); // 204 No Content, indicates success but no content to return.
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

