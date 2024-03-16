import express from 'express';
import passport from 'passport';
// import { getUser, login, register } from "../controllers/authController.js";
// import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/user", authenticate, getUser);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  })
);

router.get('/google/failure', (req, res) => {
  res.status(401).send('fault');
});

export default router;
