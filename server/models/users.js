import mongoose from "mongoose";

const UserSchema = mongoose.schema({
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

export default mongoose.model("User", UserSchema);
