import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../db/userModel.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log('varification:', profile);
      userModel.findOrCreate(
        { email: profile._json.email },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
// Визначає що класти в сесію

// Визначаємо що класти в req.user
passport.deserializeUser((user, done) => {
  console.log('deserializeUser:', user);
  done(null, user);
});
passport.serializeUser((user, done) => {
  console.log('serializeUser:', user);
  done(null, { _id: user._id, email: user.email });
});
