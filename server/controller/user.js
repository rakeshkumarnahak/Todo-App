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

const generateAccessToken = (user) => {
  return jwt.sign(
    { username: user.username, password: user.password },
    process.env.JWT_SECRET,
    { expiresIn: "10s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { username: user.username, password: user.password },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "User already present", userPresent: true });
    } else {
      const user = new User(req.body);
      await user.save();

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      user.token = accessToken; // Save access token in the database
      user.refreshToken = refreshToken; // Save refresh token in the database
      await user.save();

      res.status(200).json({
        message: "User created Successfully",
        user: user,
        token: accessToken,
        refreshToken: refreshToken,
        userPresent: true,
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
    if (!user) {
      res.status(402).json({
        message: "User is not present, Please SignUp",
        userPresent: false,
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.token = accessToken; // Save access token in the database
    user.refreshToken = refreshToken; // Save refresh token in the database
    await user.save();

    res.status(200).json({
      message: "User loggedin Successfully",
      token: accessToken,
      refreshToken: refreshToken,
      userPresent: true,
    });
  } catch (error) {
    return res.status(502).json({ message: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({
      message: "Please provide refresh token",
    });
  }
  try {
    const user = await User.findOne({ refreshToken });
    console.log(user);

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    console.log("User is present");
    console.log(user);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET,
      (err, decodedToken) => {
        if (err) {
          return res.status(403).json({
            message: "Refresh token is expired or invalid, Please login again",
          });
        }
        if (refreshToken !== user.refreshToken) {
          return res
            .status(402)
            .json({ message: "refreshToken is not matching" });
        }
        const newAccessToken = generateAccessToken(user);
        console.log("New access token has been generated");
        return res.json({ token: newAccessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
