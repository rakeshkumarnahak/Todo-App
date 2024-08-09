import User from "../models/users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const isLogged = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization == "" ||
    req.headers.authorization == ""
  ) {
    res.status(400).json({
      message: "Please send authorization token",
      authenticated: false,
    });
  }
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          message: "Please send authorization token",
          authenticated: false,
        });
      }

      const user = await User.findOne({
        username: userData.username,
        password: userData.password,
      });
      req.user = user;
      next();
    });
  }
};
