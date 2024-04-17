// controllers/authController.js
const asyncHandler = require('express-async-handler');
const User = require('../../models/authModels/user');


exports.register = asyncHandler(async (req, res) => {
    let { username, email, password, cellNumber, address, lastname, firstname,role } = req.body;

    if (!username || !email || !password || !cellNumber || !address || !firstname || !lastname) {
        return res.status(400).send("Please fill all filed.");
    }

    let userExists = await User.findOne({ email });
    console.log(userExists)
    if (userExists) {
        return res.status(400).send("User already exists with the given email.");
    }

    let newUser = new User({  username, email, password, cellNumber, address, lastname, firstname, role });
  
    // console.log(newUser)
    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        address: newUser.address,
        cellNumber: newUser.cellNumber,
        role:newUser.role,
       
    });
   

});
