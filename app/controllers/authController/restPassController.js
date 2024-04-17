const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/authModels/user');
const bcryptjs = require('bcryptjs');
exports.resetPassword = asyncHandler(async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" })
        } else {
            bcryptjs.hash(password, 10)
                .then(hash => {
                    User.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then(u => res.send({ Status: "Success" }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))
        }
    })
});
