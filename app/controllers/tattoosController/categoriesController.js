// controllers/categoriesController.js
const asyncHandler = require('express-async-handler');
const Category = require('../../models/tattoosModels/tattoosCate');

// Post Api Methed

exports.addCategories = asyncHandler(async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Api Methed

exports.getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Update Api Methed

exports.getIdCategories = asyncHandler(async (req, res) => {
    let category = await Category.findOne({ _id: req.params.id }); // Make sure you use req.params.id instead of req.params._id
    if (category) {
        res.json(category);
    } else {
        res.status(404).send("Category not found!");
    }
});

exports.updateCategories = asyncHandler(async (req, res) => {
    let category = await Category.updateOne(
        {_id: req.params.id, },
        {$set: req.body}
    );
    if (category) {
        res.json(category);
    } else {
        res.status(404).send("Category not found!");
    }
});

// Delete Api Methed

exports.deleteCategories = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(204).send();
        console.log("Delete")
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
