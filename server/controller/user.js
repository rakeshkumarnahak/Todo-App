import { Router } from "express";
import User from "../models/users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = Router();

dotenv.config();

router.get("/", (req, res) => {
  res.status(500).json({
    message:
      "Welldone.. Pair programming started. This will last until 2nd January 2089",
  });
});

router.post("/signup", async (req, res) => {
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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, password: password });
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
    return res.status(502).json({ message: error.message });
  }
});

export default router;
