import { model, Schema } from "mongoose";
import { User } from "../types/users";

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

export default model<User>("User", UserSchema);
