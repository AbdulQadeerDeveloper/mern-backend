const asyncHandler = require('express-async-handler');
const User = require('../../models/authModels/user');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.updateUser = asyncHandler(async (req, res) => {
  let { username, email, password, firstname, lastname, dob, cellNumber, address, city } = req.body;

  if (!username || !email || !password || !firstname || !lastname || !dob || !cellNumber || !address || !city) {
    return res.status(400).send("Please provide all required fields.");
  }

  let user = await User.findOne({ email });

  if (user) {
    // If the user exists, update their record.
    user.firstname = firstname;
    user.lastname = lastname;
    user.dob = dob;
    user.cellNumber = cellNumber;
    user.address = address,
      user.city = city
    if (user.password !== password) {
      user.password = await bcryptjs.hash(password, 10);
    }

    await user.save();
    res.status(200).send("User profile updated successfully.");
  } else {
   
    let newUser = new User({
      username,
      email,
      password,
      firstname,
      lastname,
      dob,
      cellNumber,
      address,
      city

    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstname:newUser.firstname,
      token: await newUser.generateToken() 
    });
  }
});
