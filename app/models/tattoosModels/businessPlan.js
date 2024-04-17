const mongoose = require('mongoose');

// Define schema for business plan
const basinessSchema = new mongoose.Schema({
    title: { type: String, required: true },
    email:{type: String, required: true},
    brandname: { type: String, required: true },
    address: { type: String, required: true },
    cellNumber: { type: String, required: true },
    country: { type: String, required: true },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    images: [{ type: String }],
    
});

const basinessPlanModel = mongoose.model('basiness-plan', basinessSchema);

module.exports = basinessPlanModel;
