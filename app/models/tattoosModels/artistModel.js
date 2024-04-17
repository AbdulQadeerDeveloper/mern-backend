const mongoose = require('mongoose');

const tattooSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    discription: {
        type: String,

    },
    Image_Url: {
        type: String
    },
    count: { type: String },
    follower: { type: String }


});

const TattooArtist = mongoose.model('ArtisTattoos', tattooSchema);

module.exports = TattooArtist;
