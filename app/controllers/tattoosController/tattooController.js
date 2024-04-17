// controllers/commentController.js
const asyncHandler = require('express-async-handler');
const addTattoo = require('../../models/tattoosModels/addTattoos');
const multer = require('multer');
const Category = require('../../models/tattoosModels/tattoosCate');
const PlacementColor = require('../../models/tattoosModels/tattoosPlace');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// Create Tattoos:
exports.addTattoo = upload.single('tattooImage'), asyncHandler(async (req, res) => {
    const { tattoosTitle, tattoosDis, categories, placement, tagTattoos, } = req.body;
    const tattooImage = req.file.path;

    const newTattoo = new addTattoo({
        tattoosTitle,
        tagTattoos,
        tattoosDis,
        tattooImage,
        categories,
        placement,
    });

    try {
        const savedTattoo = await newTattoo.save();
        res.status(201).json(savedTattoo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get Tattoos:
exports.getTattoo = asyncHandler(async (req, res) => {
    try {
        const tattooData = await addTattoo.find()
            .populate('categories', "name")
            .populate('placement', "name")
            .populate('comment');

        if (tattooData.length === 0) {
            return res.status(404).json({ message: 'No tattoos found' });
        }

        res.json(tattooData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Get Signal by Id Tattoos:
exports.getIdByTattoos = asyncHandler(async (req, res) => {
    let tattoo = await addTattoo.findOne({ _id: req.params.id });
    if (tattoo) {
        res.json(tattoo);
    } else {
        res.status(404).send("Tattoos not found!");
    }

});



// Update Tattoos:
exports.updateTattoo = upload.single('tattooImage'), asyncHandler(async (req, res) => {

    const { id } = req.params;
    let updateData = {
        tattoosTitle: req.body.tattoosTitle,
        tattoosDis: req.body.tattoosDis,
        categories: req.body.categories,
        placement: req.body.placement,
        tagTattoos: req.body.tagTattoos,
        tattooImage: req.file ? req.file.path : undefined
    };

    try {
        const updatedTattoo = await addTattoo.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedTattoo) {
            return res.status(404).json({ message: 'Tattoo not found' });
        }

        res.status(200).json(updatedTattoo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});


// Delete Tattoos:
exports.deleteTattoo = asyncHandler(async (req, res) => {
    try {
        const tattoo = await addTattoo.findByIdAndDelete(req.params.id);
        if (!tattoo) res.status(404).send("No tattoo found with that ID.");
        res.status(200).send("Tattoo deleted.");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update Status Tattoos:
exports.updateStatusTattoo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const { status } = req.body;
        // console.log(status)
        const updatedTattoo = await addTattoo.findByIdAndUpdate(id, { status }, { new: true });
        // console.log(updatedTattoo)

        if (!updatedTattoo) {
            return res.status(404).json({ message: 'Tattoo not found' });
        }

        return res.status(200).json(updatedTattoo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});


// Get Status Pending Tattoos:
exports.getStatusPendingTattoo = asyncHandler(async (req, res) => {
    // console.log(req.body)
    try {
        const pendingTattoos = await addTattoo.find({ status: 'Pending' })
            .populate('placement', 'name')
            .populate('categories', 'name');
        // console.log(pendingTattoos);
        res.json(pendingTattoos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get Status Rejected Tattoos:
exports.getStatusRejectTattoo = asyncHandler(async (req, res) => {
    // console.log(req.body)
    try {
        const rejectedTattoos = await addTattoo.find({ status: 'Rejected' })
            .populate('placement', 'name')
            .populate('categories', 'name');
        // console.log(rejectedTattoos);
        res.json(rejectedTattoos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Get Status Approved Tattoos:
exports.updateStatusApprovedTattoo = asyncHandler(async (req, res) => {
    // console.log(req.body)
    try {
        const approvedTattoos = await addTattoo.find({ status: 'Approved' })
            .populate('placement', 'name')
            .populate('categories', 'name');
        res.json(approvedTattoos);
        // console.log(approvedTattoos)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get Search Filter All Tattoos:
exports.searchTattoos = asyncHandler(async (req, res) => {
    console.log(req.body);

    try {

        const searchKey = req.params.key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        console.log(`Searching for: ${req.params.key}`);

        const matchingCategories = await Category.find({ name: { $regex: searchKey, $options: 'i' } }).select('_id');
        const matchingPlacements = await PlacementColor.find({ name: { $regex: searchKey, $options: 'i' } }).select('_id');

        // Extract IDs
        const categoryIds = matchingCategories.map(cat => cat._id);
        const placementIds = matchingPlacements.map(pl => pl._id);

        const allTattoos = await addTattoo.find({
            $or: [
                { 'categories': { $in: categoryIds } },
                { 'placement': { $in: placementIds } },
                { 'tattoosTitle': { $regex: searchKey, $options: 'i' } }
            ]
        }).populate('categories placement');

        if (allTattoos.length > 0) {
            res.status(200).json({ success: true, tattoos: allTattoos });

        } else {
            res.status(400).json({ success: false, message: "No tattoos found matching the search criteria." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while searching for tattoos", error: error.message });
    }
});

// Get  Pagination Tattoos:
exports.pagination = asyncHandler(async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        const skip = (page - 1) * size;

        const total = await addTattoo.countDocuments();
        const users = await addTattoo.find().skip(skip).limit(size);

        res.json({
            records: users,
            total,
            page,
            size
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

});

// Get Sort Filter Tattoos:
exports.sortByTatoos = asyncHandler(async (req, res) => {
    const { sortBy } = req.query;

    let sortCriteria = {};

    if (sortBy === 'asc') {
        sortCriteria = { tattoosTitle: 1 }; // Sort by tattoosTitle in ascending order (A-Z)
    } else if (sortBy === 'desc') {
        sortCriteria = { tattoosTitle: -1 }; // Sort by tattoosTitle in descending order (Z-A)
    } else {
        // Default sorting criteria
        sortCriteria = { tattoosTitle: 1 }; // Default to ascending order
    }

    try {
        const sortedTattoos = await addTattoo.find().sort(sortCriteria);
        res.json(sortedTattoos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

