import { model, Schema } from "mongoose";

const mailSchema = new Schema(
  {
    recieverEmail: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("mails", mailSchema);
