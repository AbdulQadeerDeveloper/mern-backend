const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start the Google OAuth process
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google has authenticated the user
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.send({ success: true, message: 'Login successful', user: req.user });
  } else {
    res.send({ success: false, message: 'Not logged in' });
  }
});

module.exports = router;
