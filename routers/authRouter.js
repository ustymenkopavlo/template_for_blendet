import express from "express";
import { getUser, login, register } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authenticate.js";
import passport from "passport";

const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/user", authenticate, getUser);
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google/failure', successRedirect: '/protected' }),
);
  
router.get('/google/failure', (req, res)=>{res.status(401).send('Failed')})

export default router;
