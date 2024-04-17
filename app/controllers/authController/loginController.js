// controllers/loginController.js
const asyncHandler = require('express-async-handler');
const User = require('../../models/authModels/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Login create users
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcryptjs.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role:user.role,
      token, // Send the token to the client
    });

    console.log(user);
  } else {
    res.status(401).send('Invalid email or password');
  }
});

// Login  get all users
exports.getAllloginUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login  delete user
exports.loginDelete = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});



