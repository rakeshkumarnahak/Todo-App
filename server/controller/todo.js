import { Router } from "express";
import Todo from "../models/todos.js";
import { isLogged } from "../middleware/auth.js";

const router = Router();

router.get("/", isLogged, async (req, res) => {
  const { username } = req.user;
  // res.json(
  //   await Todo.find({ username }).catch((error) =>
  //     res.status(400).json({ error }),
  //   ),
  // );
  res.status(200).json({ message: "Fuck You Baby!" });
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

router.post("/add", isLogged, async (req, res) => {
  const { username } = req.user;
  req.body.username = username;
  const todo = new Todo(req.body);
  res.json(
    await Todo.save({ username }, req.body).catch((error) =>
      res.status(400).json({
        error,
      }),
    ),
  );
  todo
    .save()
    .then(
      res.status(200).json({ message: "Todo has been created successfully" }),
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
