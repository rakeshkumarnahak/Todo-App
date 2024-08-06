import { Router } from "express";
import Todo from "../models/todos.js";
import { isLogged } from "../middleware/auth.js";

const router = Router();

router.get("/", isLogged, async (req, res) => {
  const { username } = req.user;
  res.json(
    await Todo.find({ username }).catch((error) =>
      res.status(400).json({ error }),
    ),
  );
});

router.get("/:id", isLogged, async (req, res) => {
  const { username } = req.user;
  const id = req.params.id;
  res.json(
    await Todo.findOne({ username, id }).catch((error) =>
      res.status(400).json({ error }),
    ),
  );
});

router.post("/", isLogged, async (req, res) => {
  const { username } = req.user;
  req.body.username = username;
  const id = req.params.id;
  res.json(
    await Todo.updateOne({ username, id }, req.body, { new: true }).catch(
      (error) =>
        res.status(400).json({
          error,
        }),
    ),
  );
});

router.delete("/:id", isLogged, async (req, res) => {
  const { username } = req.user;
  const id = req.params.id;
  res.json(
    await Todo.remove({ username, id }).catch((error) =>
      res.status(400).json({ error }),
    ),
  );
});

export default router;
