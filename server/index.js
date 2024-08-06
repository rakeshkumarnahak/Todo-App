import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/users.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import TodoRouter from "./controller/todo.js";
import UserRouter from "./controller/user.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/user", UserRouter);
app.use("/todos", TodoRouter);

// app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));
