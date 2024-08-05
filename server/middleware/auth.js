import User from "../models/users";
import dotenv from "dotenv";

dotenv.config();

const authenticate = async (req, res, next) => {
  const authHeader = req.header.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.user = user;
      next();
    });
  }
  const user = await User.findOne({ username, password });
  if (username === user.username && password === user.password) {
    res.status(200).json({ message: "User is authenticated" });
    next();
  }
};
