// controllers/likeAndDislikeController.js
const asyncHandler = require('express-async-handler');
const addTattoo = require('../../models/tattoosModels/addTattoos');


// Post Api Methed

exports.addLike = asyncHandler(async (req, res) => {
    try {
        const tattoo = await addTattoo.findByIdAndUpdate(req.params.id, {
            
            $inc: { likes: 1 },
        }, { new: true });

        console.log(tattoo);
        res.status(200).json(tattoo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to like tattoo' });
    }
});

// Post Api Methed

exports.addDislike = asyncHandler(async (req, res) => {
    try {
        const tattoo = await addTattoo.findByIdAndUpdate(req.params.id, {
            $inc: { dislikes: 1 },
        }, { new: true });
        res.status(200).json(tattoo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to dislike tattoo' });
    }
});

