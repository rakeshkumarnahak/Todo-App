import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/users.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

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
  res.status(500).json({
    message:
      "Welldone.. Pair programming started. This will last until 2nd January 2089",
  });
});

app.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res.status(400).json({ message: "User already present" });
    } else {
      const user = new User(req.body);
      user
        .save()
        .then(() => {
          const token = jwt.sign(
            { username: user.username, password: user.password },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            message: "User created Successfully",
            user: user,
            token: token,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.headers;
    if (!username & !password) {
      res.json({ message: "Please provide authorization header" });
    }
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign(
        { username: username, password: password },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "User loggedin Successfully", token: token });
    } else {
      res.status(402).json({ message: "User is not present, Please SignUp" });
    }
  } catch (error) {
    return res.status(502).json("message: error.message");
  }
});
