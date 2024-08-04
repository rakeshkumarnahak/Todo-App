import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(500).json({ message: "All good, server is saying Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
