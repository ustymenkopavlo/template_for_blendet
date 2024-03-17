import express from "express";
import session from 'express-session';
import passport from "passport";


import authRouter from "./routers/authRouter.js";
import { authenticate } from "./middlewares/authenticate.js";
import app from "./db/db.js";
import './strateges/googleStategy.js'

app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/protected', authenticate, (req, res) => { res.send('Hello')});
app.get('/', (req, res)=>{res.send("<a href='/auth/google'>AuthGoogle</a>")})
app.use("/auth", authRouter);



app.use((error, req, res, next) => {
    res.status(error.status || 500).send(error.message);
})
