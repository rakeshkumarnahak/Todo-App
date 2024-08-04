import { Document } from "mongoose";
import { Todo } from "./todos";

export interface User extends Document {
  username: string;
  password: string;
  id: number;
  todos: Todo;
}
