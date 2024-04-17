const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
exports.logoutAuth = asyncHandler(async (req, res) => {
    // Logout endpoint

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out, please try again.');
        } else {
            // Optionally redirect to login page or send a success response
            res.send('Logged out successfully');
        }
    });

});
