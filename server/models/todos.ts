import { model, Schema } from "mongoose";
import { Todo } from "../types/todos";

const TodoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

export default model<Todo>("Todo", TodoSchema);
