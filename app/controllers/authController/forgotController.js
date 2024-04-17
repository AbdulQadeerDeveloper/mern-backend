const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const User = require('../../models/authModels/user');
const jwt = require('jsonwebtoken');

exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.send({ Status: "User not existed" });
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

            var transporter = nodemailer.createTransport({
                service: "gmail",
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.USER_EMAIL_ID,
                    pass: process.env.USER_EMAIL_PASSWORD
                }
            });

            var mailOptions = {
                from: process.env.EMAIL_FORGOT_PASSWORD,
                to: user.email, 
                subject: 'Reset Your Password',
                html: `
                    <p>Hi ${user.username},</p>
                    <p>We received a request to reset your password. To reset your password, please click on the link below:</p>
                    <a href="http://localhost:3000/reset_password/${user._id}/${token}">Reset Password Link</a>
                    <p>If you did not request a password reset, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>Devfloks Pvt Limited</p>
                `
            };
            console.log(mailOptions)

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success" });
                }
            });
        });
});
