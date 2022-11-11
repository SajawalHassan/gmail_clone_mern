import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    _id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("users", userSchema);
