import express from "express";
import app from "./db/db.js";

import authRouter from "./routers/authRouter.js";

app.use(express.json());

app.use("/auth", authRouter);


app.use((error, req, res, next) => {
    res.status(error.status || 500).send(error.message);
})
