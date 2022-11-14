import { model, Schema } from "mongoose";

const mailSchema: Schema = new Schema(
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
    sender: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("mails", mailSchema);
