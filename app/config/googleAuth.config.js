const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/authModels/user');


module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        username: profile.username,
        email: profile.emails[0].value,
        profileImageUrl: profile.photos[0].value
      };

      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log(user)

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            newUser.profileImageUrl = profile.photos[0].value; // Add this line to set profile image URL
            user = await User.create(newUser);
          } else {
            user.googleId = profile.id;
            user.profileImageUrl = profile.photos[0].value;
            user.username = profile.username,
            user.email = profile.email
            await user.save();
            console.log(user)
          }
        }

        done(null, user);
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  ));
  

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Correctly using async/await
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};


