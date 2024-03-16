import express from 'express';
import app from './db/index.js';
import './strategies/googleStrategies.js';

import authRouter from './routers/authRouter.js';
import session from 'express-session';
import passport from 'passport';
import { authenticate } from './middlewares/authenticate.js';

app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/protected', authenticate, (req, res) => {
  res.send(`Hello ${req.user.email}`);
});
app.get('/', (req, res) => {
  res.send('<a href="/auth/google/" >Login with google</a>');
});

app.use('/auth', authRouter);

app.use((error, req, res, next) => {
  const { status = 500, message } = error;
  res.status(status).send(message);
});
