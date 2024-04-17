// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const connectDB = require('./app/config/db.config');// DB Config
const bodyParser = require('body-parser');
const path = require("path");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
connectDB();
// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
const authenticateToken = require('./app/middleware/authenticateToken');


// Routes
app.use('/uploads', express.static('uploads'));
require('./app/config/googleAuth.config')(passport);// Passport Config


// checkout api


app.use(require('./app/routes/authRoute/registerRoute'));
app.use(require('./app/routes/authRoute/loginRoute'));
app.use(require('./app/routes/authRoute/googleRoute'));
app.use(require('./app/routes/authRoute/facebookRoute'));
app.use(require('./app/routes/authRoute/forgotPasswordRoute'));
app.use(require('./app/routes/authRoute/resetPasswordRoute'));
app.use(require('./app/routes/authRoute/updateUserRoute'));
app.use(require('./app/routes/viewTattoosRoute/placementRoute'));
app.use(require('./app/routes/viewTattoosRoute/categoriesRoute'));
app.use(require('./app/routes/viewTattoosRoute/tattooRoute'));
app.use(require('./app/routes/viewTattoosRoute/commentRoute'));
app.use(require('./app/routes/viewTattoosRoute/likeAnddislikeRoute'));
app.use(require('./app/routes/viewTattoosRoute/businessRoute'));


app.get('/protected-route', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

// basic plain checkout
app.post('/api/basic/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Business Tattoos Booking Plan',
          },
          unit_amount: req.body.products.price, // Use the price in cents directly
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



// business plain checkout
app.post('/api/business/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Business Tattoos Booking Plan',
          },
          unit_amount: req.body.products.price, // Use the price in cents directly
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



// premium plain checkout
app.post('/api/premium/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Premium Tattoos Booking Plan',
          },
          unit_amount: req.body.products.price, // Use the price in cents directly
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL,
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});












