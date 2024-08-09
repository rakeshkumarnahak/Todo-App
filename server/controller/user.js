import { Router } from "express";
import User from "../models/users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { isLogged } from "../middleware/auth.js";

const router = Router();

dotenv.config();

router.get("/", (req, res) => {
  res.status(500).json({
    message:
      "Welldone.. Pair programming started. This will last until 2nd January 2089",
  });
});

router.get("/check-auth", isLogged, (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: "User is authenticated",
      authenticated: true,
      user: req.user,
    });
  } else {
    return res
      .status(401)
      .json({ message: "User is not authenticated", authenticated: false });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "User already present", userPresent: true });
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
            userPresent: true,
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
      return res.status(200).json({
        message: "User loggedin Successfully",
        token: token,
        userPresent: true,
      });
    } else {
      res.status(402).json({
        message: "User is not present, Please SignUp",
        userPresent: false,
      });
    }
  } catch (error) {
    return res.status(502).json({ message: error.message });
  }
});

export default router;
