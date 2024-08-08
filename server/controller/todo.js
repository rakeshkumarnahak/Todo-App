import { Router } from "express";
import { isLogged } from "../middleware/auth.js";
import Todo from "../models/todos.js";
import User from "../models/users.js";

const router = Router();

router.get("/allTodos", isLogged, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("todos");

    if (!user) {
      res.json({ message: "User not present" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", isLogged, async (req, res) => {
  try {
    const todoId = req.params.id;
    const user = await User.findById(req.user._id).populate({
      path: "todos",
      _id: todoId,
    });

    if (!user) {
      res.json({ message: "User not present" });
    }

    res.status(200).json({ todo: user.todos });
  } catch (error) {
    res.send(error);
  }
});

router.post("/add", isLogged, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const todo = new Todo({ ...req.body, user: user.id });
    const savedTodo = await todo.save();

    user.todos.push(savedTodo._id);
    await user.save();
    res
      .status(200)
      .json({ message: "Todo added successfully", todo: savedTodo });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put("/:id", isLogged, async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.user._id;
    const updateTodoData = req.body;
    const todo = await Todo.findById(todoId);

    if (todo.user.toString() != userId) {
      res.status(400).json({ message: "Todo doesn't belong to this user" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updateTodoData, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", isLogged, async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.user._id;
    const todo = await Todo.findById(todoId);

    if (todo.user.toString() != userId) {
      return res
        .status(400)
        .json({ message: "Todo doesn't belong to this user" });
    }

    //Delete the Todo from the Todo collection
    await Todo.findByIdAndDelete(todoId);

    //Delete the Todo from the Todos array in the user collection
    await User.findByIdAndUpdate(userId, {
      $pull: { todos: todoId },
    });
    //$pull is an operator in MongoDB which removes the element from the array on specified condition
    //Here we want to delete the todo from the todos array with the specified todoid
    return res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.send(error);
  }
});

export default router;
