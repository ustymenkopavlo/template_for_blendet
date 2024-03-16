import {Strategy as GoogleStrategy}  from 'passport-google-oauth20';
import passport from 'passport';
import userModel from '../db/userModel.js';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ["email", "profile"]
  },
    function (accessToken, refreshToken, profile, cb) {
              console.log("validation: ", profile.email);
      userModel.findOrCreate({ email: profile._json.email }, function (err, user) {
          
          console.log("strategy: ", user);
          console.log("strategy-error: ", err);
      return cb(err, user);
    });
  }
));

passport.serializeUser((user, done) => {
    console.log("serializeUser: ", user);
    done(null, { _id: user._id, email: user.email })
});

passport.deserializeUser((user, done) => {
        console.log("deserializeUser: ", user);
    done(null, user)
});