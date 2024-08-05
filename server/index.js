import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/users.js";

const app = express();

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

app.get("/", (req, res) => {
  res.status(500).json({ message: "All good, server is saying Hello World!" });
});

app.post("/signup", async (req, res) => {
  try {
    const newUser = { ...req.body, id: Date.now() };
    console.log(newUser);
    const user = new User(newUser);
    user
      .save()
      .then(
        res
          .status(200)
          .json({ message: "User created Successfully", user: user })
      )
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
});
