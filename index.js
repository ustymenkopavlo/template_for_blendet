import express from "express";
import app from "./db/index.js";

import authRouter from "./routers/authRouter.js";

app.use(express.json());

app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  const { status = 500, message } = error;
  res.status(status).send(message);
});
