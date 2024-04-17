// controllers/businessController.js
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const basinessPlanModel = require('../../models/tattoosModels/businessPlan');



// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });


// Post All Tattoos Business Plain:
exports.addBusinessPlain = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images', maxCount: 8 }]), asyncHandler(async (req, res) => {
  try {
    const { title, email, brandname, address, cellNumber, country, zipcode, city, description } = req.body;
    const logo = req.files['logo'][0].path;
    const images = req.files['images'].map(file => file.path);

    const newBasinessPlan = new basinessPlanModel({
      title,
      email,
      brandname,
      address,
      cellNumber,
      country,
      zipcode,
      city,
      description,
      logo,
      images: images.join(';')
    });

    await newBasinessPlan.save();
    // console.log(newBasinessPlan);
    res.send({ message: "Data and files uploaded successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get All Tattoos Business Plain:
exports.getAllBusinessPlain = asyncHandler(async (req, res) => {
  try {
    const businessPlans = await basinessPlanModel.find();
    res.send(businessPlans);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});



// Get signal Tattoos Business Plain:
exports.getByIdBusinessPlain = asyncHandler(async (req, res) => {
  try {
    const businessPlan = await basinessPlanModel.findById(req.params.id);
    if (!businessPlan) return res.status(404).send('The business plan with the given ID was not found.');
    res.send(businessPlan);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }

});


// Delete All Tattoos Business Plain:
exports.deleteBusinessPlain = asyncHandler(async (req, res) => {
  try {
    const tattoo = await addTattoo.findByIdAndDelete(req.params.id);
    if (!tattoo) res.status(404).send("No tattoo found with that ID.");
    res.status(200).send("Tattoo deleted.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


