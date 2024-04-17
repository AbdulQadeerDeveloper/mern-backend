// controllers/commentController.js
const asyncHandler = require('express-async-handler');
const Comment = require('../../models/tattoosModels/commentModel');
const addTattoo = require('../../models/tattoosModels/addTattoos');



// Post Api Methed

exports.addComment = asyncHandler(async (req, res) => {
    console.log("Request to /submitComment/:id received");
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
    const { text, author, rating } = req.body;
    const tattooId = req.params.id; // Corrected from req.params.tattooId

    try {
        const newComment = await Comment.create({ text, author, rating });
        await addTattoo.findByIdAndUpdate(
            tattooId,
            { $push: { comment: newComment._id } },
            { new: true }
        );

        res.status(201).send('Comment added successfully');
    } catch (error) {
        res.status(400).send('Error adding comment');
    }
});


// Get Api Methed

exports.getComment = asyncHandler(async (req, res) => {
    try {
        const { tattooId } = req.params;

        // Find the tattoo by ID and populate the comments
        const tattooWithComments = await addTattoo.findById(tattooId).populate('comment').exec();

        if (!tattooWithComments) {
            return res.status(404).json({ message: 'Tattoo not found' });
        }

        // Optionally, if you want to return comments directly instead of the tattoo with comments
        const comments = tattooWithComments.comment.map(comment => ({
            text: comment.text,
            author: comment.author,
            rating: comment.rating
        }));

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update Api Methed

exports.updateComment = asyncHandler(async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
            text: req.body.text,
            author: req.body.author,
            rating: req.body.rating
        }, { new: true, runValidators: true });

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Delete Api Methed

exports.deleteComment = asyncHandler(async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Update the Tattoo document by pulling the deleted comment's ID from the comments array
        await Tattoo.findByIdAndUpdate(deletedComment.tattooId, {
            $pull: { comments: deletedComment._id }
        }, { new: true, useFindAndModify: false });

        res.status(204).send();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

