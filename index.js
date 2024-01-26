import express from "express";
import app from "./db/index.js";

import authRouter from "./routers/authRouter.js";

app.use(express.json());

app.use("/auth", authRouter);
