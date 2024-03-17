import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const uri = process.env.DB_HOST;
const port = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });

export default app;
