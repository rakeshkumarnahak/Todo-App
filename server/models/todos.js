import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
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
  { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);
